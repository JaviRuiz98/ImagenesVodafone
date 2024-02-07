import db  from "../config/database";
import { auditorias } from '@prisma/client';
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

            for (const mueble of muebles) {
                for (const expositores of mueble.expositores) {
                    await db.pertenencia_expositor_auditoria.create({
                        data: {
                            id_auditoria: auditoria.id_auditoria,
                            id_mueble: mueble.id_mueble,
                            id_expositor: expositores.id_expositor
                        }
                    })
                }
            }
            console.log('muebles añadidos')

            return auditoria;
        }catch (error) {
            console.error('No se pudo crear el auditoria:', error);
            throw error;
        }finally  {
            await db.$disconnect();
        }
    }
}