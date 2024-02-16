
import { Request, Response, NextFunction } from 'express';



//ACTUALIZAR
export async function procesadoValidator(req: Request, res: Response, next: NextFunction) {

    const file = req.file;
    const id_expositor: number = req.body.id_expositor;
    const id_mueble: number = req.body.id_mueble;
  
    if (!file) {
        res.status(400).json({ error: 'Es necesario una imagen' });
        return;
    }

    if (!id_expositor) {
        res.status(400).json({ error: 'Expositor es necesario' });
        return;
    }
    if (!id_mueble) {
        res.status(400).json({ error: 'Mueble es necesario' });
        return;
    }

    next();


}