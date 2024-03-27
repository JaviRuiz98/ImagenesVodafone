import db  from "../config/database";
import { auditorias, elementos, muebles } from '@prisma/client';
import { per_ele_aud_extended } from "../interfaces/perEleAudExtended";

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

    async createPertenenciaElementosAuditoria(id_auditoria: number, mueble: muebles, id_expositor: number, elemento: elementos) {
        await db.pertenencia_elementos_auditoria.create({
            data: {
                id_auditoria: id_auditoria,
                id_mueble: mueble.id,
                id_expositor: id_expositor,
                id_elemento: elemento.id
            }
        });
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

    async getElementosAuditoriaConElementosYUltimoProcesado(id_auditoria?: number): Promise<per_ele_aud_extended[]> {
        try {
            const whereClause = id_auditoria != 0? { id_auditoria: id_auditoria } : { };
            return db.pertenencia_elementos_auditoria.findMany({
                where: whereClause,
                include: {
                    procesados_imagenes: {
                        take: 1,
                        orderBy: {
                            fecha: 'desc'
                        }
                    },
                    elementos: true
                },
                orderBy: {
                    id_mueble: 'asc'
                }
            })
        } catch (error) {
            console.error('No se pudo obtener la barra de progreso:', error);
            throw error;
        } finally {
            db.$disconnect();
        }
    },

    async getElementosAuditoriaConAuditoriasYUltimoProcesado(id_auditoria?: number): Promise<per_ele_aud_extended[]>  {
        try {
            const whereClause = id_auditoria != 0? { id_auditoria: id_auditoria } : { };
            return db.pertenencia_elementos_auditoria.findMany({
                where: whereClause,
                include: {
                    procesados_imagenes: {
                        take: 1,
                        orderBy: {
                            fecha: 'desc'
                        }
                    },
                    auditorias: true
                }
            })
        } catch (error) {
            console.error('No se pudo obtener la barra de progreso:', error);
            throw error;
        } finally {
            db.$disconnect();
        }
    },

    async getPertenenciasElementosAuditoria(id_auditoria: number) {
        try {
            return db.pertenencia_elementos_auditoria.findMany({
                where: {
                    id_auditoria: id_auditoria
                }, include: {
                    muebles: true,
                    elementos: {
                        include: {
                            imagenes: true
                        }
                    },
                    procesados_imagenes: {
                        include: {
                            imagenes: true,
                            prompts: true,
                            categorias_elementos: true,
                            probabilidades_respuesta_carteles: true
                            
                        },
                        orderBy: {
                            fecha: 'desc'
                        }
                    }, 
               
                },
                orderBy: {
                    id_mueble: 'asc'
                }
            })
        } catch (error) {
            console.error('No se pudo obtener la barra de progreso:', error);
            throw error;
        } finally {
            db.$disconnect();
        }
    },

    getNumExpositoresByAuditoria(id_auditoria: number): Promise<number> {
        try {
            return db.pertenencia_elementos_auditoria.count({
                where: {
                    id_auditoria: id_auditoria
                }
            })
        } catch (error) {
            console.error('No se pudo obtener el numero de expositores:', error);
            throw error;
        } finally {
            db.$disconnect();
        }
    },
    
    getNumExpositoresProcesadosByAuditoria(id_auditoria: number): Promise<number> {
        try {
            return db.pertenencia_elementos_auditoria.count({
                where: {
                    id_auditoria: id_auditoria,
                    procesados_imagenes: {
                        some: {  }
                    }
                }
            })
        } catch (error) {
            console.error('No se pudo obtener el numero de procesados por expositor:', error);
            throw error;
        } finally {
            db.$disconnect();
        }
    }, 

    getProcesadosByIdAuditoria(id_auditoria: number): Promise<any> {
        try {
            return db.pertenencia_elementos_auditoria.findMany({
                where: {
                    id_auditoria: id_auditoria
                }, include: {
                    procesados_imagenes: {
                        include: {
                            imagenes: true,
                            probabilidades_respuesta_carteles: true,
                            categorias_elementos: true
                        },
                        orderBy: {
                            fecha: 'desc'
                        }
                    }, elementos: {
                        include: {
                            imagenes: true
                        }
                    }

                }
            })
        } catch (error) {
            console.error('No se pudo obtener el numero de procesados por expositor:', error);
            throw error;
        } finally {
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
    },

    getUltimosProcesadosElementoAuditoriaNotEnProgreso() {
        try {
            return db.pertenencia_elementos_auditoria.findMany({
                where: {
                    auditorias: {
                        id_estado: {
                            not: 1
                        }
                    }
                },
                include: {
                    procesados_imagenes: {
                        orderBy: {
                            fecha: 'desc'
                        },
                        take: 1,
                    },
                    elementos: true
                }
            })
        } catch (error) {
            console.error('No se pudo obtener los ultimos procesados:', error);
            throw error;
        } finally {
            db.$disconnect();
        }
    }
}