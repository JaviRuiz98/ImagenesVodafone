import { Request, Response } from 'express';
import { auditoriaService } from '../services/auditoria';
import { auditoria, tiendas } from '@prisma/client';


export async function getAuditorias(req: Request, res: Response) {
    try {
        const id_tienda = parseInt(req.params.id_tienda as string);

        const auditorias: auditoria[] = await auditoriaService.getAuditoriasByIdTienda(id_tienda);
        
        res.status(200).json(auditorias);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}