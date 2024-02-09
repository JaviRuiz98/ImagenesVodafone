import {   tiendas } from "@prisma/client";
import db  from "../config/database";

export const tiendaService = {

    async getAllById(idTienda?: number): Promise<tiendas[]> {
        try{
            // Obtenemos todos los expositores junto con sus imágenes
            const whereClause =  idTienda? {id_tienda:idTienda} : {};
            const tiendas = await db.tiendas.findMany(
                {
                    orderBy: {
                        id_tienda: 'asc'
                    },

                    where : whereClause,
                    include:{
                        pertenencia_mueble_tienda:{
                            include:{
                                muebles:{
                                    select:{
                                        id_mueble: true,
                                        
                                    }
                                }
                            }
                          
                        }
                    }
                }
            );
            return tiendas as tiendas[];
        
        }  catch(error){
            console.log(error);
            throw error;

        }finally{
            db.$disconnect();
        }
        
        
       
    },



    async getBySfid(sfid: string): Promise<tiendas | null> {
        try {       
            return await db.tiendas.findUnique({
                where: {
                    sfid: sfid
                },
                include: {
                    pertenencia_mueble_tienda:{
                        include:{
                            muebles:{
                                select:{
                                    id_mueble: true,
                                    
                                }
                            }
                        }
                    }
                }
            });
      } catch (error) {
          console.log(error);
          throw error;
      } finally {
          db.$disconnect();
      }
  },
      
  async  newTienda(sfid: string): Promise<tiendas> {
    try{
        return await db.tiendas.create({
            data: ({
                sfid: sfid
            })
        });
    } catch (error) {
        console.log(error);
        throw error;
    } finally{
        db.$disconnect();
    }
  },

  /*async asignarMueblesTienda(muebles[]: muebles[]): Promise<muebles> {
    try{
        return await db.tiendas.create({data: tienda});
    } catch (error) {
        console.log(error);
        throw error;
    } finally{
        db.$disconnect();
    }
  }*/
}