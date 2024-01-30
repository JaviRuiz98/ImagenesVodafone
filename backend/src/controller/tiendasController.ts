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
        const categoria_clause: string  | null = req.body.categoria;
        
        
        const tienda: tiendas | null = await tiendaService.getBySfid(sfid, categoria_clause);
        if (tienda) {
            res.status(200).json(tienda);
        } else {
            res.status(404).json({ error: 'Tienda no encontrada' });
        }
    }catch(error){
        console.error('Error al obtener tienda por sfid:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getProcesadosByIdExpositor(req: Request, res: Response) {
    try{
        const idExpositor = parseInt(req.params.idExpositor);
        
        const  orden_clause: 'date_asc' | 'date_desc' | 'result_asc' | 'result_desc' | null  = req.body.orden;
        const prompts_clause: string[] | null  = req.body.prompt;
        const ia_clause : string | null = req.body.ia; 
   
        const respuestas_carteles_clause: string[] | null = req.body.carteles;
        const respuestas_carteles_dispositivos_clause: string[] | null = req.body.dispositivos;

        const procesados: procesados_imagenes[] | null = 
        await tiendaService.getProcesadosByIdExpositor(idExpositor, orden_clause, prompts_clause, ia_clause, respuestas_carteles_clause, respuestas_carteles_dispositivos_clause);

        if (procesados?.length === 0) {
            res.status(204).json({ error: 'procesados vacíos' });
            
        }
        if (procesados) {
            res.status(200).json(procesados);
        }

    } catch(error){
        console.error('Error al obtener tienda por sfid:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
