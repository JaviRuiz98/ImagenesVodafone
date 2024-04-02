import { Request, Response } from 'express';

import { elementosAuditoriaService } from '../services/elementosAuditoriaService';

import { getResumenEstadisticas } from '../utils/funcionesCompartidasController';

import { procesados_imagenes } from '@prisma/client';

import { per_ele_aud_extended } from '../interfaces/perEleAudExtended';
import { muebleConElementos} from '../interfaces/mueble/muebleConElementos';
import { resultados_ordenados } from '../interfaces/estadisticas/resultados_ordenados';
import { cuenta_no_procesados } from '../interfaces/procesados/cuenta_no_procesados';
import { conteo_elementos_procesados_auditoria } from '../interfaces/auditoria/conteoElementosProcesadosAuditoria';


export async function getElementosProcesadosAuditoria(req: Request, res: Response) {
    try {
        const id_auditoria = parseInt(req.params.id_auditoria);

        const per_ele_aud_brutos: per_ele_aud_extended[] = await elementosAuditoriaService.getPertenenciasElementosAuditoria(id_auditoria);
        
        const per_ele_aud_netos = agruparElementosMueblesAuditorias(per_ele_aud_brutos);
        res.status(200).json(per_ele_aud_netos);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    } 

}

function agruparElementosMueblesAuditorias(per_ele_aud_brutos: per_ele_aud_extended[]) {

    const resultado: muebleConElementos[] = per_ele_aud_brutos.reduce((acc: muebleConElementos[], item: per_ele_aud_extended) => {
        if (item.muebles) {
            let mueble = acc.find((m: muebleConElementos) => m.id === item.muebles?.id);
            if (!mueble) {
                mueble = {
                    ...item.muebles,
                    elementos: []
                };
                acc.push(mueble);
            }

            if(item.elementos) {
                mueble.elementos.push({
                    ...item.elementos,
                    procesados_imagenes: item.procesados_imagenes,
                    id_expositor: item.id_expositor
                });
            }
        }
        return acc;

    }, []);

    return resultado;
}

export async function getEstadisticasResultadosAuditoria(_req: Request, res: Response) {
    try {
        // Obtener todos el último procesado de cada elemento-auditoria
        const elementos_auditorias: per_ele_aud_extended[] = await elementosAuditoriaService.getUltimosProcesadosElementoAuditoriaNotEnProgreso();

        // Contar y ordenar los no procesados
        const cuenta_no_procesados: cuenta_no_procesados = cuentaNoProcesados(elementos_auditorias);

        // Hago un array de los procesados que no son undefined
        const ultimos_procesados: procesados_imagenes[] = elementos_auditorias.map((elemento) => elemento.procesados_imagenes[0]);

        // Contar y ordenar los procesamientos
        const resultados_ordenados: resultados_ordenados = getResumenEstadisticas(ultimos_procesados, 10, cuenta_no_procesados);

        res.status(200).json(resultados_ordenados);
    } catch (error) {
        console.error('No se pudo obtener los resultados ordenados:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

function cuentaNoProcesados(elementos: per_ele_aud_extended[]): cuenta_no_procesados {
    const no_procesados: cuenta_no_procesados = {
        no_procesados_carteles: 0,
        no_procesados_dispositivos: 0    
    }   

    for (const elemento of elementos) {
        if (elemento.procesados_imagenes.length == 0) {
            if (elemento.elementos?.id_categoria == 1) {
                no_procesados.no_procesados_carteles++;
            } else if (elemento.elementos?.id_categoria == 3) {
                no_procesados.no_procesados_dispositivos++;
            }
        }
    }

    return no_procesados;
}

export async function getPorcentajeProcesadoDadoEstadoAuditoria(_req: Request, res: Response) {
    try {
        const elementos_auditoria = await elementosAuditoriaService.getElementosAuditoriaConAuditoriasYUltimoProcesado();

        let conteo_elementos_procesados_auditoria: conteo_elementos_procesados_auditoria = {
            en_progreso: {
                total: 0,
                procesados: 0,
                porcentaje: 0
            },
            finalizada: {
                total: 0,
                procesados: 0,
                porcentaje: 0
            },
            caducada: {
                total: 0,
                procesados: 0,
                porcentaje: 0
            }
        }

        conteo_elementos_procesados_auditoria = await contarProcesadosDeCadaEstadoAuditoria(elementos_auditoria, conteo_elementos_procesados_auditoria);

        res.status(200).json(await conteo_elementos_procesados_auditoria);
    } catch (error) {
        console.error('No se pudo obtener el porcentaje de procesados por estado:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    
}

async function contarProcesadosDeCadaEstadoAuditoria(elementos_auditoria: per_ele_aud_extended[], conteo_elementos_procesados_auditoria: conteo_elementos_procesados_auditoria) {

    for (const elemento of (await elementos_auditoria)) {
        if(elemento.auditorias?.id_estado == 1) {
            conteo_elementos_procesados_auditoria.en_progreso.total++;
            if(elemento.procesados_imagenes.length > 0) {
                conteo_elementos_procesados_auditoria.en_progreso.procesados++;
            }
        } else if(elemento.auditorias?.id_estado == 2) {
            conteo_elementos_procesados_auditoria.finalizada.total++;
            if(elemento.procesados_imagenes.length > 0) {
                conteo_elementos_procesados_auditoria.finalizada.procesados++;
            }
        } else if(elemento.auditorias?.id_estado == 3) {
            conteo_elementos_procesados_auditoria.caducada.total++;
            if(elemento.procesados_imagenes.length > 0) {
                conteo_elementos_procesados_auditoria.caducada.procesados++;
            }
        }
    }

    conteo_elementos_procesados_auditoria.en_progreso.porcentaje = (conteo_elementos_procesados_auditoria.en_progreso.procesados / conteo_elementos_procesados_auditoria.en_progreso.total) * 100;
    conteo_elementos_procesados_auditoria.finalizada.porcentaje = (conteo_elementos_procesados_auditoria.finalizada.procesados / conteo_elementos_procesados_auditoria.finalizada.total) * 100;
    conteo_elementos_procesados_auditoria.caducada.porcentaje = (conteo_elementos_procesados_auditoria.caducada.procesados / conteo_elementos_procesados_auditoria.caducada.total) * 100;

    return conteo_elementos_procesados_auditoria;
}