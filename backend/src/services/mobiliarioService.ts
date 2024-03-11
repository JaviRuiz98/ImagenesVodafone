import {  expositores, muebles } from "@prisma/client";
import db from "../config/database";
import { muebleCreation } from "../interfaces/mueblesCreados";

// import { ExpositorFrontInterfaz } from "../interfaces/muebleFrontendInterfaces";
// import {expositoresConProcesados} from "../interfaces/expositoresProcesados"

export const mobiliarioService = {
    async getHuecosDisponibles (id_mueble: number)  {
        try {
           return await db.muebles.count(
                { 
                    where: { 
                        id: id_mueble,
                        expositores: {
                            some: {
                                atributos_expositores: {
                                    some: {
                                        pertenencia_elementos_atributos: {
                                            some: {
                                                elementos: {
                                                    id_categoria: 3,
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }, 
                   
                });
        } catch (error) {
            throw error;
        } finally {
            await db.$disconnect();
        }
    },
    getFilteredMuebles: async (
        id?: number,
        _orden_clause:
            | "date_asc"
            | "date_desc"
            | "result_asc"
            | "result_desc"
            | null = null,
        _prompts_clause: number[] | null = null,
        _ia_clause: string | null = null
    ): Promise<any[]> => {
        try {
            throw new Error(
                `No se implementado el getFilteredMuebles ${id} ${_orden_clause} ${_prompts_clause} ${_ia_clause}`
            );
        } catch (error) {
            throw error;
        } finally {
            await db.$disconnect();
        }
    },

    async getMuebleById(id_mueble: number): Promise<muebles | null> {
        return await db.muebles.findUnique({ where: { id: id_mueble } });
    },

    async createMueble(mueble: muebleCreation): Promise<muebles> {
        try {
            const result: muebles = await db.$transaction( async (prisma) => {
                //Crear mueble:
                const newMueble = await prisma.muebles.create({
                    data: {
                        nombre: mueble.nombre_mueble,
                        id_region: mueble.region?.id,  
                    }
                });
                
                for ( const expositores of mueble.expositores) {
                    //creo expositor
                    const newExpositor = await prisma.expositores.create({
                        data: {
                            id_mueble: newMueble.id,
                            nombre: expositores.nombre_expositor,
                        }
                    });

                    for (const atributo of expositores.atributos_expositores) {
                        //creo atributo
                        const newAtributo = await prisma.atributos_expositores.create({
                            data: {
                                id_expositor: newExpositor.id,
                                id_categoria: atributo.categorias_elementos?.id,
                                x_start: atributo.x_start,
                                y_start: atributo.y_start,
                                alto: atributo.alto,
                                ancho: atributo.ancho,
                                angulo: atributo.angulo,
                            },
                        });
                        //creo pertenencia atributo
                        // console.log("atributo", atributo);
                        // console.log ("pertenencia", atributo.elemento);
                        // console.log ("pertenencia", atributo.elemento?.id);
                        if (atributo.elemento?.id) {
                            await prisma.pertenencia_elementos_atributos.create({
                                data: {
                                    id_atributos_expositores: newAtributo.id,
                                    id_elementos: atributo.elemento?.id,
                                }
                            })
                        }
                       
                      
                      
                        
                    }
                   
                }
                return newMueble;
            });
         
            return result;

        } catch (error) {
            throw error;
        } finally {
            await db.$disconnect();
        }
    },
    //tipar
    async updateMueble(id_mueble: number, mueble: any): Promise<muebles | null> {
        try {
            throw new Error(
                `No se implementado el update de muebles ${id_mueble} ${mueble}`
            );
        } catch (error) {
            throw error;
        } finally {
            await db.$disconnect();
        }
    },
    async getAllMuebles(): Promise<any> {
        try {
            
            const muebles = await db.muebles.findMany({
                include: {   
                    regiones: true,
                    expositores: {
                        include: {
                            atributos_expositores: {
                                include: {
                                    
                                    categorias_elementos:true,
                                    pertenencia_elementos_atributos: {
                                        include: {
                                            elementos: {
                                                include: {
                                                    imagenes: true,
                                                    categorias_elementos: true
                                                },
                                            },
                                        },
                                        orderBy: {
                                            fecha: "desc",
                                        },
                                        take: 1,
                                    },
                                },
                                
                            },
                        },
                    },
                },
            });

            const mueblesMapeados = muebles.map((mueble) => {
                const expositores = mueble.expositores.map((expositor) => {
                    const atributos = expositor.atributos_expositores.map((atributo) => {
                        const elemento = atributo.pertenencia_elementos_atributos.map((pertenencia) => pertenencia.elementos)[0]; //quiero devolver el elemento activo
                        return { ...atributo, elemento }; 
                    });
                    return { ...expositor, atributos_expositores: atributos }; 
                });
                return { ...mueble, expositores };
            });
            return mueblesMapeados;

        

        } catch (error) {
            throw error;
        } finally {
            await db.$disconnect();
        }
    },

    async getMueblesAndElementosByIdTienda(
        id_tienda: number
    ) {
        try {
            const muebles = await db.muebles.findMany({
                where: {
                    pertenencia_mueble_tienda: {
                        some: {
                            tiendas: {
                                id: id_tienda,
                            },
                        },
                    },
                },
                include: {
                    expositores: {
                        include: {
                            atributos_expositores: {
                                include: {
                                    pertenencia_elementos_atributos: {
                                        include: {
                                            elementos: true,
                                        },
                                        orderBy: {
                                            fecha: "desc",
                                        },
                                        take: 1,
                                    },
                                },
                            },
                        },
                    },
                },
            });


            return muebles;
        } catch (error) {
            throw error;
        } finally {
            await db.$disconnect();
        }
    },

    async getMueblesAndExpositoresActivosByIdTienda(
        id_tienda?: number
    ): Promise<any[]> {

        if (!id_tienda) return this.getAllMuebles();
        try {
            const muebles = await db.muebles.findMany({
                where: {
                    pertenencia_mueble_tienda: {
                        some: {
                            tiendas: {
                                id: id_tienda,
                            },
                        },
                    },
                },
                include: {
                    pertenencia_mueble_tienda:{
                        where:{
                            id_tienda: id_tienda
                        },
                        include:{
                            posiciones_muebles_tienda: {
                                where:{
                                    activo:true
                                }
                            }
                        }
                    },
                    expositores: {
                        include: {
                            atributos_expositores: {
                                include: {
                                    pertenencia_elementos_atributos: {
                                        include: {
                                            elementos: {
                                                include: {
                                                    imagenes: true,
                                                },
                                            },
                                        },
                                        orderBy: {
                                            fecha: "desc",
                                        },
                                        take: 1,
                                    },
                                },
                            },
                        },
                    },
                },
            });

        
            return muebles;
        } catch (error) {
            throw error;
        } finally {
            await db.$disconnect();
        }
    }
}

export const expositorService = {
    async updateExpositor(id_expositor: number, nombre:string, atributos_expositores: 
        {
            id?: number;
            elemento?: {
                id?: number;
            }; 
        } []
    ): Promise<expositores | null> {
        try {
            const expositor = await db.expositores.update({ 
                 where: { id: id_expositor },
                 data: { nombre:nombre }
            });

            for (const atributo of atributos_expositores) {
                if (atributo.id && atributo.elemento?.id) { 
                    await db.pertenencia_elementos_atributos.create({
                        data: {
                            id_atributos_expositores: atributo.id,
                            id_elementos: atributo.elemento.id
                        }
                    })
                }
            }
            return expositor;

        } catch (error) {
            throw error;
        } finally {
            await db.$disconnect();
        }
    }
}

  

// //NO FUNCIONA
// function mapearResultadoParaFront(mueble: any): MuebleFrontInterfaz {

//     let elementos = [];

//     if (mueble.pertenencia_elemento_mueble) {
//         elementos = mueble.pertenencia_expositor_mueble.map((pem: any) => pem.elementos);
//     }

//     return {
//         id: mueble.id,
//         nombre_mueble: mueble.nombre_mueble,
//         elementos: elementos,
//         numero_expositores_carteles: mueble.numero_expositores_carteles,
//         numero_expositores_dispositivos: mueble.numero_expositores_dispositivos,
//     };
// }

// //NO FUNCIONA
// function mapearResultadoParaDevolverElementosActivos(muebles: muebles[]): muebles[] {
//     return muebles.map((mueble: any) => {
//         const num_expositores: number = mueble.numero_expositores ;
//         const expositoresLimitados = mueble.pertenencia_expositor_mueble.slice(0, num_expositores);

//         return {
//             ...mueble,
//             pertenencia_expositor_mueble: expositoresLimitados
//         };
//     });
// }

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
