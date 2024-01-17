import { tiendas } from "@prisma/client";
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
                                expositorios: {
                                    include: {
                                        imagenes: true,
                                        dispositivos: true,
                                        procesados_imagenes: {
                                            include: {
                                                imagenes: true,
                                                respuestas_carteles: true,
                                                respuestas_movil: true
                                            }
                                        }
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

    async getBySfid(sfid: string): Promise<tiendas | null> {
       try{
            return  db.tiendas.findUnique(
                {
                    where : {
                        sfid: sfid
                    },
                    include:{
                        muebles:{
                            include:{
                                expositorios: {
                                    include: {
                                        imagenes: true,
                                        dispositivos: true,
                                        procesados_imagenes: {
                                            include: {
                                                imagenes: true,
                                                respuestas_carteles: true,
                                                respuestas_movil: true
                                            }
                                        }
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
    }

    
}