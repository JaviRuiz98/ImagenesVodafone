import { Request, Response } from 'express';
import { auditoriaService } from '../services/auditoriaService';
import { auditoria_extended } from '../interfaces/auditoriaExtended';
import { auditorias } from '@prisma/client';
import { tiendaService } from '../services/tiendasServices';
import { pea_extended } from '../interfaces/peaExtended';

export async function getAuditorias(req: Request, res: Response) {
    try {
        const id_tienda = parseInt(req.params.id_tienda as string);

        let auditorias: auditorias[]|null;
        if(id_tienda == 0) {
            auditorias = await auditoriaService.getAllAuditorias();
        } else {
            auditorias = await auditoriaService.getAuditorias(id_tienda);
        }
        
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

export async function getBarraProgresoAuditoria(req: Request, res: Response) {
    const id_auditoria = parseInt(req.params.id_auditoria);

    res.status(200).json(await getNumberArrayProgresoAuditoria(id_auditoria));
}

async function getNumberArrayProgresoAuditoria(id_auditoria: number): Promise<number[]> {
    try {
        const expositores_auditoria: pea_extended[] | undefined = await auditoriaService.getBarraProgresoAuditoria(id_auditoria);

        if(!expositores_auditoria) {
            return [];
        }


          // procedemos con la transformación.
          const resultados_expositores: number[] = expositores_auditoria.map(pea => {
            if(pea.procesados_imagenes.length == 0) {
                return 0;
            }
            switch (pea.elementos.id_categoria) {
              case 1:
                return pea.procesados_imagenes[0].id_probabilidad_cartel || 0;
              case 2:
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

export async function createAuditoria(req: Request, res: Response) {
    try {
        const id_tienda = parseInt(req.body.id_tienda as string);
        const createdAuditoria: auditorias = await auditoriaService.createAuditoria(id_tienda);
        res.status(201).json(createdAuditoria);
        console.log('Auditoria creada');
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
            promises.push(auditoriaService.createAuditoria(tienda.id));
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