import { tiendas } from "@prisma/client";
import db  from "../config/database";

export const tiendaService = {

    async getAll(): Promise<tiendas[]> {
        return db.tiendas.findMany(
            {
                orderBy: {
                    id_tienda: 'asc'
                },
                include:{
                    mueble:{
                        include:{
                            expositorio: {
                                include: {
                                    imagenes: true,
                                    dispositivos: true,
                                    procesados_imagenes: true
                                }
                            }
                        }
                    }
                   
                }
            }, 
        );
    },

    
}