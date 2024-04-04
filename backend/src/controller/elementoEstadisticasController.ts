import { elementosConProcesados } from "../interfaces/mueble/expositoresProcesados";
import { Request, Response } from "express";
import { elementosService } from "../services/elementoService";

import {
    getNumeroProbabilidadCartel,
    getNumeroProbabilidadConteo,
    getResumenEstadisticas,
    getResumenEstadisticasConElementos,
} from "../utils/funcionesCompartidasController";
import {
    estadisticas_carteles,
    estadisticas_conteo_dispositivos,
    resultados_ordenados,
    resultados_ordenados_elementos,
} from "../interfaces/estadisticas/resultados_ordenados";
import { elementos } from "@prisma/client";


export async function getProcesados(req: Request, res: Response) {
    try {
        const id_elemento =  req.params.id
        const elemento = await elementosService.getProcesados(parseInt(id_elemento));
        const elementosConProcesados: elementosConProcesados[] =
            mapearElementosConProcesados([elemento]);
            
        res.status(200).json(elementosConProcesados[0]);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
}


export async function getResumenEstadisticasElementos(
    req: Request,
    res: Response
) {
    try {
        const elementos_id: number [] | undefined = req.body.elementos_ids;
        const fechas: Date[] | undefined= req.body.fechas;

        const elementos = await elementosService.getElementosWithProcesados(elementos_id, undefined, fechas);
        const elementosConProcesados: elementosConProcesados[] =
            mapearElementosConProcesados(elementos);

        //No me interesan los que no tienen procesados, los saco fuera
        const elementosConProcesadosLimpios =  elementosConProcesados.filter((elemento: any) => {
            return elemento.procesados_imagenes && elemento.procesados_imagenes.length > 0;
        });
        const resultados_ordenados: resultados_ordenados_elementos =
            getResumenEstadisticasConElementos(elementosConProcesadosLimpios);
        res.status(200).json(resultados_ordenados);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export async function getEstadisticasResumen(req : Request, res: Response) {
    try {
        const id = req.params.id
        //hacer en validador
        if (isNaN(parseInt(id)) || parseInt(id) <= 0) {
            res.status(400).json({ error: "id debe ser un numero positivo" });
            return;
        }
        const elemento = await elementosService.getProcesados(parseInt(id));
        const elementoConProcesados: elementosConProcesados[] = mapearElementosConProcesados([elemento]);

        const resumen:resultados_ordenados = getResumenEstadisticas(elementoConProcesados[0].procesados_imagenes);
        
        res.status(200).json(resumen);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export const getElementosEstadisticas =
    (estadisticas: "carteles" | "conteo") =>
        async (req: Request, res: Response) => {
            try {
                const elementos_id:number [] | undefined= req.body.elementos_ids;
                const fechas: Date[] | undefined = req.body.fechas;

                const categoria = estadisticas == "carteles" ? 1 : 3;
                const elementos = await elementosService.getElementosWithProcesados(elementos_id, categoria, fechas);
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

export async function getNumProcesadosByCategoria(req: Request, res: Response) {
    try {
        //- no harcodearlo bro
        //- ya tio, por el momento si

        const elementos_id: number [] | undefined= req.body.elementos_ids;
        const fechas: Date[] | undefined = req.body.fechas;
        const categoria_carteles: number = 1;
        const categoria_conteo: number = 3;


        const numProcesadosCarteles = await elementosService.getNumProcesadosByCategoria(categoria_carteles, elementos_id, fechas);
        const numProcesadosConteo = await elementosService.getNumProcesadosByCategoria(categoria_conteo, elementos_id, fechas);

        res.status(200).json({conteo_dispositivos: numProcesadosConteo, carteles: numProcesadosCarteles});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
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

