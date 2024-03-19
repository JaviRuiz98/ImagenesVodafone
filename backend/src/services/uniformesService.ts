
import { producto, carrito, imagenes, caracteristicas_productos } from "@prisma/client";

import db from "../config/database";



export const uniformesService = {

    async getProductos(): Promise<producto[]> {
        try {
            const productos = await db.producto.findMany();
            return productos;
        } catch (error) {
            throw error;
        } finally {
            await db.$disconnect();
        }
    },

    async  getImage(id_imagen: number): Promise<imagenes> {
        try {
          const image = await db.imagenes.findUnique({
            where: {
              id: id_imagen
            }
          });
      
          if (!image) {
            throw new Error(`No se encontró ninguna imagen con ID ${id_imagen}`);
          }
      
        //   image.url = `${getDestination('imagenesReferencia')}/${image.url}`;
          return image;
        } catch (error) {
          console.log("Error:", error);
          throw error;
        } finally {
          await db.$disconnect();
        }
      },
      

    async getCaracteristicas(): Promise<caracteristicas_productos[]> {
        try {
            return await db.caracteristicas_productos.findMany();
        } catch (error) {
            throw error;
        } finally {
            await db.$disconnect();
        }
    },


    async getCarrito(): Promise<carrito[]> {   /// 
        try {
            return await db.carrito.findMany();
        } catch (error) {
            throw error;
        } finally {
            await db.$disconnect();
        }
    },

    async postNuevoProducto(producto: producto): Promise<producto> {
        
        try {
            return await db.producto.create({
                 data: { 
                    id_imagen: producto.id_imagen,
                    descripcion: producto.descripcion,
                    genero: producto.genero,
                    nombre: producto.nombre,
                    precio: producto.precio,
                 } 
                });
        }catch (error) {
            throw error;
        }finally {
            await db.$disconnect();
        }
    },

    async postCaracteristicaProducto(caracteristica: caracteristicas_productos): Promise<any> {
        try {
            return await db.caracteristicas_productos.create({ 
                data: caracteristica 
            });
        }catch (error) {
            throw error;
        }finally {
            await db.$disconnect();
        }
    }

}

