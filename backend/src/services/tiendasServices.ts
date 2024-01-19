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
                                expositores: {
                                    include: {
                                        imagenes: true,
                                        procesados_imagenes: {
                                            include: {
                                                respuestas_carteles: true,
                                                respuestas_dispositivos: true
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