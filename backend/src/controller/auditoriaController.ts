import { Request, Response } from 'express';
import { auditoriaService } from '../services/auditoriaService';
import { auditoria_extended } from '../interfaces/auditoriaExtended';
import { auditorias } from '@prisma/client';
import { tiendaService } from '../services/tiendasServices';

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
        const id_auditoria = parseInt(req.params.id_auditoria);
        const auditoria: auditorias | null = await auditoriaService.getAuditoriaById(id_auditoria);
        let auditoriasExtended: auditoria_extended | undefined;

        if(auditoria) {
            //añado el num_expositores_auditoria
            const num_expositores = await auditoriaService.getNumExpositoresByAuditoria(auditoria.id_auditoria);
            const num_expositores_procesados = await auditoriaService.getNumExpositoresProcesadosByAuditoria(auditoria.id_auditoria);

            auditoriasExtended = {
                    ...auditoria,
                    num_expositores_procesados: num_expositores_procesados,
                    num_expositores: num_expositores                    
            }            
        }
        
        res.status(200).json(auditoriasExtended);    
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
            promises.push(auditoriaService.createAuditoria(tienda.id_tienda));
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