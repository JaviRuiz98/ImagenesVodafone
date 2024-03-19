import { Request, Response } from "express";
import {
    expositorService,
    mobiliarioService,
} from "../services/mobiliarioService";
import { imagenes, muebles } from "@prisma/client";
import { muebleCreation } from "../interfaces/mueblesCreados";
import { fetchGuardarElemento } from "./elementoController";

//No está operativa
export async function getFilteredMuebles(req: Request, res: Response) {
    try {
        const id_tienda = req.body.id_tienda
            ? parseInt(req.body.id_tienda as string)
            : undefined;
        // const categoria_clause:  "carteles" | "dispositivos"  | null = req.body.categoria as "carteles" | "dispositivos" | null;
        const orden_clause:
            | "date_asc"
            | "date_desc"
            | "result_asc"
            | "result_desc"
            | null = req.body.orden;
        const prompts_clause: number[] | null = req.body.prompts;
        const ia_clause: string | null = req.body.ia;

        //validador
        /*
                comprobar que id_mobiliario es numérico si existe
                comprobar que dispositivos es un array de dos números y el segundo número es mayor que el primero
    
            */
        const mobiliario: muebles[] = await mobiliarioService.getFilteredMuebles(
            id_tienda,
            orden_clause,
            prompts_clause,
            ia_clause
        );
        res.status(200).json(mobiliario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const idCategoriaModelo = 3;
export async function updateMuebleForm (req: Request, res: Response) {
    try {
        const muebleDat:muebleCreation  = JSON.parse(req.body.muebleData);
        const imagenes = req.files;
        let nuevoMueble: muebles;
        console.log(JSON.stringify(muebleDat));

        if (muebleDat.id != null ){
            nuevoMueble =  await editarMueble(muebleDat);
        }else{
            nuevoMueble = await createMueble(muebleDat, imagenes);
        }
       
        if (nuevoMueble == undefined){
            res.status(500).json({ error: "Internal server error" });
            return;     
        }

        res.status(200).json(nuevoMueble);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function editarMueble(muebleDat:muebleCreation) {
    try {
       const mueble = await mobiliarioService.getMuebleById(muebleDat.id!);
        if (!mueble) {
            throw new Error('Mueble no encontrado');
        }
        const muebleEditado =  await mobiliarioService.updateMueble(muebleDat);
        if (!muebleEditado) {
            throw new Error('Error al editar el mueble');
        }
        return muebleEditado;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function createMueble(muebleDat:muebleCreation, imagenes: any) {
    try {
        for (const expositor of muebleDat.expositores) {
            for (const atributo of expositor.atributos_expositores) {
                if (atributo.categorias_elementos?.id != null &&
                    atributo.categorias_elementos.id == idCategoriaModelo &&
                    atributo.elemento?.id == null &&
                    atributo.elemento?.nombre_archivo != null) {
                    const imagenFile = encontrarArchivoPorNombre(imagenes, atributo.elemento.nombre_archivo);
                    if (imagenFile) {
                        const elemento = await fetchGuardarElemento(atributo.elemento.nombre ?? "", true, atributo.elemento.categorias_elementos?.id ?? idCategoriaModelo, imagenFile);
                        if (elemento) {
                            atributo.elemento.id = elemento.id;
                        } else {
                            console.error('Error al crear el elemento');
                            throw new Error('Error al crear el elemento');
                        }
                    } else {
                        console.error('No se encontró el archivo');
                        throw new Error('No se encontró el archivo');
                    }
                } 
            }
        } 
        
        return await mobiliarioService.createMueble(muebleDat);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function encontrarArchivoPorNombre(imagenes:
        {[fieldname: string]: Express.Multer.File[];} |
        Express.Multer.File[] |
        undefined, 
    nombreArchivo: string) {

    let archivoEncontrado = undefined;

    // Si imagenes es un array directo de Express.Multer.File
    if (Array.isArray(imagenes)) {
        archivoEncontrado = imagenes.find(imagen => imagen.originalname === nombreArchivo);
    } 
    // Si imagenes es un objeto con propiedades cuyos valores son arrays de Express.Multer.File
    else if (imagenes && typeof imagenes === 'object') {
        Object.keys(imagenes).forEach(key => {
            const posibleArchivo = imagenes[key].find(imagen => imagen.originalname === nombreArchivo);
            if (posibleArchivo) archivoEncontrado = posibleArchivo;
        });
    }
    
    return archivoEncontrado;
}



export async function getAllMuebles(_req: Request, res: Response) {
    try {
        const muebles = await mobiliarioService.getAllMuebles();
        if (!muebles) {
            res.status(204).send();
        }
        res.status(200).json(muebles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function getMueblesAndExpositoresActivosByIdTienda(
    req: Request,
    res: Response
) { 
    try {
        const id_tienda = parseInt(req.params.id_tienda);
        const muebles: any[] =
            await mobiliarioService.getMueblesAndExpositoresActivosByIdTienda(id_tienda);
        if (!muebles) {
            res.status(204).send();
        }
        for (let i = 0; i < muebles.length; i++) {
            /*
                  necesito obtener la primera imagen del elemento asociado a cualquier atributo_expositor de categoria 3, en caso de no existir  ningún atributo_expositor de categoria 3,
                  obtendré la imagen del elemento asociado de cualquier atributo_expositor con un elemento asociado. En caso  de no existir elemento asociado a ningún atributo_expositor o 
                  que no exista ningún atributo expositor en ningún expositor o que no haya expositores, devolveré null. Ese valor se añadirá a muebles.imagen_representativa
            */
            let imgRepresentativa:imagenes[] = [];

            imgRepresentativa = buscarImagenCategoriaEspecifica(3, muebles[i].expositores); //busco imagen de categoria 3 (modelo)

            //si no existe, busco cualquier imagen sin importar la categoria
            if (imgRepresentativa.length === 0) {
                imgRepresentativa = buscarImagenCualquierElemento(muebles[i].expositores);
            }

            muebles[i].imagen_representativa =  imgRepresentativa;
        }
        res.status(200).json(muebles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// Función para buscar imagen en categoría específica
const buscarImagenCategoriaEspecifica = (categoria:number, expositores: any) :imagenes[] => {
 let imagenes: imagenes[] = []
for (let expositor of expositores) {
  
    for (let atributo of expositor.atributos_expositores) {
        if (atributo.id_categoria === categoria) {
            //solo hay una pertenencia (la mas reciente si el servicio es correcto) y siempre habrá un único elemento asociado a pertenencia 
            if (!!atributo.pertenencia_elementos_atributos[0].elementos.imagenes ) {
                imagenes.push(atributo.pertenencia_elementos_atributos[0].elementos.imagenes);
            }
        }
    }
}
return imagenes;
};

// Función para buscar imagen en cualquier elemento asociado
const buscarImagenCualquierElemento = (expositores: any) : imagenes[]  => {
    let imagenes:imagenes[] = [];
    for (let expositor of expositores) {
        for (let atributo of expositor.atributos_expositores) {
                           //solo hay una pertenencia (la mas reciente si el servicio es correcto) y siempre habrá un único elemento asociado a pertenencia 
        if (!!atributo.pertenencia_elementos_atributos[0].elementos.imagenes) {
                imagenes.push(atributo.pertenencia_elementos_atributos[0].elementos.imagenes);
                break; //solo necesito una
            }
        }
    }
    return imagenes;
};       

export async function updateExpositor(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const { nombre, atributos_expositores } = req.body;
        if (!id || isNaN(id)) {
            res.status(400).json({ error: "id es necesario" });
        }
        const expositorActualizado = await expositorService.updateExpositor(
            id,
            nombre,
            atributos_expositores
        );
        res.status(200).json(expositorActualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

