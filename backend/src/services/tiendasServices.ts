import { procesados_imagenes, tiendas } from "@prisma/client";
import db  from "../config/database";

export const tiendaService = {

    async getAllById(idTienda?: number): Promise<tiendas[]> {
        try{
            const whereClause =  idTienda? {id_tienda:idTienda} : {};
            return  db.tiendas.findMany(
                {
                    orderBy: {
                        id_tienda: 'asc'
                    },

                    where : whereClause,
                    include:{
                        muebles:{
                            include:{
                                expositores: {
                                    include: {
                                        imagenes: true,                                        
                                        }
                                    }
                                }
                            }
                        }
                    
                }
                
            );
        }  catch(error){
            console.log(error);
            throw error;
        }finally{
            db.$disconnect();
        }
        
        
       
    },

    async getBySfid(
        sfid: string,
        categoria_clause: string  | null,  
        ): Promise<tiendas | null> {

            //const whereCategoriaClause =  categoria_clause? {procesados_imagenes: {prompt: {categoria: categoria_clause}}} : {};
     
       try{
             
             return  db.tiendas.findUnique(
                {
                    where : {
                        sfid: sfid,

                    },
                    include:{
                        muebles:{
                            include:{
                                expositores: {
                                    include: {
                                        imagenes: true,
                                                                   
                                    }                            
                                }
                            }
                        }
                    
                    }
                }, 
            );
            
        }  catch(error){
            console.log(error);
            throw error;
        }finally{
            db.$disconnect();
        }
    }, 

    async  getProcesadosByIdExpositor(
        id_expositor: number,
        orden_clause:'date_asc' | 'date_desc' | 'result_asc' | 'result_desc' | null,
        prompts_clause: string[] | null,
        ia_clause : string | null,
   
        respuesta_carteles_clause: string [] | null,
        respuesta_carteles_dispositivos_clause: string[] | null  
        
        ): Promise<procesados_imagenes[] | null> {
        try{
                  
        let orderClause: any = 'ORDER BY procesados_imagenes.fecha DESC'
        let orderDirection: 'ASC' | 'DESC' = 'DESC';

        switch (orden_clause) {
            case 'date_asc':
                orderClause = 'ORDER BY procesados_imagenes.fecha ASC';
                break;
            case 'date_desc':
                orderClause = 'ORDER BY procesados_imagenes.fecha DESC';
                break;
            case 'result_asc':
                orderDirection = 'ASC';
                break;
            case 'result_desc':
                orderDirection = 'DESC';
                break;
            default:
                orderClause = 'ORDER BY procesados_imagenes.fecha DESC';
                break;
        }

        if (orden_clause === 'result_asc' || orden_clause === 'result_desc') {
            orderClause = `
                ORDER BY 
                CASE respuestas_carteles.probabilidad
                    WHEN 'ninguna' THEN 1
                    WHEN 'muy bajo' THEN 2
                    WHEN 'bajo' THEN 3
                    WHEN 'medio' THEN 4
                    WHEN 'otro idioma' THEN 5
                    WHEN 'alto' THEN 6
                    WHEN 'muy alto' THEN 7
                    ELSE 8
                END ${orderDirection},
                ABS(respuestas_dispositivos.huecos_esperados - respuestas_dispositivos.dispositivos_contados) ${orderDirection}
            `;
        }
        
        let promptsString: string  | null = null;
        if (prompts_clause != null){
            promptsString = prompts_clause.length > 0 ? prompts_clause.map(item => `'${item}'`).join(", ") : null;
        }
       
       
        let respuestaCartelesString: string  | null = null;
        if (respuesta_carteles_clause != null){
            respuestaCartelesString = respuesta_carteles_clause.length > 0 ? respuesta_carteles_clause.map(item => `'${item}'`).join(", ") : null;
        }

        let respuestaDispositivosString: string  | null = null;
        if (respuesta_carteles_dispositivos_clause != null){
            respuestaDispositivosString = respuesta_carteles_dispositivos_clause.length > 0 ? respuesta_carteles_dispositivos_clause.map(item => `'${item}'`).join(", ") : null;
        }


        let whereClause: any = `
        WHERE
            procesados_imagenes.id_expositor = '${id_expositor}'
            ${prompts_clause ? `AND prompts.id_prompt IN (${promptsString})` : ''}
            ${ia_clause ? `AND procesados_imagenes.IA_utilizada = '${ia_clause}'` : ''}
            ${respuesta_carteles_clause ? `AND respuestas_carteles.probabilidad IN (${respuestaCartelesString})` : ''}
            ${respuesta_carteles_dispositivos_clause ? 
                `AND ABS(respuestas_dispositivos.huecos_esperados - respuestas_dispositivos.dispositivos_contados) 
                 IN  (${respuestaDispositivosString})`  : ''}
  
        ` 

       
        return  await db.$queryRaw`
        SELECT 
            procesados_imagenes.*, 
            respuestas_carteles.*, 
            respuestas_dispositivos.*, 
            prompts.*
        FROM 
            procesados_imagenes
        LEFT JOIN 
            respuestas_carteles ON respuestas_carteles.id_procesado_imagen = procesados_imagenes.id_procesado_imagen
        LEFT JOIN 
            respuestas_dispositivos ON respuestas_dispositivos.id_procesado_imagen = procesados_imagenes.id_procesado_imagen
        LEFT JOIN 
            prompts ON prompts.id_prompt = procesados_imagenes.id_prompt_usado
        ${whereClause};
           
        ${orderClause};
    
        `;
        }  catch(error){
            console.log(error);
            throw error;
        }finally{
            db.$disconnect();
        
        }
    }
    
    
}