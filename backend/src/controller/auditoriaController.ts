import { Request, Response } from 'express';
import { auditoriaService } from '../services/auditoriaService';
import { auditoria_extended } from '../interfaces/auditoriaExtended';
import { auditorias, procesados_imagenes } from '@prisma/client';
import { tiendaService } from '../services/tiendasServices';
import { muebleConElementos} from '../interfaces/muebleConElementos';
import { per_ele_aud_extended } from '../interfaces/perEleAudExtended';
import { muebleService } from "../services/muebleService";
import { estados_extended } from '../interfaces/estadosExtended';
import { resultados_ordenados } from '../interfaces/resultados_ordenados';
import { getResumenEstadisticas } from '../utils/funcionesCompartidasController';
import { cuenta_no_procesados } from '../interfaces/cuenta_no_procesados';
import { conteo_elementos_procesados_auditoria } from '../interfaces/auditoria/conteoElementosProcesadosAuditoria';

export async function getAuditorias(req: Request, res: Response) {
    try {
        const id_tienda = parseInt(req.params.id_tienda as string);

        
        const auditorias = await auditoriaService.getAuditorias(id_tienda);
        
        
        let auditoriasExtended: auditoria_extended[] = [];

        if(auditorias) {
            const auditoriasExtendedPromesas = auditorias.map(auditoria => 
                getAuditoriaExtendedDadoIdAuditoria(auditoria)
            );
              
            auditoriasExtended = await Promise.all(auditoriasExtendedPromesas);
              
            
        }
        
        res.status(200).json(auditoriasExtended);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getAuditoriaById(req: Request, res: Response) {
    try {
        const id_auditoria = parseInt(req.params.id_auditoria);
        const auditoria: auditorias | null = await auditoriaService.getAuditoriaById(id_auditoria);
        let auditoria_extended: auditoria_extended | null;

        if(auditoria) {           
            auditoria_extended = await getAuditoriaExtendedDadoIdAuditoria(auditoria);         
            res.status(200).json(auditoria_extended || null); 
        }       
           
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getAuditoriaExtendedDadoIdAuditoria(auditoria: auditorias): Promise<auditoria_extended> {
    try {
        const [num_expositores, num_expositores_procesados, datos_barra_progreso] = await Promise.all([
          auditoriaService.getNumExpositoresByAuditoria(auditoria.id),
          auditoriaService.getNumExpositoresProcesadosByAuditoria(auditoria.id),
          getNumberArrayProgresoAuditoria(auditoria.id)
        ]);
      
        const auditoria_extended: auditoria_extended = {
            ...auditoria,
            num_expositores_procesados: num_expositores_procesados,
            num_expositores: num_expositores,
            datos_barra_progreso: datos_barra_progreso                    
        }
        return auditoria_extended;

    } catch (error) {
        // Manejo de errores si alguna de las promesas falla
        console.error("Error al realizar las llamadas concurrentes: ", error);
        throw error;
    }      
}


export async function getElementosProcesadosAuditoria(req: Request, res: Response) {
    try {
        const id_auditoria = parseInt(req.params.id_auditoria);

        const per_ele_aud_brutos: any[] = await auditoriaService.getPertenenciasElementosAuditoria(id_auditoria);
        
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

export async function getBarraProgresoAuditoria(req: Request, res: Response) {
    const id_auditoria = parseInt(req.params.id_auditoria);

    res.status(200).json(await getNumberArrayProgresoAuditoria(id_auditoria));
}

export async function getNumberArrayProgresoAuditoria(id_auditoria: number): Promise<number[]> {
    try {
        if (typeof id_auditoria !== 'number') {
            id_auditoria = parseInt(id_auditoria);
        }

        const expositores_auditoria: per_ele_aud_extended[] | undefined = await auditoriaService.getElementosAuditoriaConElementosYUltimoProcesado(id_auditoria);

        if(!expositores_auditoria) {
            return [];
        }
        // procedemos con la transformación.
        const resultados_expositores: number[] = expositores_auditoria.map(pea => {
        if(pea.procesados_imagenes.length == 0) {
            return 0;
        }
        switch (pea.elementos?.id_categoria) {
            case 1:
                return pea.procesados_imagenes[0].id_probabilidad_cartel || 0;
            case 3:
                const dispositivos_contados = pea.procesados_imagenes[0].dispositivos_contados;
                const huecos_esperados = pea.procesados_imagenes[0].huecos_esperados;
                if (dispositivos_contados != undefined && huecos_esperados != undefined) {
                    return Math.abs(dispositivos_contados - huecos_esperados) + 1;             
                } else {                 
                    return 0;                
                }
            default:
                // Ya hemos validado las categorías, por lo que este caso no debería ocurrir.
                return 0;
        }
        });

        return resultados_expositores;
    } catch (error) {
        console.error('No se pudo obtener la barra de progreso:', error);
        throw error;
    }
}

async function createAuditoria(id_tienda: number): Promise<auditorias | null> {
    try {
        const promises = [];

        // Compruebo que la auditoria tenga algun mueble
        const muebles_tienda = await muebleService.getMueblesAndElementosByIdTienda(id_tienda);
        if(muebles_tienda.length == 0) {
            console.log('Auditoria en tienda ' + id_tienda + ' no creada porque no tiene muebles');
            return null;
        } else {
            // Actualizo la información de la auditoría anterior en caso de que esté caducada
            const last_auditoria: auditorias | null = await auditoriaService.getLastAuditoriaByTienda(id_tienda);
            if(last_auditoria?.id_estado == 1) {
                promises.push( auditoriaService.marcarAuditoriaComoCaducada(last_auditoria.id) );
            }

            const createdAuditoria: auditorias = await auditoriaService.createAuditoria(id_tienda);

            // Almaceno todos los expositores que posee la auditoria en la tabla de auditoria_expositores
            const muebles: any[] = await muebleService.getMueblesAndElementosByIdTienda(id_tienda);

            for (const mueble of muebles) {
                for(const expositor of mueble.expositores) {
                    for (const atributos_expositores of expositor.atributos_expositores) {
                        for (const pertenencia of atributos_expositores.pertenencia_elementos_atributos) {
                            if(pertenencia.elementos.id_categoria != 2) {
                                promises.push(auditoriaService.createPertenenciaElementosAuditoria(createdAuditoria.id, mueble, expositor.id, pertenencia.elementos));
                            }
                        }
                    }
                } 
            }
            await Promise.all(promises);

            console.log('Auditoria creada');

            return createdAuditoria;
        }
    } catch (error) {
        console.log('No se pudo crear la auditoria:', error);
        throw error;
    }
} 

export async function createSingleAuditoria(req: Request, res: Response) {
    try {
        const id_tienda = parseInt(req.body.id_tienda as string);
        
        const createdAuditoria = await createAuditoria(id_tienda);

        if (createdAuditoria !== null) {
            res.status(201).json(createdAuditoria);
            console.log('Auditoria creada');
        } else {
            res.status(500).json({ error: 'No se pudo crear la auditoria' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

export async function createAuditoriaGlobal(_req: Request, res: Response) {
    try {
        // Obtengo todas las tiendas
        const tiendas = await tiendaService.getAllById();

        // Creo todas las auditorias de forma secuencial
        const promises = [];
        for (let tienda of tiendas) {
            promises.push(createAuditoria(tienda.id));
        }

        await Promise.all(promises);

        // Envio mensaje de exito
        res.status(201).json('Auditoria global creada');
        console.log('Auditoria global creada');
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

export async function terminarAuditoria(req: Request, res: Response) {
    try {
        const id_auditoria = parseInt(req.body.id_auditoria);
        console.log('actualizando datos de la auditoria:', id_auditoria);
        await auditoriaService.terminarAuditoria(id_auditoria);
        res.status(200).json({ message: 'Auditoria terminada' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getEstadisticasEstadosAuditoria(_req: Request, res: Response) {
    try {
        const id_estados_excluidos: number[] = [1];
        const estados: estados_extended[] = await auditoriaService.getAllEstadosParaAuditorias(id_estados_excluidos);

        estados.map((estado) => {
            estado.num_auditorias = estado.auditorias?.length;
            estado.auditorias = [];
        })

        res.status(200).json(estados);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getEstadisticasResultadosAuditoria(_req: Request, res: Response) {
    try {
        // Obtener todos el último procesado de cada elemento-auditoria
        const elementos_auditorias: per_ele_aud_extended[] = await auditoriaService.getUltimosProcesadosElementoAuditoriaNotEnProgreso();

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
        const elementos_auditoria = await auditoriaService.getElementosAuditoriaConAuditoriasYUltimoProcesado();

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