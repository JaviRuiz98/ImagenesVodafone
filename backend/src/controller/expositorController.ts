import { Request, Response } from 'express';
import { expositoresService } from '../services/expositorService';

export async function createExpositor(req: Request, res: Response) {
    const data = req.body; //tipar en un futuro

    //hacer valdiator 

    const mobiliario = await expositoresService.createExpositor(data);
    res.status(200).json(mobiliario);
}

export async function updateExpositor(req: Request, res: Response) {
    const data = req.body; //tipar
    const id_expositor = req.params.id_expositor ? parseInt(req.params.id_expositor as string) : undefined;

    //hacer validator
    if (!id_expositor) {
        res.status(400).json({ error: 'id_expositor es necesario' });
        return;
    }

    const mobiliario = await expositoresService.updateExpositor(id_expositor, data);
    res.status(200).json(mobiliario);
}