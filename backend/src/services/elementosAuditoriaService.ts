import db from "../config/database";
import { elementos,  muebles } from "@prisma/client";
import { per_ele_aud_extended } from "../interfaces/perEleAudExtended";

export const elementosAuditoriaService = {
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

    async getElementosAuditoriaConAuditoriasYUltimoProcesado(periodo_fechas?: [Date, Date]): Promise<per_ele_aud_extended[]>  {
        try {
            let whereClause = { };

            if(periodo_fechas && periodo_fechas.length == 2) {
                whereClause = {
                    auditorias: {
                        OR: [
                            {
                                OR: [ // en progreso
                                    {
                                        fecha: {
                                            lte: periodo_fechas[1]
                                        },
                                        fecha_fin: {
                                            gte: periodo_fechas[1]
                                        }
                                    },
                                    {
                                        fecha: {
                                            lte: periodo_fechas[1]
                                        },
                                        fecha_fin: null                                        
                                    }
                                ]
                            },
                            { //finalizadas y caducadas
                                fecha_fin: {
                                    gte: periodo_fechas[0],
                                    lte: periodo_fechas[1]
                                }
                            }
                        ]
                    }
                }
            }

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

    getUltimosProcesadosElementoAuditoriaNotEnProgreso(periodo_fechas: Date[]) {
        try {
            let whereClause = {
                auditorias: {
                    id_estado: {
                        not: 1
                    },
                    fecha_fin: {
                        
                    }
                },
            }

            if (periodo_fechas) {
                whereClause = {
                    auditorias: {
                        id_estado: {
                            not: 1,
                        },
                        fecha_fin: {
                            gte: periodo_fechas[0],
                            lte: periodo_fechas[1]
                        }
                    }
                }
            }
            
            return db.pertenencia_elementos_auditoria.findMany({
                where:  whereClause,
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