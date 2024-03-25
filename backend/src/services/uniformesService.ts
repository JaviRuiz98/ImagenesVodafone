
import { producto, pedidos, carrito, imagenes, caracteristicas_productos } from "@prisma/client";
import { productoExtended } from "../interfaces/producto";
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

    async getPedidos(): Promise<pedidos[]> {
        try {
            const pedidos = await db.pedidos.findMany();
            return pedidos;
        }catch (error) {
            throw error;
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

    async postCaracteristicaProducto(caracteristica: any): Promise<any> {
        try {
            return await db.caracteristicas_productos.create({ 
                data: caracteristica 
            });
        }catch (error) {
            throw error;
        }finally {
            await db.$disconnect();
        }
    },

    async crearPedido(id_tienda: number): Promise<any> {
        try {
            const fecha_creacion = new Date();
            return await db.pedidos.create({
                data: {
                    id_tienda: id_tienda,
                    fecha: fecha_creacion,
                }
            }) 
        }catch (error) {
            throw error;
        }
    },

    async asignarCarrito(productos_carrito: productoExtended[], id_pedido: number): Promise<any> {
        try {

            const carritoItems = productos_carrito.map(producto => ({
                id_pedido: id_pedido,
                id_caracteristicas_producto: producto.caracteristica_seleccionada.id, // Corregido el nombre de la propiedad
                cantidad: producto.cantidad
            }))


            return await db.carrito.createMany({
                data: carritoItems,
            });
        } catch (error) {
            throw error;
        }
    }

}

