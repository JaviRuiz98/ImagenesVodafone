import {  tiendas, posiciones_muebles_tienda } from "@prisma/client";
import db  from "../config/database";

export const tiendaService = {
    
    async getAllById(idTienda?: number): Promise<tiendas[]> {
        try{
            const whereClause =  idTienda? {id:idTienda} : {};
            const tiendas = await db.tiendas.findMany(
                {
                    orderBy: {
                        id: 'asc'
                    },
                    where : whereClause,
                    include:{
                        pertenencia_mueble_tienda:{
                            include:{
                                muebles:{
                                    select:{
                                        id: true,
                                        
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
                                    id: true,
                                    
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
      
  async newTienda(sfid: string): Promise<tiendas> {
    try{
        return await db.tiendas.create({
            data: ({
                sfid: sfid,
                activo: true
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
    },
    async deleteMueblesTienda(id_tienda: number): Promise<any> {
        try {
            await db.pertenencia_mueble_tienda.deleteMany({
                where: {
                    id_tienda: id_tienda,
                },
            });
            return true;
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            await db.$disconnect();
        }
    },

    async activarDesactivarTienda(tienda: tiendas): Promise<any> {
        try {
            return await db.tiendas.update({
                where: {
                    id: tienda.id,
                },
                data: {
                    activo: !tienda.activo
                }
            })
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            await db.$disconnect();
        }
    },

    async guardarPosicionMueble(id_pertenencia_mueble_tienda: number, datos_posicion_mueble: posiciones_muebles_tienda): Promise<any> {
        try {
            await db.posiciones_muebles_tienda.create({ 
                data: {
                    id_pertenencia_mueble_tienda: id_pertenencia_mueble_tienda,
                    x_start: datos_posicion_mueble.x_start,
                    y_start: datos_posicion_mueble.y_start,
                    ancho: datos_posicion_mueble.ancho,
                    alto: datos_posicion_mueble.alto,
                    angulo: datos_posicion_mueble.angulo
                }
            })
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            await db.$disconnect();
        }
    }
}