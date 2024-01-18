
import { Request, Response, NextFunction } from 'express';


export async function procesamientoValidator(req: Request, res: Response, next: NextFunction) {

    const file = req.file;
    const idExpositor: number = req.body.idExpositor;
    console.log(idExpositor)

    if (!file) {
        res.status(400).json({ error: 'Es necesario una imagen' });
        return;
    }

    if (!idExpositor) {
        res.status(400).json({ error: 'Expositor es necesario' });
        return;
    }

    next();


}