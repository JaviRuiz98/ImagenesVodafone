import {     muebles, pertenencia_expositor_auditoria, pertenencia_mueble_tienda } from "@prisma/client";
import db  from "../config/database";

import {  MuebleFrontInterfaz } from "../interfaces/muebleFrontendInterfaces";
// import {expositoresConProcesados} from "../interfaces/expositoresProcesados"


export const mobiliarioService = {
    getFilteredMuebles: async (
        id?: number,
        categoria_clause: "carteles" | "dispositivos" | null = null,
        _orden_clause:'date_asc' | 'date_desc' | 'result_asc' | 'result_desc' | null = null,
        _prompts_clause: number[] | null = null,
        _ia_clause: string | null = null,
        ) : Promise<MuebleFrontInterfaz[]> => {

        const whereClause = id ? { some:{id_tienda: id }}: {};

     

        //const orderClause = getOrderClause(orden_clause);

        try{
            
            const muebles = await db.muebles.findMany({
                where:{
                    
                    pertenencia_mueble_tienda: whereClause,
                    
                    categoria: categoria_clause ? categoria_clause : undefined
                        
                },
                include: {
                                    
                    pertenencia_expositor_mueble: {
                        //obtener el expositor mas reciente
                        orderBy: {
                            fecha: 'desc',
                        },

                        take:1,
                    
                        include: {
                        expositores:{
                            include:{
                                imagenes: true,
                                /*procesados_imagenes: {
                                    include: {
                                        imagenes: true,
                                        prompts: true
                                        
                                    },
                                    orderBy: {
                                        fecha: 'desc',
                                    },
            
                                    where: {
                                        prompts:{
                                            id_prompt:{
                                                in: prompts_clause? prompts_clause : undefined
                                            }
                                        },
            
                                        IA_utilizada: ia_clause ? ia_clause : undefined,                                                                        
                                        }  
                                }*/    
                            }
                        } 
                                                            
                        }
                    }
                }
        });

        
        const result: MuebleFrontInterfaz[]  = muebles.map((mueble:muebles) => {
            return mapearResultadoParaFront(mueble);  
        })
    
        return result;
    } catch (error) {
        throw error;
    } finally {
        await db.$disconnect();
    }


    },

    async getMuebleById( id_mueble: number): Promise<muebles | null> {
        return await db.muebles.findUnique({where: {id_mueble: id_mueble}});
    }, 

    //tipar
    async createMueble(mueble: any): Promise<MuebleFrontInterfaz> {
        try {
            const muebleCreated = await db.muebles.create({data: mueble});
            const result = mapearResultadoParaFront(muebleCreated);
            return result;
        } catch (error) {
            throw error;
        } finally{
            await db.$disconnect();
        }
       
    },  
        //tipar
    async updateMueble(id_mueble:number, mueble: any): Promise<MuebleFrontInterfaz | null> {
        try{
            const muebleUpdated = await db.muebles.update({where: {id_mueble: id_mueble}, data: mueble});
            const result = mapearResultadoParaFront(muebleUpdated);
            return result;
            
        } catch (error) {
            throw error;
        } finally{
            await db.$disconnect();
        }
    },
    async getAllMuebles(): Promise<MuebleFrontInterfaz[]> {
        try{
            const muebles =  await db.muebles.findMany( {
                include: {
                    pertenencia_expositor_mueble:{
                        include: {
                            expositores: {
                                include: {
                                    imagenes: true, 
                                   
                                }
                            }
                        }
                    }
                }
            });

            const result: MuebleFrontInterfaz[] = muebles.map((mueble: any) => {
                return mapearResultadoParaFront(mueble);
            });
        
            return result;
        } catch (error) {
            throw error;
        } finally{
            await db.$disconnect();
        }
       
    },

    async  getMueblesAndExpositoresActivosByIdTienda( id_tienda: number): Promise<MuebleFrontInterfaz[]> {
        try{
            const mueblesPertenencia: pertenencia_mueble_tienda[] = await db.pertenencia_mueble_tienda.findMany({
                where: {
               
                    id_tienda: id_tienda
                     
                }, 
                include: {
                    muebles: {
                        include: {
                            pertenencia_expositor_mueble:{
                                include: {
                                    expositores: {
                                        include: {
                                            imagenes: true,
                                            
                                        },
                                        
                                    },
                                    
                                }, orderBy: {
                                    fecha: 'desc'
                                }, 
                                
                            }
                        }
                    }
                        
                }
            });

            const mueblesConExpositores: muebles[]= mueblesPertenencia.map((muebleTienda:any) => {
           
               return muebleTienda.muebles;
            });

                
            //Limitar expositores
            const mueblesModificados = mapearResultadoParaDevolverExpositoresActivos(mueblesConExpositores);
            
       
           
             //Ajustar el resultado para que coincida con la interfaz esperada en el front
             const result: MuebleFrontInterfaz[] = mueblesModificados.map((mueble: any) => {
                return mapearResultadoParaFront(mueble);
            })
            return result;
            
        } catch (error) {
            throw error;
        } finally{
            await db.$disconnect();
        }
    },

    async getMueblesAndExpositoresWithProcesadosByIdAuditoria( id_auditoria: number): Promise<MuebleFrontInterfaz[]> {
        try{
            const mueblesPertenencia: pertenencia_expositor_auditoria[] = await db.pertenencia_expositor_auditoria.findMany({
                where: {
                  id_auditoria: id_auditoria
                }, 
                include: {
                    muebles: {
                        include: {
                            pertenencia_expositor_mueble:{
                                include: {
                                    expositores: {
                                        include: {
                                            imagenes: true,
                                        }
                                    }
                                }
                            }, 
                            
                    
                        }
                    } , 
                    procesados_imagenes: {
                        
                        include: {
                            imagenes: true,
                            prompts: true
                            
                        }
                    }
                }
            });

            const muebles = mueblesPertenencia.map((mueblesPertenencia: any) => mueblesPertenencia.muebles);

             //Limitar expositores
             const mueblesConExpositoresActivos: muebles[] =  mapearResultadoParaDevolverExpositoresActivos(muebles);
             //Ajustar el resultado para que coincida con la interfaz esperada en el front
             const muebleExpositorFormateado: MuebleFrontInterfaz[] = mueblesConExpositoresActivos.map((mueble: any) => {
                 return mapearResultadoParaFront(mueble);
             });

             const procesados = mueblesPertenencia.map((mueblesPertenencia: any) => mueblesPertenencia.procesados_imagenes);

             muebleExpositorFormateado.forEach((mueble: any) => {
                mueble.procesados_imagenes = procesados.filter((procesado: any) => procesado.id_mueble === mueble.id_mueble);
             })

             return muebleExpositorFormateado;

        }  catch (error) {
            throw error;
        } finally{
            await db.$disconnect();
        }
    
    }

                                          
}



