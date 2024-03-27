import { Request, Response } from "express";
import { elementosService } from "../services/elementoService";
import { imagenService } from "../services/imagenService"; 
import { elementosConProcesados } from "../interfaces/mueble/expositoresProcesados";

import {
    getNumeroProbabilidadCartel,
    getNumeroProbabilidadConteo,
    getResumenEstadisticasConElementos,
} from "../utils/funcionesCompartidasController";
import {
    estadisticas_carteles,
    estadisticas_conteo_dispositivos,
    resultados_ordenados_elementos,
} from "../interfaces/estadisticas/resultados_ordenados";
import { elementos } from "@prisma/client";

export async function createElementos(req: Request, res: Response) {
    const { nombre } = req.body; //tipar en un futuro
    //hacer valdiator
    const mobiliario = await elementosService.create(nombre);
    res.status(200).json(mobiliario);
}

export async function updateElementos(req: Request, res: Response) {
    const data = req.body; //tipar
    const id_elemento = req.params.id_elemento
        ? parseInt(req.params.id_elemento as string)
        : undefined;
    //hacer validator
    if (!id_elemento) {
        res.status(400).json({ error: "id_elemento es necesario" });
        return;
    }
    const mobiliario = await elementosService.update(id_elemento, data);
    res.status(200).json(mobiliario);
}

export async function getElementos(req: Request, res: Response) {
    try {
        const categoria: number | undefined =
            parseInt(req.query.categoria as string) || undefined;
        if (categoria && isNaN(categoria)) {
            res.status(400).json({ error: "categoria debe ser un numero" });
            return;
        }
        const elementos = await elementosService.getAll(categoria);
        res.status(200).json(elementos);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
        throw error;
    }
}

export async function getElementosActivos(__req: Request, res: Response) {
    try {
        const elementos = await elementosService.getAllActivos();
        res.status(200).json(elementos);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
        throw error;
    }
}

export async function deleteElemento(req: Request, res: Response) {
    try {
        const id_elemento = req.params.id_elemento
            ? parseInt(req.params.id_elemento as string)
            : undefined;
        //hacer validator
        if (!id_elemento) {
            res.status(400).json({ error: "id_elemento es necesario" });
            return;
        }
        const mobiliario = await elementosService.deleteElemento(id_elemento);
        res.status(200).json(mobiliario);
    } catch (error) { }
}

