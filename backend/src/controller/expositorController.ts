import { Request, Response } from 'express';
import { expositoresService } from '../services/expositorService';

import { imagenService } from '../services/imagenService'; // 
export async function createExpositor(req: Request, res: Response) {
    const {nombre} = req.body; //tipar en un futuro
    //hacer valdiator 
    const mobiliario = await expositoresService.createExpositor(nombre);
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


export async function getExpositores(_req: Request, res: Response) {
    const expositores = await expositoresService.getExpositores();
    res.status(200).json(expositores);
}


export async function deleteExpositor(req: Request, res: Response) {
    try{
        const id_expositor = req.params.id_expositor ? parseInt(req.params.id_expositor as string) : undefined;
        //hacer validator
        if (!id_expositor) {
            res.status(400).json({ error: 'id_expositor es necesario' });
            return;
        }
        const mobiliario = await expositoresService.deleteExpositor(id_expositor);
        res.status(200).json(mobiliario);
    }catch(error){
        
    }
}

export async function guardarExpositor(req: Request, res: Response) {
    try{
        const nombre = req.body.nombre; 
        const activo = req.body.activo === 'true';
        const imagenExpositor = req.file;//(files['imagenesprocesado'] as Express.Multer.File[]).map(file => file.path)[0];

        if (!imagenExpositor ||!imagenExpositor.path || !imagenExpositor.filename) {
            res.status(500).json({ error: 'La imagen procesada no existe' });
            return;
        }
        const [nuevaImagen]  = await Promise.all([
            imagenService.create(imagenExpositor.filename, imagenExpositor.originalname),
        ]);    
        const row = await expositoresService.guardarExpositor(nombre, activo, nuevaImagen.id_imagen);
        res.status(200).json(row);
    }catch(error){
        res.status(500).json({ error: 'Error interno del servidor' });        
    }
}
  