import db  from "../config/database";
import { auditorias, elementos } from '@prisma/client';
import { ExpositorFrontInterfaz } from "../interfaces/muebleFrontendInterfaces";
import { mobiliarioService } from "./mobiliarioService";

export const auditoriaService = {

    async getAllAuditorias(): Promise<auditorias[]| null> {
        try{
            return db.auditorias.findMany({
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

    async getAuditorias(id_tienda: number): Promise<auditorias[]| null> {
        try{
            return db.auditorias.findMany({
                where: {
                    id_tienda: id_tienda,
                }, include: {
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

    async createPertenenciaExpositorAuditoria(id_auditoria: number, expositor: ExpositorFrontInterfaz, elemento: elementos) {
        await db.pertenencia_elementos_auditoria.create({
            data: {
                id_auditoria: id_auditoria,
                id_expositor: expositor.id,
                id_elemento: elemento.id
            }
        });
    },

    async createAuditoria(id_tienda: number): Promise<auditorias> {
        try{
            // Miro si la ultima auditoria esta todavia en progreso y la marco como caducada
            const lastAuditoria = await db.auditorias.findFirst({
                where: {
                    id_tienda: id_tienda
                },
                orderBy: {
                    id: 'desc'
                }
            })

            if(lastAuditoria?.id_estado == 1) {
                await db.auditorias.update({
                    where: {
                        id: lastAuditoria.id
                    },
                    data: {
                        id_estado: 3
                    }
                })
                
            }

            // Creo la auditoria
            const auditoria = await db.auditorias.create({
                data: {
                    id_tienda: id_tienda,
                    id_estado: 1
                }
            })

            // Almaceno todos los expositores que posee la auditoria en la tabla de auditoria_expositores
            const expositores: any[] = await mobiliarioService.getExpositoresAndElementosByIdTienda(id_tienda);
            const promises = [];

            for (const expositor of expositores) {
                for (const atributos_expositores of expositor.atributos_expositores) {
                    for (const elemento of atributos_expositores.pertenencia_elementos_atributos) {
                        
                        promises.push(auditoriaService.createPertenenciaExpositorAuditoria(auditoria.id, expositor, elemento));
                    }
                }
            }
            /*
            const expositores: ({
                id: number;
                atributos_expositores: ({
                    pertenencia_elementos_atributos: ({
                        elementos: {
                            id: number;
                        };
                    } & {
                        id: number;
                        id_atributos_mueble: number;
                        id_elementos: number;
                        fecha: Date;
                    })[];
                } 
                */

            await Promise.all(promises);

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
                    id_estado: 2
                }
            })
        } catch (error) {
            console.error('No se pudo terminar la auditoria:', error);
            throw error;
        }  finally {
            db.$disconnect();
        }
    },

    async getBarraProgresoAuditoria(id_auditoria: number): Promise<any> {
        try {
            return db.pertenencia_elementos_auditoria.findMany({
                where: {
                    id: id_auditoria
                },
                include: {
                    procesados_imagenes: {
                        take: 1,
                        orderBy: {
                            fecha: 'desc'
                        }
                    }, 
                    elementos: true
                }
            })
        } catch (error) {
            console.error('No se pudo obtener la barra de progreso:', error);
            throw error;
        } finally {
            db.$disconnect();
        }
    },

    getNumExpositoresByAuditoria(id_auditoria: number) {
        try {
            return db.pertenencia_elementos_auditoria.count({
                where: {
                    id: id_auditoria
                }
            })
        } catch (error) {
            console.error('No se pudo obtener el numero de expositores:', error);
            throw error;
        } finally {
            db.$disconnect();
        }
    },
    
    getNumExpositoresProcesadosByAuditoria(id_auditoria: number) {
        try {
            return db.pertenencia_elementos_auditoria.count({
                where: {
                    id: id_auditoria,
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
    }
}