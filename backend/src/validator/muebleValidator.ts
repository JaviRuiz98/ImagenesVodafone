
import { Request, Response, NextFunction } from 'express';
import { tiendaService } from '../services/tiendasServices';
import { expositorService, muebleService } from '../services/muebleService';

export async function validateGetFilteredMuebles(req: Request, res: Response, next: NextFunction) {


    const id_tienda = parseInt(req.body.id_tienda as string);

    if (!id_tienda) {
        res.status(400).json({ error: 'id_tienda es necesario' });
        return;
    }

    //     const orden_clause:
    //     | "date_asc"
    //     | "date_desc"
    //     | "result_asc"
    //     | "result_desc"
    //     | null = req.body.orden;
    // const prompts_clause: number[] | null = req.body.prompts;
    // const ia_clause: string | null = req.body.ia;

    /* Más validadores */
    next();
}

export async function validateMuebleByIdTienda( req: Request, res: Response, next: NextFunction ) {
    const id_tienda = parseInt( req.body.id_tienda as string );
    const idCorrect = validateIdExistsAndIsValidInteger(id_tienda);

    if (!idCorrect) {
        res.status(400).json({ error: 'id_tienda debe ser un numero' });
        return;
    }
    const tienda = await tiendaService.getAllById(id_tienda);
    if (!tienda) {
        res.status(400).json({ error: 'tienda no existe' });
        return;
    }
    next();
}
export async function validateUpdateExpositor( req: Request, res: Response, next: NextFunction ) {
    const id_expositor = parseInt( req.body.id_expositor as string );
    const idCorrect = validateIdExistsAndIsValidInteger(id_expositor);

    if (!idCorrect) {
        res.status(400).json({ error: 'id_expositor debe ser un numero' });
        return;
    }
    const expositor = expositorService.getById(id_expositor);
    if (!expositor) {
        res.status(400).json({ error: 'expositor no existe' });
        return;
    }
    next();
}
export async function validateIdMueble( req: Request, res: Response, next: NextFunction ) {

    const id_mueble = parseInt(req.params.id as string);
    const idCorrect = validateIdExistsAndIsValidInteger(id_mueble); 

    if (!idCorrect) {
        res.status(400).json({ error: 'id_mueble debe ser un numero' });
        return;
    }
    const mueble = await muebleService.getMuebleById(id_mueble);
    if (!mueble) {
        res.status(400).json({ error: 'mueble no existe' });
        console.log(321);
        return;
    }

    next();

}
 function validateIdExistsAndIsValidInteger(id: number) {
    if (isNaN(id) || id <= 0) {
        return false;
    }
    return true;
}

