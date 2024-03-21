import {  tiendas, posiciones_muebles_tienda, imagenes } from "@prisma/client";
import db  from "../config/database";
import { tiendasConPlano } from "../interfaces/tiendasConPlano";

function addPlanoToTienda( tiendas: any ) : tiendasConPlano[] {
    const tiendaConPlano = tiendas.map((tienda:any) => {
        return {
            ...tienda,
            imagen_plano: tienda.imagenes ? tienda.imagenes : undefined,
        };
    });

    return tiendaConPlano;
}
export const tiendaService = {
    
    async getAllById(idTienda?: number): Promise<tiendasConPlano[]> {
        try{
            const whereClause =  idTienda? {id:idTienda} : {};
            const tiendas = await db.tiendas.findMany(
                {
                    orderBy: {
                        id: 'asc'
                    },
                    where : whereClause,
                    include:{
                        imagenes: true,
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

            const tiendasConPlano: tiendasConPlano[] =  addPlanoToTienda(tiendas);
            
            return tiendasConPlano;
        }  catch(error){
            console.log(error);
            throw error;
        }finally{
            db.$disconnect();
        }
    },



    async getBySfid(sfid: string): Promise<tiendasConPlano | null> {
        try {       
            const tienda =  await db.tiendas.findUnique({
                where: {
                    sfid: sfid
                },
                include: {
                    
                    imagenes: true,
                   
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
            const tiendasConPlano: tiendasConPlano[] =  addPlanoToTienda([tienda]);
            
            return tiendasConPlano[0];
      } catch (error) {
          console.log(error);
          throw error;
      } finally {
          db.$disconnect();
      }
  },
      
  async newTienda(parametros: tiendas, imagen?: imagenes): Promise<tiendas> {
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
                cp: parametros.cp, 
                id_imagen_plano: imagen?.id,
            })
        });
    } catch (error) {
        console.log(error);
        throw error;
    } finally{
        db.$disconnect();
    }
  }, 
   async updatePlanoTienda (id_tienda:number, imagen: imagenes){
       try{
           return await db.tiendas.update({
               where: {
                   id: id_tienda
               },
               data: ({
                   id_imagen_plano: imagen.id
               })
           });
       } catch (error) {
           console.log(error);
           throw error;
       } finally{
           db.$disconnect();
       }
   },
   async deletePlanoTienda (id_tienda:number){
       try{
           return await db.tiendas.update({
               where: {
                   id: id_tienda
               },
               data: ({
                   id_imagen_plano: null
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
        try {
            const resultados = [];
            for (let i = 0; i < listaIdMuebles.length; i++) {
                const id_mueble = listaIdMuebles[i];
                const upsertResult = await db.pertenencia_mueble_tienda.upsert({
                    where: {
                        id_mueble_id_tienda: {
                            id_mueble: id_mueble,
                            id_tienda: id_tienda,
                        },
                    },
                    create: {
                        id_mueble: id_mueble,
                        id_tienda: id_tienda,
                        activo: true,
                    },
                    update: {
                        activo: true,
                    },
                });
                resultados.push(upsertResult);
            }
            return resultados;
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            await db.$disconnect();
        }
    },
    async desactivarMueblesTienda(id_tienda: number): Promise<any> {
        try {
            await db.pertenencia_mueble_tienda.updateMany({
                where: {
                    id_tienda: id_tienda,
                },
                data: {
                    activo: false,
                },
            })
            return true;
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            await db.$disconnect();
        }
    },

    async desactivarUnaPertenenciaMuebleTienda (id_pertenencia: number): Promise<void> {
         try {
             await db.pertenencia_mueble_tienda.update({
                 where: {
                     id: id_pertenencia
                 },
                 data: {
                     activo: false
                 }
             })
         } catch (error) {
             console.log(error);
             throw error;
         } finally {
             await db.$disconnect();
         }
    },
    
    async activarDesactivarBooleanoTienda(tienda: tiendas, parametro: string): Promise<any> {
        try {
            let data_clause = {};
            switch (parametro) {
                case 'activo':
                    data_clause = { activo: !tienda.activo };
                    break;
                case 'visible':
                    data_clause = { visible: !tienda.visible };
                    break;
                case 'lowi':
                    data_clause = { lowi: !tienda.lowi };
                    break;
                case 'vodafone':
                    data_clause = { vodafone: !tienda.vodafone };
                    break;
            }
            return await db.tiendas.update({
                where: {
                    id: tienda.id,
                },
                data: data_clause
            })
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            await db.$disconnect();
        }
    },

    async guardarPosicionMueble(datos_posicion_mueble: posiciones_muebles_tienda): Promise<any> {
        try {
            await db.posiciones_muebles_tienda.create({ 
                data: {
                    id_pertenencia_mueble_tienda: datos_posicion_mueble.id_pertenencia_mueble_tienda,
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
    },

    async desactivarPosicionMueble(id_posicion_mueble: number): Promise<any> {
        try {
            await db.posiciones_muebles_tienda.update({
                where: {
                    id: id_posicion_mueble
                }, 
                data: {
                    activo: false
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