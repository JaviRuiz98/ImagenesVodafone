import {  tiendas } from "@prisma/client";
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
      
  async newTienda(parametros: tiendas): Promise<tiendas> {
    try{
        return await db.tiendas.create({
            data: ({
                cif: parametros.cif,
                razon_social: parametros.razon_social,
                tipo_distribuidor: parametros.tipo_distribuidor,
                sfid: parametros.sfid,
                nombre: parametros.nombre,
                activo: parametros.activo,
                visible: parametros.visible,
                lowi: parametros.lowi,
                vodafone: parametros.vodafone,
                canal: parametros.canal,
                tipo_pdv: parametros.tipo_pdv,
                zona_geografica: parametros.zona_geografica,
                provincia: parametros.provincia,
                poblacion: parametros.poblacion,
                cp: parametros.cp
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
    }
}