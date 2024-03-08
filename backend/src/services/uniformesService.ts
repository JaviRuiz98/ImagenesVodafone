
import { producto, carrito, opciones_caracteristicas } from "@prisma/client";
import db from "../config/database";



export const uniformesService = {

    async getProductos(): Promise<producto[]> {
        try {
            return await db.producto.findMany();
        } catch (error) {
            throw error;
        } finally {
            await db.$disconnect();
        }
    },

    async getCaracteristicas(): Promise<opciones_caracteristicas[]> {
        try {
            return await db.opciones_caracteristicas.findMany();
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

}

