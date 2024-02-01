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
                }
            }, include: {
                                
                expositores: {
                    where: {
                        dispositivos: categoryClause,
                    },
                    include: {
                        imagenes: true, 
                        procesados_imagenes: {
                            include: {
                                imagenes: true,
                                respuestas_carteles: true,
                                respuestas_dispositivos: true,
                                prompts: true
                            }
                        }                                        
                    }
                }
            }
        });

        return muebles;
    }
                                          
}