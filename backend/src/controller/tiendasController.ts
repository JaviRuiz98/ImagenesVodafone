import { Request, Response } from 'express';
import { tiendaService } from '../services/tiendasServices';
import { tiendas } from '@prisma/client';

export async function getAllTiendas(req: Request, res: Response) {

    try{
        const tiendaId: number | undefined = req.query.userId ? parseInt(req.query.tiendaId as string) : undefined;
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
        const tienda: tiendas | null = await tiendaService.getBySfid(sfid);
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