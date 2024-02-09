import {   tiendas } from "@prisma/client";
import db  from "../config/database";
//import { InternalServerError } from "openai";

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

  async asignarPertenenciaMuebleTienda(id_tienda: number, listaIdMuebles: number[]): Promise<any[]> {
        let resultados = [];
        try {
            for (let i = 0; i < listaIdMuebles.length; i++) {
                const insertarMuebles = await db.pertenencia_mueble_tienda.create({
                    data: {
                        id_mueble: listaIdMuebles[i],
                        id_tienda: id_tienda,
                    },
                });
                resultados.push(insertarMuebles);
            }
            return resultados;
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            await db.$disconnect();
        }
    }


}