import { Request, Response } from 'express';
import { mobiliarioService } from '../services/mobiliarioService';
import { muebles } from '@prisma/client';

export async function getAllMuebles(req: Request, res: Response) {
    const id_mobiliario = req.query.id_mobiliario ? parseInt(req.query.id_mobiliario as string) : undefined;
    const categoria_clause:  "carteles" | "dispositivos"  | '' = req.body.categoria as "carteles" | "dispositivos" | '';

    const mobiliario: muebles[] = await mobiliarioService.getAllMuebles(id_mobiliario, categoria_clause);
    res.status(200).json(mobiliario);

}
