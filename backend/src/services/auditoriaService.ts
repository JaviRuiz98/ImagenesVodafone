import db  from "../config/database";
import { auditorias } from '@prisma/client';

export const auditoriaService = {

    async getAuditorias(id_tienda: number): Promise<auditorias[]| null> {
        try{
            return db.auditorias.findMany({
                where: {
                    id_tienda: id_tienda
                }
            })

        }catch (error) {
            console.error('No se pudo obtener el auditoria:', error);
            throw error;
        }finally  {
            await db.$disconnect();
        }
    },

    async createAuditoria(id_tienda: number): Promise<auditorias> {
        try{
            return await db.auditorias.create({
                data: {
                    id_tienda: id_tienda,
                    estado: 'en progreso'
                }
            })
        }catch (error) {
            console.error('No se pudo crear el auditoria:', error);
            throw error;
        }finally  {
            await db.$disconnect();
        }
    }
}