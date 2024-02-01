import {  mobiliario, muebles } from "@prisma/client";
import db  from "../config/database";


export const mobiliarioService = {
    getAllMuebles: async (id?: number) : Promise<muebles[]> => {

        const whereClause = id ? { id_mobiliario: id } : {};

        const muebles = await db.muebles.findMany({
            where:{
                pertenencia_mueble_mobiliario:{
                    some:{
                        ...whereClause
                    }
                }
            }, include: {
                pertenencia_mueble_mobiliario: {
                    include: {
                        mobiliario: {
                            include: {
                                pertenencia_mueble_mobiliario: {
                                    include: {
                                        muebles: {
                                            include: {
                                                expositores: {
                                                    /*
                                                    where: {
                                                        dispositivos: whereClause,
                                                    },*/
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
                                        }
                                        
                                    }
                                }
                               
                            }
                        }
                    }
                } 
            }
        });
        return muebles;
    }
}