export async function guardarElemento(req: Request, res: Response) {
    try {
        const nombre = req.body.nombre;
        const activo = req.body.activo === "true";
        const imagenExpositor = req.file; //(files['imagenesprocesado'] as Express.Multer.File[]).map(file => file.path)[0];

        const categoria = parseInt(req.body.categoria);

        const row = await fetchGuardarElemento(
            nombre,
            activo,
            categoria,
            imagenExpositor
        );

        if (!row) {
            res.status(500).json({ error: "No pudo procesarse la imagen" });
        }

        res.status(200).json(row);

        // if (!imagenExpositor ||!imagenExpositor.path || !imagenExpositor.filename) {
        //     res.status(500).json({ error: 'La imagen procesada no existe' });
        //     return;
        // }
        // const [nuevaImagen]  = await Promise.all([
        //     imagenService.create(imagenExpositor.filename, imagenExpositor.originalname),
        // ]);
        // const row = await elementosService.guardarElemento(nombre, activo, nuevaImagen.id, categoria);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
}
export async function fetchGuardarElemento(
    nombre: string,
    activo: boolean,
    categoria: number,
    imagenExpositor?: Express.Multer.File
) {
    try {
        if (
            !imagenExpositor ||
            !imagenExpositor.path ||
            !imagenExpositor.filename
        ) {
            return null;
        }
        const [nuevaImagen] = await Promise.all([
            imagenService.create(
                imagenExpositor.filename,
                imagenExpositor.originalname
            ),
        ]);
        return await elementosService.guardarElemento(
            nombre,
            activo,
            nuevaImagen.id,
            categoria
        );
    } catch (error) {
        console.log(error);
        return null;
    }
}

//Ojo puedes usar directamente el controlador del update para esta función
export async function editarEstadoElemento(req: Request, res: Response) {
    try {
        const id_elemento = req.body.id_elemento;
        const activo = req.body.activo;

        const row = await elementosService.editarEstadoelemento(
            id_elemento,
            activo
        );
        res.status(200).json(row);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export async function getRegionesDisponibles(__req: Request, res: Response) {
    try {
        const regiones = await elementosService.getRegiones();
        res.status(200).json(regiones); //
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export async function getCategorias_elementos(_req: Request, res: Response) {
    try {
        const categorias = await elementosService.getCategorias();
        res.status(200).json(categorias);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

// export async function getProcesados(_req: Request, res: Response) {
//     try {
//         const procesados = await elementosService.getProcesados();
//         res.status(200).json(procesados);
//     } catch (error) {
//         res.status(500).json({ error: "Error interno del servidor" });
//     }
// }

//ESTADÍSTICAS

export async function getResumenEstadisticasElementos(
    _req: Request,
    res: Response
) {
    try {
        const elementos = await elementosService.getElementosWithProcesados();
        const elementosConProcesados: elementosConProcesados[] =
            mapearElementosConProcesados(elementos);

        const resultados_ordenados: resultados_ordenados_elementos =
            getResumenEstadisticasConElementos(elementosConProcesados);
        res.status(200).json(resultados_ordenados);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export const getElementosEstadisticas =
    (estadisticas: "carteles" | "conteo") =>
        async (_req: Request, res: Response) => {
            try {
                const categoria = estadisticas == "carteles" ? 1 : 3;
                const elementos = await elementosService.getElementosWithProcesados(categoria);
                const elementosConProcesados: elementosConProcesados[] =
                    mapearElementosConProcesados(elementos);

                let resultado:
                    | estadisticas_carteles[]
                    | estadisticas_conteo_dispositivos[] = [];
                if (estadisticas == "carteles") {
                    resultado = obtenerEstadisticasCarteles(elementosConProcesados);
                } else {
                    resultado = obtenerEstadisticasConteos(elementosConProcesados);
                }

                res.status(200).json(resultado);
            } catch (error) {
                console.log(error);
                res.status(500).json({ error: "Error interno del servidor" });
            }
        };

function obtenerEstadisticasCarteles(
    elementosConProcesados: elementosConProcesados[]
): estadisticas_carteles[] {
    return elementosConProcesados.map((elemento) => {
        //Nunca debería salir un elemento que no sea de categoria 3
        const probabilidades = getNumeroProbabilidadCartel(
            elemento.procesados_imagenes
        );
        return {
            elemento: elemento as elementos,
            muy_alta: probabilidades[0].count,
            alta: probabilidades[1].count,
            media: probabilidades[2].count,
            baja: probabilidades[3].count,
            muy_baja: probabilidades[4].count,
            ninguna: probabilidades[5].count,
            otro_idioma: probabilidades[6].count,
        };
    });
}
function obtenerEstadisticasConteos(
    elementosConProcesados: elementosConProcesados[]
): estadisticas_conteo_dispositivos[] {
    return elementosConProcesados.map((elemento) => {
                            //diferencia //valor
        const probabilidades: [number, number][] = getNumeroProbabilidadConteo(
            elemento.procesados_imagenes
        );

        //error los que tengan una key con -1
        const errorEncontrado = probabilidades.find(
            (probabilidad) => probabilidad[0] === -1
        );
        const error = errorEncontrado ? errorEncontrado[1] : 0;

        //diferencias
        let diferencia = new Array(11).fill(0);
        probabilidades.forEach(([key, valor]) => {
            // Si la key es mayor que 10, usar la última posición del array
            if (key > 10) {
                diferencia[10] = valor;
            } else {
                // De lo contrario, usar la posición de la key para asignar el valor
                diferencia[key] = valor;
            }
        });

        return {
            elemento: elemento as elementos,
            error: error,
            diferencia: diferencia,
        };
    });
}

function mapearElementosConProcesados(
    elementos: any
): elementosConProcesados[] {
    return elementos.map((elemento: any) => {
        const procesados =
            elemento.pertenencia_elementos_auditoria.flatMap(
                (pertenencia: any) => pertenencia.procesados_imagenes
            ) || null;
        return {
            ...elemento,
            pertenencia_elementos_auditoria:
                elemento.pertenencia_elementos_auditoria.length,
            procesados_imagenes: procesados,
        };
    });
}