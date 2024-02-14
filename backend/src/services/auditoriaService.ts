import db  from "../config/database";
import { auditorias, expositores } from '@prisma/client';
import { MuebleFrontInterfaz } from "../interfaces/muebleFrontendInterfaces";
import { mobiliarioService } from "./mobiliarioService";

export const auditoriaService = {

    async getAllAuditorias(): Promise<auditorias[]| null> {
        try{
            return db.auditorias.findMany({
                include: {
                    estados_auditoria: true,
                    tiendas: true
                }, orderBy: {
                    id_auditoria: 'desc'
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
                    id_auditoria: 'desc'
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
                    id_auditoria: id_auditoria
                }
            })
        } catch (error) {
            console.error('No se pudo obtener el auditoria:', error);
            throw error;
        } finally  {
            await db.$disconnect();
        }
    },

    async createPertenenciaExpositorAuditoria(id_auditoria: number, mueble: MuebleFrontInterfaz, expositor: expositores) {
        await db.pertenencia_expositor_auditoria.create({
            data: {
                id_auditoria: id_auditoria,
                id_mueble: mueble.id,
                id_expositor: expositor.id
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
                    id_auditoria: 'desc'
                }
            })

            if(lastAuditoria?.id_estado == 1) {
                await db.auditorias.update({
                    where: {
                        id_auditoria: lastAuditoria.id_auditoria
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
            const muebles: MuebleFrontInterfaz[] = await mobiliarioService.getMueblesAndExpositoresActivosByIdTienda(id_tienda);
            const promises = [];

            for (const mueble of muebles) {
                for (const expositor of mueble.expositores) {
                    promises.push(auditoriaService.createPertenenciaExpositorAuditoria(auditoria.id_auditoria, mueble, expositor));
                }
            }

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
                    id_auditoria: id_auditoria
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

    getNumExpositoresByAuditoria(id_auditoria: number) {
        try {
            return db.pertenencia_expositor_auditoria.count({
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
    
    getNumExpositoresProcesadosByAuditoria(id_auditoria: number) {
        try {
            return db.pertenencia_expositor_auditoria.count({
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
    }
}