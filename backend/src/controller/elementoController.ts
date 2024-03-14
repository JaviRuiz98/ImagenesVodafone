import { Request, Response } from 'express';
import { elementosService } from '../services/elementoService';
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


export async function getElementosActivos(__req: Request, res: Response) {
    try{
        const elementos = await elementosService.getAllActivos();
        res.status(200).json(elementos);
    }catch(error){
        res.status(500).json({ error: 'Error interno del servidor' });
        throw error;
    }
}



export async function deleteElemento(req: Request, res: Response) {
    try{
        const id_elemento = req.params.id_elemento ? parseInt(req.params.id_elemento as string) : undefined;
        //hacer validator
        if (!id_elemento) {
            res.status(400).json({ error: 'id_elemento es necesario' });
            return;
        }
        const mobiliario = await elementosService.deleteElemento(id_elemento);
        res.status(200).json(mobiliario);
    }catch(error){
        
    }
}

export async function guardarElemento(req: Request, res: Response) {
    try{
        const nombre = req.body.nombre; 
        const activo = req.body.activo === 'true';
        const imagenExpositor = req.file;//(files['imagenesprocesado'] as Express.Multer.File[]).map(file => file.path)[0];

        const categoria = parseInt(req.body.categoria);
        
        const row = await fetchGuardarElemento(nombre, activo,  categoria, imagenExpositor);
        
        if (!row) {
            res.status(500).json({ error: 'No pudo procesarse la imagen' });
        }

        res.status(200).json(row);

        // if (!imagenExpositor ||!imagenExpositor.path || !imagenExpositor.filename) {
        //     res.status(500).json({ error: 'La imagen procesada no existe' });
        //     return;
        // }
        // const [nuevaImagen]  = await Promise.all([
        //     imagenService.create(imagenExpositor.filename, imagenExpositor.originalname),
        // ]);    
        // const row = await elementosService.guardarElemento(nombre, activo, nuevaImagen.id, categoria);
    }catch(error){
        res.status(500).json({ error: 'Error interno del servidor' });        
    }
}
    export async function fetchGuardarElemento(nombre: string, activo: boolean,   categoria: number, imagenExpositor?: Express.Multer.File,) {
         try {
            if (!imagenExpositor ||!imagenExpositor.path || !imagenExpositor.filename) {
                return null;
            }
            const [nuevaImagen]  = await Promise.all([
                imagenService.create(imagenExpositor.filename, imagenExpositor.originalname),
            ]);    
            return await elementosService.guardarElemento(nombre, activo, nuevaImagen.id, categoria);
         } catch (error) {
            console.log(error)
            return null;
        }

    }


//Ojo puedes usar directamente el controlador del update para esta función
export async function editarEstadoElemento(req: Request, res: Response){
    try{
        const id_elemento = req.body.id_elemento;
        const activo = req.body.activo;

        const row = await elementosService.editarEstadoelemento(id_elemento, activo);
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


export async function getCategorias_elementos(__req: Request, res: Response) {
    try{
        const categorias = await elementosService.getCategorias();
        res.status(200).json(categorias);
    }catch(error){
       console.log(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}


