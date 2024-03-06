import { Request, Response } from "express";
import {
    expositorService,
    mobiliarioService,
} from "../services/mobiliarioService";
import { imagenes, muebles } from "@prisma/client";

//No está operatica
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

export async function createMueble(req: Request, res: Response) {
    try {
        const data = req.body; //tipar en un futuro

        //hacer valdiator

        const mobiliario = await mobiliarioService.createMueble(data);
        res.status(200).json(mobiliario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function updateMueble(req: Request, res: Response) {
    try {
        const data = req.body; //tipar
        const id_mueble = req.params.id_mueble
            ? parseInt(req.params.id_mueble as string)
            : undefined;

        //hacer validator
        if (!id_mueble) {
            res.status(400).json({ error: "id_mueble es necesario" });
            return;
        }

        const mobiliario = await mobiliarioService.updateMueble(id_mueble, data);
        res.status(200).json(mobiliario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
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
