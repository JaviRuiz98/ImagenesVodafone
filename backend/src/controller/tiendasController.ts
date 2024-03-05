import { Request, Response } from 'express';
import { tiendaService } from '../services/tiendasServices';
import { muebles, tiendas } from '@prisma/client';

export async function getAllTiendas(req: Request, res: Response) {
    try{
        const tiendaId: number | undefined = req.query.tiendaId ? parseInt(req.query.tiendaId as string) : undefined;
        const tiendas: tiendas[] = await tiendaService.getAllById(tiendaId);
        res.status(200).json(tiendas);
    }
    catch (error) {
        console.error('Error al obtener tiendas:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function newTienda(req: Request, res: Response) {
    try{     
        const tienda: tiendas = await tiendaService.newTienda(req.body.parametros);
        const listaIdMuebles = req.body.listaNuevosMuebles.map((mueble: muebles) => mueble.id);
        await tiendaService.asignarPertenenciaMuebleTienda(tienda.id, listaIdMuebles);
        getAllTiendas(req, res);
    }catch (error) {
        console.error('Error al crear tienda:', error);
    }
}

export async function updateTienda(req: Request, res: Response) {
    try{     
        const id_tienda = parseInt(req.params.id_tienda);
        desactivarMueblesTienda(id_tienda);
        const listaIdMuebles = req.body.map((mueble: muebles) => mueble.id);
        await tiendaService.asignarPertenenciaMuebleTienda(id_tienda, listaIdMuebles);
        res.status(200).json(id_tienda);
    }catch (error) {
        console.error('Error al crear tienda:', error);
    }
}

export async function asignarPertenenciaMuebleTienda(req: Request, res: Response) {
    try{     
        const listaMuebles = req.body as { id_mueble: number, nombre_mueble: string, expositores: any[], categoria: string, numero_dispositivos: number | null }[];
        const listaIdMuebles: number[] = listaMuebles.map(mueble => mueble.id_mueble);
        const muebles = await tiendaService.asignarPertenenciaMuebleTienda(parseInt(req.params.id_tienda), listaIdMuebles);
        res.status(200).json(muebles);

    }catch (error) {
        console.error('Error al crear tienda:', error);
    }
}

export async function desactivarMueblesTienda(id_tienda: number) {
    try{     
       await tiendaService.deleteMueblesTienda(id_tienda);
    }catch (error) {
        console.error('Error al crear tienda:', error);
    }
}

export async function activarDesactivarBooleanoTienda(req: Request, res: Response) {
    try{     
        const tienda = await tiendaService.activarDesactivarBooleanoTienda(req.body.tienda, req.body.parametro);
        res.status(200).json(tienda);
    }catch (error) {
        console.error('Error al crear tienda:', error);
    }
}























export async function getTiendaBySfid(req: Request, res: Response) {
    try{
        const sfid = req.params.sfid;
        console.log(req.body);
      

        //obtiene las tiendas ordenadas por categoría_clause
        const tienda: any = await tiendaService.getBySfid(sfid);

      
        if (!tienda) {
            //Contenido vacio
            res.status(204).send();
            return;
        }

        /*for (const mueble of tienda.muebles) {
      
            const promises = mueble.expositores.map( async (expositores: expositores) => 
                
                tiendaService.getProcesadosByIdExpositor(
                    expositores.id_expositor,
                    orden_clause,
                    prompts_clause,
                    ia_clause,
                    respuestas_carteles_clause,
                    respuestas_dispositivos_clause
                )
            );
        
            const resultados = await Promise.all(promises);
          
           
            for (let i = 0; i < mueble.expositores.length; i++) {
                mueble.expositores[i].procesados_imagenes = resultados[i];
            }
        }*/
        res.status(200).json(tienda);
                
    }catch(error){
        console.error('Error al obtener tienda por sfid:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

/*export async function getProcesadosByIdExpositor(req: Request, res: Response) {
    try{
        const idExpositor = parseInt(req.params.idExpositor);
        
        const orden_clause: 'date_asc' | 'date_desc' | 'result_asc' | 'result_desc' | null  = req.body.orden;
        const prompts_clause: number[] | null  = req.body.prompt;
        const ia_clause: string | null = req.body.ia;     
        const respuestas_carteles_clause: string[] | null = req.body.carteles;
        const respuestas_carteles_dispositivos_clause: number[] | null = req.body.dispositivos;

        const procesados: procesados_imagenes[] | null = 
        await tiendaService.getProcesadosByIdExpositor(idExpositor, orden_clause, prompts_clause, ia_clause, respuestas_carteles_clause, respuestas_carteles_dispositivos_clause);

        if (procesados?.length === 0) {
             res.status(204).json({ error: 'procesados vacíos' });
             return;
                   
        }
        if (procesados) {
             res.status(200).json(procesados);
             return;
        }

    } catch(error){
        console.error('Error al obtener tienda por sfid:', error);
        res.status(500).json({ error: 'Internal server error' });
        throw error;
    }
}*/