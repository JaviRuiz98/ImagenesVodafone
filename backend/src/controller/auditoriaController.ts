import { Request, Response } from 'express';

import { auditoriaService } from '../services/auditoriaService';
import { elementosAuditoriaService } from '../services/elementosAuditoriaService';
import { tiendaService } from '../services/tiendasServices';
import { muebleService } from "../services/muebleService";


import { auditorias } from '@prisma/client';

import { auditoria_extended } from '../interfaces/auditoriaExtended';
import { per_ele_aud_extended } from '../interfaces/perEleAudExtended';
import { estados_extended } from '../interfaces/estadosExtended';
import { conteo_movimientos_auditoria } from '../interfaces/auditoria/conteoMovimientosAuditoria';

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

async function getAuditoriaExtendedDadoIdAuditoria(auditoria: auditorias): Promise<auditoria_extended> {
    try {
        const [num_expositores, num_expositores_procesados, datos_barra_progreso] = await Promise.all([
          elementosAuditoriaService.getNumExpositoresByAuditoria(auditoria.id),
          elementosAuditoriaService.getNumExpositoresProcesadosByAuditoria(auditoria.id),
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

export async function getBarraProgresoAuditoria(req: Request, res: Response) {
    const id_auditoria = parseInt(req.params.id_auditoria);

    res.status(200).json(await getNumberArrayProgresoAuditoria(id_auditoria));
}

export async function getNumberArrayProgresoAuditoria(id_auditoria: number): Promise<number[]> {
    try {
        if (typeof id_auditoria !== 'number') {
            id_auditoria = parseInt(id_auditoria);
        }

        const expositores_auditoria: per_ele_aud_extended[] | undefined = await elementosAuditoriaService.getElementosAuditoriaConElementosYUltimoProcesado(id_auditoria);

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
            const muebles = await muebleService.getMueblesAndElementosByIdTienda(id_tienda);

            for (const mueble of muebles) {
                for(const expositor of mueble.expositores) {
                    for (const atributos_expositores of expositor.atributos_expositores) {
                        for (const pertenencia of atributos_expositores.pertenencia_elementos_atributos) {
                            if(pertenencia.elementos.id_categoria != 2) {
                                promises.push(elementosAuditoriaService.createPertenenciaElementosAuditoria(createdAuditoria.id, mueble, expositor.id, pertenencia.elementos));
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
        const id_estados_excluidos: number[] = [];
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

export async function getMovimientosAuditorias(_req: Request, res: Response) {
    try {
        const auditorias = await auditoriaService.getSoloAllAuditoriasInPeriodo();

        if(!!auditorias) {
            const movimientos_auditoria = await agruparAuditorias(auditorias);

            res.status(200).json(movimientos_auditoria);
        } else {
            res.status(404).json({ error: 'No se han podido obtener los movimientos de auditorias' });
        }        
    } catch (error) {
        console.error('No se pudo obtener los movimientos de auditorias:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}   

async function agruparAuditorias(auditorias: auditorias[]): Promise<conteo_movimientos_auditoria> {
    const fechaMin = new Date(Math.min(...auditorias.map(a => new Date(a.fecha).getTime())));
    //const fechaMax = new Date(Math.max(...auditorias.map(a => new Date(a.fecha_fin? a.fecha_fin : a.fecha).getTime())));
    const fechaMax = new Date();
    let fechaActual = new Date(fechaMin);
    const resultado: conteo_movimientos_auditoria = {
        fechas: [],
        iniciadas: [],
        finalizadas: [],
        caducadas: []
    };

    while (fechaActual <= fechaMax || (fechaActual.toISOString().split('T')[0] === fechaMax.toISOString().split('T')[0])) {
        const fechaStr = formatearFecha(fechaActual);
        resultado.fechas.push(fechaStr);
        resultado.iniciadas.push(0);
        resultado.finalizadas.push(0);
        resultado.caducadas.push(0);

        auditorias.forEach(auditoria => {
            const fechaAuditoria = formatearFecha(new Date(auditoria.fecha));
            if (fechaAuditoria === fechaStr) {
                resultado.iniciadas[resultado.iniciadas.length - 1]++;
                if (auditoria.id_estado === 2) {
                    resultado.finalizadas[resultado.finalizadas.length - 1]++;
                } else if (auditoria.id_estado === 3) {
                    resultado.caducadas[resultado.caducadas.length - 1]++;
                }
            }
        });

        fechaActual = agregarDia(fechaActual);

        // Si después de agregar un día, fechaActual es mayor que fechaMax, termina el bucle.
        if (fechaActual > fechaMax && fechaStr === fechaMax.toISOString().split('T')[0]) break;
    }

    return resultado;
}

function formatearFecha(fecha: Date): string {
    return fecha.toISOString().split('T')[0];
}

function agregarDia(fecha: Date): Date {
    const nuevaFecha = new Date(fecha);
    nuevaFecha.setDate(fecha.getDate() + 1);
    return nuevaFecha;
}