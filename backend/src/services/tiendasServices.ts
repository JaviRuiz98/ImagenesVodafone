/*import {  tiendas } from "@prisma/client";
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
                        mobiliario:{
                           select:{
                               id_mobiliario: true,
                               fecha: true
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
                mobiliario: {
                   select:{
                       id_mobiliario: true,
                       fecha: true
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
      
}*/