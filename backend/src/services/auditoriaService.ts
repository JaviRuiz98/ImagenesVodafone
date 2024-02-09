import db  from "../config/database";
import { auditorias, expositores } from '@prisma/client';
import { MuebleFrontInterfaz } from "../interfaces/muebleFrontendInterfaces";
import { mobiliarioService } from "./mobiliarioService";

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
                id_mueble: mueble.id_mueble,
                id_expositor: expositor.id_expositor
            }
        });
    },

    async createAuditoria(id_tienda: number): Promise<auditorias> {
        try{
            // Creo la auditoria
            const auditoria = await db.auditorias.create({
                data: {
                    id_tienda: id_tienda,
                    estado: 'en progreso'
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
    }
}