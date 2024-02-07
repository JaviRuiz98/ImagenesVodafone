import { Request, Response } from 'express';
import { auditorias } from '@prisma/client';
import { auditoriaService } from '../services/auditoriaService';


export async function getAuditorias(req: Request, res: Response) {
    try {
        const id_tienda = parseInt(req.params.id_tienda as string);

        const auditorias: auditorias[]|null = await auditoriaService.getAuditorias(id_tienda);
        
        res.status(200).json(auditorias);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function createAuditoria(req: Request, res: Response) {
    try {
        console.log(req.body)
        const id_tienda = parseInt(req.body.id_tienda as string);
        const createdAuditoria: auditorias = await auditoriaService.createAuditoria(id_tienda);
        res.status(201).json(createdAuditoria);
        console.log('Auditoria creada');
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}