//tipar adecuadamente
function mapearResultadoParaFront(mueble: any): MuebleFrontInterfaz {
    const expositores: any[] = 
    mueble.pertenencia_expositor_mueble ? mueble.pertenencia_expositor_mueble.map((pem: any) =>pem.expositores) : []; //expositores
  

    //const expositoresConProcesado: expositoresConProcesados[] = mapearExpositoresConProcesados(expositores, procesados, );

    return {
        id_mueble: mueble.id_mueble,
        nombre_mueble: mueble.nombre_mueble,
        expositores:  expositores,
        categoria: mueble.categoria,
        numero_dispositivos: mueble.numero_dispositivos,
        
    };
}

function mapearResultadoParaDevolverExpositoresActivos(muebles: muebles[]): muebles[] {
    return muebles.map((mueble: any) => {
        const num_expositores: number = mueble.numero_expositores ;
        const expositoresLimitados = mueble.pertenencia_expositor_mueble.slice(0, num_expositores);
    
        return {
            ...mueble,
            pertenencia_expositor_mueble: expositoresLimitados
        };
    });
}


// function getOrderClause( orden_clause:'date_asc' | 'date_desc' | 'result_asc' | 'result_desc' | null) {

//     let orderDirection = orden_clause === 'result_asc' ? 'ASC' : 'DESC';

//     if (orden_clause === 'date_asc' || orden_clause === 'date_desc') {
//         return `ORDER BY procesados_imagenes.fecha ${orden_clause === 'date_asc' ? 'ASC' : 'DESC'}`;
//     } else if (orden_clause === 'result_asc' || orden_clause === 'result_desc') {
//         return `
//             ORDER BY 
//             CASE respuestas_carteles.probabilidad
//                 WHEN 'ninguna' THEN 1
//                 WHEN 'muy bajo' THEN 2
//                 WHEN 'bajo' THEN 3
//                 WHEN 'medio' THEN 4
//                 WHEN 'otro idioma' THEN 5
//                 WHEN 'alto' THEN 6
//                 WHEN 'muy alto' THEN 7
//                 ELSE 8
//             END ${orderDirection},
//             ABS(respuestas_dispositivos.huecos_esperados - respuestas_dispositivos.dispositivos_contados) ${orderDirection}
//         `;
//     } else {
//         return 'ORDER BY procesados_imagenes.fecha DESC';
//     }
// }



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

//  function arrayToString(array: string[] | null ): string | null {
//     return array && array.length > 0 ? array.map(item => `'${item}'`).join(", ") : null;
// }

// //comillas?
// function numberArrayToString(array: number[] | null ): string | null {
//     return array && array.length > 0 ? array.map(item => `${item.toString()}`).join(", ") : null;
// }



 


