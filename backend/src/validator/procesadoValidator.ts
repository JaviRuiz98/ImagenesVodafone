
import { Request, Response, NextFunction } from 'express';



//ACTUALIZAR
export async function procesadoValidator(req: Request, res: Response, next: NextFunction) {

    const file = req.file;
    const id_elemento: number = req.body.id_elemento;
    const id_auditoria: number = req.body.id_auditoria;
    const id_expositor: number = req.body.id_expositor;
  
    if (!file) {
        res.status(400).json({ error: 'Es necesario una imagen' });
        return;
    }

    if (!id_elemento) {
        res.status(400).json({ error: 'Expositor es necesario' });
        return;
    }
    if (!id_expositor) {
        res.status(400).json({ error: 'Expositor es necesario' });
        return;
    }

    if (!id_auditoria) {
        res.status(400).json({ error: 'Auditoria es necesario' });
        return;
    }

    next();


}