import { Request, Response, NextFunction } from 'express';
import { expositoresService } from '../services/expositorService';



export async function validateGetTiendasBySfid(req:Request, res:Response, next:NextFunction) {
    const sfid = req.params.sfid;
    //const categoria_clause: string  | null = req.body.categoria; validación

    if (!sfid) {
        res.status(400).json({ error: 'Sfid es necesario' });
    }

    
    next();
}

export async function validateGetProcesadosByIdExpositor(req:Request, res:Response, next:NextFunction) {
    const idExpositor = parseInt(req.params.idExpositor);
    //Validar datos de filtro
    /*
    const  orden_clause: 'date_asc' | 'date_desc' | 'result_asc' | 'result_desc' | null  = req.body.orden;
    const prompts_clause: string[] | null  = req.body.prompt;
    const ia_clause : string | null = req.body.ia; 

    const respuestas_carteles_clause: string[] | null = req.body.carteles;
    const respuestas_carteles_dispositivos_clause: string[] | null = req.body.dispositivos;
    */

    if (!idExpositor) {
        res.status(400).json({ error: 'Expositor es necesario' });
        return;
    }
    if (isNaN(idExpositor) || idExpositor <= 0) {
        res.status(400).json({ error: 'Expositor debe ser un numero válido ' });
        return;
    }

    const expositor = await expositoresService.getById(idExpositor);
    if (!expositor) {
        res.status(404).json({ error: 'Expositor no encontrado' });
        return;
    }
    
    next();
    
}

