import { Request, Response } from 'express';
import { mobiliarioService } from '../services/mobiliarioService';
import { MuebleFrontInterfaz } from '../interfaces/muebleFrontendInterfaces';

export async function getFilteredMuebles(req: Request, res: Response) {
    const id_tienda = req.body.id_tienda ? parseInt(req.body.id_tienda as string) : undefined;
    const categoria_clause:  "carteles" | "dispositivos"  | null = req.body.categoria as "carteles" | "dispositivos" | null;
    const orden_clause: 'date_asc' | 'date_desc' | 'result_asc' | 'result_desc' | null  = req.body.orden;
    const prompts_clause: number[] | null  = req.body.prompts;
    const ia_clause: string | null = req.body.ia;  
       


    //validador 
    /*
        comprobar que id_mobiliario es numérico si existe
        comprobar que dispositivos es un array de dos números y el segundo número es mayor que el primero

    */

    const mobiliario: MuebleFrontInterfaz[] = await mobiliarioService.getFilteredMuebles(id_tienda, categoria_clause, orden_clause, prompts_clause, ia_clause);
    res.status(200).json(mobiliario);

}

export async function createMueble(req: Request, res: Response) {
    const data = req.body; //tipar en un futuro

    //hacer valdiator 

    const mobiliario = await mobiliarioService.createMueble(data);
    res.status(200).json(mobiliario);
}

export async function updateMueble(req: Request, res: Response) {
    const data = req.body; //tipar
    const id_mueble = req.params.id_mueble ? parseInt(req.params.id_mueble as string) : undefined;

    //hacer validator
    if (!id_mueble) {
        res.status(400).json({ error: 'id_mueble es necesario' });
        return;
    }

    const mobiliario = await mobiliarioService.updateMueble(id_mueble, data);
    res.status(200).json(mobiliario);
}

export async function getAllMuebles(_req: Request, res: Response) {
    const muebles = await mobiliarioService.getAllMuebles();
    if (!muebles) {
        res.status(204).send();
    }
    res.status(200).json(muebles);
}

export async function getMueblesAndExpositoresActivosByIdTienda(req: Request, res: Response) {
    const id_tienda = parseInt(req.params.id_tienda);
    const muebles: MuebleFrontInterfaz[] = await mobiliarioService.getMueblesAndExpositoresActivosByIdTienda(id_tienda);
    if (!muebles) {
        res.status(204).send();;
    }
    res.status(200).json(muebles);
}