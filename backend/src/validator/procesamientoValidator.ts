
import { Request, Response, NextFunction } from 'express';


export async function procesamientoValidator(req: Request, res: Response, next: NextFunction) {

    const file = req.file;
    const idExpositorio: number = req.body.idExpositorio;

    if (!file) {
        res.status(400).json({ error: 'Es necesario una imagen' });
    }

    if (!idExpositorio) {
        res.status(400).json({ error: 'Expositor es necesario' });
    }

    next();


}