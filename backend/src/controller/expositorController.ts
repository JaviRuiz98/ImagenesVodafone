import { Request, Response } from 'express';
import { elementosService } from '../services/expositorService';
import { imagenService } from '../services/imagenService'; // 
export async function createElementos(req: Request, res: Response) {
    const {nombre} = req.body; //tipar en un futuro
    //hacer valdiator 
    const mobiliario = await elementosService.create(nombre);
    res.status(200).json(mobiliario);
}

export async function updateElementos(req: Request, res: Response) {
    const data = req.body; //tipar
    const id_elemento = req.params.id_elemento ? parseInt(req.params.id_elemento as string) : undefined;
    //hacer validator
    if (!id_elemento) {
        res.status(400).json({ error: 'id_elemento es necesario' });
        return;
    }
    const mobiliario = await elementosService.update(id_elemento, data);
    res.status(200).json(mobiliario);
}


export async function getElementos(req: Request, res: Response) {
    try{
        const categoria: number | undefined = parseInt(req.query.categoria as string) || undefined; ; 
        if (categoria && isNaN(categoria)){
            res.status(400).json({ error: 'categoria debe ser un numero' });
            return;
            
        }
        const elementos = await elementosService.getAll(categoria);
        res.status(200).json(elementos);
    } catch(error){
        res.status(500).json({ error: 'Error interno del servidor' });
        throw error;
    }
  
}


export async function deleteElemento(req: Request, res: Response) {
    try{
        const id_expositor = req.params.id_expositor ? parseInt(req.params.id_expositor as string) : undefined;
        //hacer validator
        if (!id_expositor) {
            res.status(400).json({ error: 'id_expositor es necesario' });
            return;
        }
        const mobiliario = await elementosService.deleteElemento(id_expositor);
        res.status(200).json(mobiliario);
    }catch(error){
        
    }
}

export async function guardarElemento(req: Request, res: Response) {
    try{
        const nombre = req.body.nombre; 
        const activo = req.body.activo === 'true';
        const imagenExpositor = req.file;//(files['imagenesprocesado'] as Express.Multer.File[]).map(file => file.path)[0];
        const region = parseInt(req.body.id_region);
        const categoria = req.body.categoria;



        if (!imagenExpositor ||!imagenExpositor.path || !imagenExpositor.filename) {
            res.status(500).json({ error: 'La imagen procesada no existe' });
            return;
        }
        const [nuevaImagen]  = await Promise.all([
            imagenService.create(imagenExpositor.filename, imagenExpositor.originalname),
        ]);    
        const row = await elementosService.guardarElemento(nombre, activo, nuevaImagen.id, region, categoria);
        res.status(200).json(row);
    }catch(error){
        res.status(500).json({ error: 'Error interno del servidor' });        
    }
}

//Ojo puedes usar directamente el controlador del update para esta función

export async function editarEstadoElemento(req: Request, res: Response){
    try{
        const id_expositor = req.body.id_expositor;
        const activo = req.body.activo;

        const row = await elementosService.editarEstadoelemento(id_expositor, activo);
        res.status(200).json(row)

    }catch(error){
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
  

export async function getRegionesDisponibles(__req: Request, res: Response) {
    try{
        const regiones = await elementosService.getRegiones();
        res.status(200).json(regiones); //
    }catch(error){
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

// export async function getExpositoresByIdMueble(req: Request, res: Response) {
//     try{
//         const id_mueble = parseInt(req.params.id_mueble);
//         const expositores = await elementosService.getElm(id_mueble);
//         res.status(200).json(expositores);
//     }catch(error){
//         res.status(500).json({ error: 'Error interno del servidor' });
        
//     }
    
// }