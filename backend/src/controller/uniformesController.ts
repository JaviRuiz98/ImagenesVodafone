import { Request, Response } from 'express';
import { uniformesService } from '../services/uniformesService';


export async function getProductos(__req: Request, res: Response) {
    try {
        const productos = await uniformesService.getProductos();
        res.status(200).json(productos);
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
}