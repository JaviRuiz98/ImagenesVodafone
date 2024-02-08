import { Request, Response } from 'express';
import { auditoriaService } from '../services/auditoriaService';
import { auditorias } from '@prisma/client';


export async function getAuditorias(req: Request, res: Response) {
    try {
        const id_tienda = parseInt(req.params.id_tienda as string);
        const auditorias: auditorias[]|null = await auditoriaService.getAuditorias(id_tienda);
        
        res.status(200).json(auditorias);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}