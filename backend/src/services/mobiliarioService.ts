import {   muebles } from "@prisma/client";
import db  from "../config/database";


export const mobiliarioService = {
    getAllMuebles: async (id?: number,  categoria_clause: "carteles" | "dispositivos" | '' = '') : Promise<muebles[]> => {

        const whereClause = id ? { some:{id_mobiliario: id }}: {};

        let categoryClause =  {};
        if (categoria_clause != ''){
            categoryClause = categoria_clause == "dispositivos" ? {some:{}}  : {none:{}};
        }

        const muebles = await db.muebles.findMany({
            where:{
                pertenencia_mueble_mobiliario:{
                    ...whereClause
                },
                
                expositores: {
                    every: {
                        dispositivos: categoryClause,
                    }
                }
                
                
            }, include: {
                                
                expositores: {
                  
                    include: {
                        imagenes: true, 
                        procesados_imagenes: {
                            include: {
                                imagenes: true,
                                respuestas_carteles: true,
                                respuestas_dispositivos: true,
                                prompts: true
                            },
                            orderBy: {
                                fecha: 'desc'
                            }
                        }                                        
                    }
                }
            }
        });

        return muebles;
    }
                                          
}


//     async  getProcesadosByIdExpositor(
//             id_expositor: number,
//             orden_clause:'date_asc' | 'date_desc' | 'result_asc' | 'result_desc' | null,
//             prompts_clause: number[] | null,
//             ia_clause : string | null,
//             respuesta_carteles_clause: string [] | null,
//             respuesta_dispositivos_clause: number[] | null  
            
//             ): Promise<procesados_imagenes[] | null> {

//         try{
                    
        
//             const orderClause = getOrderClause(orden_clause);
            

//             const promptsNumber = numberArrayToString(prompts_clause);
//             const respuestaCartelesString = arrayToString(respuesta_carteles_clause);


//             const whereClause: string = `
//             WHERE
//                 procesados_imagenes.id_expositor = ${id_expositor}
//                 ${prompts_clause ? `AND prompts.id_prompt IN (${promptsNumber})` : null}
//                 ${ia_clause ? `AND procesados_imagenes.IA_utilizada = '${ia_clause}'` : null}
//                 ${respuesta_carteles_clause ? `AND respuestas_carteles.probabilidad IN (${respuestaCartelesString})` : null}
//                 ${respuesta_dispositivos_clause ? 
//                     `AND ABS(respuestas_dispositivos.huecos_esperados - respuestas_dispositivos.dispositivos_contados) 
//                         BETWEEN  ${respuesta_dispositivos_clause[0]} AND ${respuesta_dispositivos_clause[1]}`  : null}
//             ` 
//             const query = 
//             `
//             SELECT 
//                 procesados_imagenes.*, 
//                 respuestas_carteles.*, 
//                 respuestas_dispositivos.*, 
//                 prompts.*
//             FROM 
//                 procesados_imagenes
//             LEFT JOIN 
//                 respuestas_carteles ON respuestas_carteles.id_procesado_imagen = procesados_imagenes.id_procesado_imagen
//             LEFT JOIN 
//                 respuestas_dispositivos ON respuestas_dispositivos.id_procesado_imagen = procesados_imagenes.id_procesado_imagen
//             LEFT JOIN 
//                 prompts ON prompts.id_prompt = procesados_imagenes.id_prompt_usado
//             ${whereClause}
//             ${orderClause}            
//             `
            
//             return  await db.$queryRaw`
//             SELECT 
//                 procesados_imagenes.*, 
//                 respuestas_carteles.*, 
//                 respuestas_dispositivos.*, 
//                 imagenes.*,
//                 prompts.*
//             FROM 
//                 procesados_imagenes
//             LEFT JOIN 
//                 respuestas_carteles ON respuestas_carteles.id_procesado_imagen = procesados_imagenes.id_procesado_imagen
//             LEFT JOIN 
//                 respuestas_dispositivos ON respuestas_dispositivos.id_procesado_imagen = procesados_imagenes.id_procesado_imagen
//             LEFT JOIN 
//                 prompts ON prompts.id_prompt = procesados_imagenes.id_prompt_usado
//             LEFT JOIN
//                 imagenes ON imagenes.id_imagen = procesados_imagenes.id_imagen
            
//             WHERE 
//                 procesados_imagenes.id_expositor = ${id_expositor}
            
//             `;
        
//         }  catch(error){
//             console.log(error);
//             throw error;
//         }finally{
//             db.$disconnect();
//         }
    // }   


/*
 function getOrderClause( orden_clause:'date_asc' | 'date_desc' | 'result_asc' | 'result_desc' | null) {

    let orderDirection = orden_clause === 'result_asc' ? 'ASC' : 'DESC';

    if (orden_clause === 'date_asc' || orden_clause === 'date_desc') {
        return `ORDER BY procesados_imagenes.fecha ${orden_clause === 'date_asc' ? 'ASC' : 'DESC'}`;
    } else if (orden_clause === 'result_asc' || orden_clause === 'result_desc') {
        return `
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
    } else {
        return 'ORDER BY procesados_imagenes.fecha DESC';
    }
}

function arrayToString(array: string[] | null ): string | null {
    return array && array.length > 0 ? array.map(item => `'${item}'`).join(", ") : null;
}

//comillas?
function numberArrayToString(array: number[] | null ): string | null {
    return array && array.length > 0 ? array.map(item => `${item.toString()}`).join(", ") : null;
}
*/
