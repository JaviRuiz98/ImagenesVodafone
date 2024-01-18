
import { Request, Response, NextFunction } from 'express';


export async function procesamientoValidator(req: Request, res: Response, next: NextFunction) {

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const idExpositorio: number = req.body.idExpositorio;

    if (!files['imagenesProcesamiento'] || files['imagenesProcesamiento'].length === 0) {
        res.status(400).json({ error: 'Es necesario un array de imagenes' });
    }

    if (!idExpositorio) {
        res.status(400).json({ error: 'Expositor es necesario' });
    }

    next();


}