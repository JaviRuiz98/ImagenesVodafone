import { Request, Response } from 'express';
import { mobiliarioService } from '../services/mobiliarioService';
import { muebles } from '@prisma/client';

export async function getAll(req: Request, res: Response) {
    const id_mobiliario = req.query.id_mobiliario ? parseInt(req.query.id_mobiliario as string) : undefined;
    const mobiliario: muebles[] = await mobiliarioService.getAllMuebles(id_mobiliario);
    res.status(200).json(mobiliario);
}