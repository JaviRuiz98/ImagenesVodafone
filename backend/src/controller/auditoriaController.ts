import { Request, Response } from 'express';
import { auditorias } from '@prisma/client';
import { auditoriaService } from '../services/auditoriaService';
import { auditoria_extended } from '../interfaces/auditoriaExtended';


export async function getAuditorias(req: Request, res: Response) {
    try {
        const id_tienda = parseInt(req.params.id_tienda as string);

        const auditorias: auditorias[]|null = await auditoriaService.getAuditorias(id_tienda);
        let auditoriasExtended: auditoria_extended[] = [];

        if(auditorias) {
            //añado el num_expositores_auditoria
            for (let i = 0; i < auditorias.length; i++) {
                const num_expositores = await auditoriaService.getNumExpositoresByAuditoria(auditorias[i].id_auditoria);
                const num_expositores_procesados = await auditoriaService.getNumExpositoresProcesadosByAuditoria(auditorias[i].id_auditoria);

                auditoriasExtended[i] = {
                        ...auditorias[i],
                        num_expositores_procesados: num_expositores_procesados,
                        num_expositores: num_expositores                    
                }
            }
            
        }
        
        res.status(200).json(auditoriasExtended);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getAuditoriaById(req: Request, res: Response) {
    try {
        const id_auditoria = parseInt(req.params.id_auditoria as string);
        const auditoria: auditorias | null = await auditoriaService.getAuditoriaById(id_auditoria);
        res.status(200).json(auditoria);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function createAuditoria(req: Request, res: Response) {
    try {
        const id_tienda = parseInt(req.body.id_tienda as string);
        const createdAuditoria: auditorias = await auditoriaService.createAuditoria(id_tienda);
        res.status(201).json(createdAuditoria);
        console.log('Auditoria creada');
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}