import { auditoria } from "@prisma/client";
import db  from "../config/database";



export const auditoriaService = {

    async getAuditorias(id_tienda: number): Promise<auditoria[]> {

        try{
            return db.auditoria.findMany({
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



    }

}

