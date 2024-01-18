import { Request, Response } from 'express';
import { getDestination } from '../config/multer';


export async function getImagenesReferencia(req: Request, res: Response) {
    const nombreImagen = req.params.nombre;
    res.sendFile(nombreImagen, { root: getDestination('imagenesReferencia') });
}

export async function getImagenesProcesado(req: Request, res: Response) {
    const nombreImagen = req.params.nombre;
    res.sendFile(nombreImagen, { root: getDestination('imagenesProcesamiento') });
}