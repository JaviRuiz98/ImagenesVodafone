
import { Request, Response, NextFunction } from 'express';
import { expositorioService } from '../services/expositorioService';
import { expositorios } from '@prisma/client';


export async function procesamientoValidator(req: Request, res: Response, next: NextFunction) {

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const expositorio:expositorios = req.body; 

    if (!files['imagenesProcesamiento'] || files['imagenesProcesamiento'].length === 0) {
        res.status(400).json({ error: 'An array of images is required' });
    }

    if (!expositorio) {
        res.status(400).json({ error: 'Expositorio is required' });
    }
    
    const existingExpositorio: expositorios | null = await expositorioService.getById(expositorio.id_expositorio);

    if (!existingExpositorio) {
        res.status(404).json({ error: 'Expositorio not found' });
    }

    next();


}