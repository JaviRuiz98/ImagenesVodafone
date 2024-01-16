import { expositorio, imagenes } from "@prisma/client";
import db  from "../config/database";

export const expositorioService = {

    async getById(id_expositorio: number): Promise<expositorio | null> {
        return db.expositorio.findUnique({
            where: {
                id_expositorio: id_expositorio
            }
        })
    },

    async getImages(id_expositorio: number): Promise<imagenes[]> {
        
        return db.imagenes.findMany(
            {
                where: {
                    id_expositorio: id_expositorio
                }
            }
        )
    },
    

    
}