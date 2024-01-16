import { Request, Response } from 'express';
import { tiendaService } from '../services/tiendasServices';
import { tiendas } from '@prisma/client';

export async function getAllTiendas(_req: Request, res: Response) {

    try{
        const tiendas: tiendas[] = await tiendaService.getAll();
        res.status(200).json(tiendas);
    }
    catch (error) {
        console.error('Error in image processing:', error);
        res.status(500).json({ error: 'Internal server error' });
      }

   
}