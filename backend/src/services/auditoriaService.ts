import db  from "../config/database";
import { auditorias } from '@prisma/client';

export const auditoriaService = {

    async getAuditorias(id_tienda?: number): Promise<auditorias[]| null> {
        try{
            const whereClause = id_tienda != 0? { id_tienda: id_tienda } : { };
            return db.auditorias.findMany({
                where: whereClause, 
                include: {
                    estados_auditoria: true,
                    tiendas: true
                }, orderBy: {
                    id: 'desc'
                }
            })

        }catch (error) {
            console.error('No se pudo obtener el auditoria:', error);
            throw error;
        }finally  {
            await db.$disconnect();
        }
    },

    async getAuditoriaById(id_auditoria: number): Promise<auditorias | null> {
        try{
            return db.auditorias.findUnique({
                where: {
                    id: id_auditoria
                }, include: {
                    estados_auditoria: true,
                    tiendas: true
                }
            })
        } catch (error) {
            console.error('No se pudo obtener el auditoria:', error);
            throw error;
        } finally  {
            await db.$disconnect();
        }
    },

    async getSoloAllAuditoriasInPeriodo(): Promise<auditorias[]| null> {
        try{
            return db.auditorias.findMany({
            })
        } catch (error) {
            console.error('No se pudo obtener el auditoria:', error);
            throw error;
        } finally  {
            await db.$disconnect();
        }
    },

    async getAuditoriaAndTienda(id_auditoria: number): Promise<auditorias | null> {
        try {
            return db.auditorias.findUnique({
                where: {
                    id: id_auditoria
                }, include: {
                    tiendas: true
                }
            })
        } catch (error) {
            console.error('No se pudo obtener el auditoria:', error);
            throw error;
        } finally {
            await db.$disconnect();
        }
    },

    async getLastAuditoriaByTienda(id_tienda: number): Promise<auditorias | null> {
        try {
            return db.auditorias.findFirst({
                where: {
                    id_tienda: id_tienda
                },
                orderBy: {
                    id: 'desc'
                }
            })
        } catch (error) {
            console.error('No se pudo obtener el auditoria:', error);
            throw error;
        } finally {
            await db.$disconnect();
        }
    },

    async marcarAuditoriaComoCaducada(id_auditoria: number) {
        await db.auditorias.update({
            where: {
                id: id_auditoria
            },
            data: {
                id_estado: 3,
                fecha_fin: new Date()
            }
        })
    },

    async createAuditoria(id_tienda: number): Promise<auditorias> {
        try{
            const auditoria = await db.auditorias.create({
                data: {
                    id_tienda: id_tienda,
                    id_estado: 1
                }
            });

            return auditoria;
        }catch (error) {
            console.error('No se pudo crear el auditoria:', error);
            throw error;
        }finally  {
            await db.$disconnect();
        }
    },

    async terminarAuditoria(id_auditoria: number) {
        try {
            return db.auditorias.update({
                where: {
                    id: id_auditoria
                },
                data: {
                    id_estado: 2,
                    fecha_fin: new Date()
                }
            })
        } catch (error) {
            console.error('No se pudo terminar la auditoria:', error);
            throw error;
        }  finally {
            db.$disconnect();
        }
    },

    async getAllEstadosParaAuditorias(id_estados_excluidos: number[]) {
        try {
            return db.estados_auditoria.findMany(
                {
                    where: {
                        id: {
                            notIn: id_estados_excluidos
                        }
                    },
                    include: {
                        auditorias: true
                    }
                }
            )
        } catch (error) {
            console.error('No se pudo obtener los estados para la auditoria:', error);
            throw error;
        } finally {
            db.$disconnect();
        }
    }
}