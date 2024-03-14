import { Request, Response } from 'express';
import { uniformesService } from '../services/uniformesService';
import { imagenService } from '../services/imagenService';
import { producto } from '@prisma/client';
import { imagenes } from '@prisma/client';
import { productoExtended } from '../interfaces/producto';

export async function getProductos(__req: Request, res: Response) {
    try {
        const productos = await uniformesService.getProductos();
        let productosE: productoExtended[] = [];
        
        // Utiliza Promise.all para esperar a que todas las operaciones asíncronas se completen.
        productosE = await Promise.all(productos.map(async (producto: any) => {
            // Asume que uniformesService.getImage es una operación asíncrona.
            const imagen: imagenes = await uniformesService.getImage(producto.id_imagen);

            return {
                id: producto.id, 
                nombre: producto.nombre,
                precio: producto.precio,
                descripcion: producto.descripcion,
                imagenes: imagen, // Asumiendo que esto devuelve un único resultado o un array de imágenes.
                opciones_caracteristicas: [] // Esto se deja vacío, asumiendo que se llenará en otro lugar.
            };
        }));
        
        res.status(200).json(productosE); // Asegúrate de devolver productosE en lugar de productos.
    } catch (error) { 
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function getCaracteristicas(__req: Request, res: Response) {
    try {
        const caracteristicas = await uniformesService.getCaracteristicas();
        res.status(200).json(caracteristicas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
} //


export async function postNuevoProducto(req: Request, res: Response) {
    try {
         
        const data = req.body;
        const imagenProducto = req.file;


        if (!imagenProducto ||!imagenProducto.path || !imagenProducto.filename) {
            res.status(500).json({ error: "Error con la imagen; server error" });
        }else{
            const [nuevaImagen]  = await Promise.all([
                imagenService.create(imagenProducto.filename, imagenProducto.originalname),
            ]);    

            const producto:producto = {
                id: 0,
                id_imagen: nuevaImagen.id,
                descripcion: data.descripcion,
                genero: data.genero,
                nombre: data.nombre,
                precio: parseFloat(data.precio),
            }
            const nuevoProducto = await uniformesService.postNuevoProducto(producto);
            res.status(200).json(nuevoProducto);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}


export async function postCaracteristicaProducto(req: Request, res: Response) {
    try {
        const data = req.body;
        const nuevoCaracteristica = await uniformesService.postCaracteristicaProducto(data);
        res.status(200).json(nuevoCaracteristica);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

