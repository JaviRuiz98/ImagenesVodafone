import { Request, Response } from 'express';
import { tiendaService } from '../services/tiendasServices';
import { procesados_imagenes, tiendas } from '@prisma/client';

export async function getAllTiendas(req: Request, res: Response) {

    try{
        const tiendaId: number | undefined = req.query.tiendaId ? parseInt(req.query.tiendaId as string) : undefined;
        const tiendas: tiendas[] = await tiendaService.getAllById(tiendaId);
        res.status(200).json(tiendas);
    }
    catch (error) {
        console.error('Error al obtener tiendas:', error);
        res.status(500).json({ error: 'Internal server error' });
      }

   
}

export async function getTiendaBySfid(req: Request, res: Response) {
    try{
        const sfid = req.params.sfid;
        const categoria_clause:  "carteles" | "dispositivos"  | null = req.body.categoria as "carteles" | "dispositivos" | null;
        const orden_clause: 'date_asc' | 'date_desc' | 'result_asc' | 'result_desc' | null  = req.body.orden;
        const prompts_clause: number[] | null  = req.body.prompt;
        const ia_clause: string | null = req.body.ia;     
        const respuestas_carteles_clause: string[] | null = req.body.carteles;
        const respuestas_carteles_dispositivos_clause: number[] | null = req.body.dispositivos;

        //obtiene las tiendas ordenadas por categoría_clause
        const tienda: any = await tiendaService.getBySfid(sfid, categoria_clause);

        if (!tienda) {
            //Contenido vacio
            res.status(204).send();
            return;
        }

        for (const mueble of tienda.muebles) {
            for (const expositor of mueble.expositores) {
                // Obtener procesados ordenados para cada expositor
                expositor.procesados = 
                await tiendaService.getProcesadosByIdExpositor(
                    expositor.id,
                    orden_clause,
                    prompts_clause,
                    ia_clause,
                    respuestas_carteles_clause,
                    respuestas_carteles_dispositivos_clause);
            }
        }


        
    }catch(error){
        console.error('Error al obtener tienda por sfid:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getProcesadosByIdExpositor(req: Request, res: Response) {
    try{
        const idExpositor = parseInt(req.params.idExpositor);
        
        const orden_clause: 'date_asc' | 'date_desc' | 'result_asc' | 'result_desc' | null  = req.body.orden;
        const prompts_clause: number[] | null  = req.body.prompt;
        const ia_clause: string | null = req.body.ia;     
        const respuestas_carteles_clause: string[] | null = req.body.carteles;
        const respuestas_carteles_dispositivos_clause: number[] | null = req.body.dispositivos;

        const procesados: procesados_imagenes[] | null = 
        await tiendaService.getProcesadosByIdExpositor(idExpositor, orden_clause, prompts_clause, ia_clause, respuestas_carteles_clause, respuestas_carteles_dispositivos_clause);

        if (procesados?.length === 0) {
             res.status(204).json({ error: 'procesados vacíos' });
             return;
                   
        }
        if (procesados) {
             res.status(200).json(procesados);
             return;
        }

    } catch(error){
        console.error('Error al obtener tienda por sfid:', error);
        res.status(500).json({ error: 'Internal server error' });
        throw error;
    }
}
