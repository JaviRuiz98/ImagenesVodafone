import { prompts } from "@prisma/client";
import db  from "../config/database";

export const promptService = {

    async getAll(): Promise<prompts[]> {
        try{
            return await db.prompts.findMany(
                {
                    orderBy: {
                        id: 'desc'
                    }
                }
            );
        }
        catch (error) {
            console.error('No se pudo obtener los prompts:', error);
            throw error;
        } finally  {
            await db.$disconnect();
        }
    },

    async getById(id_prompt: number): Promise<prompts | null> {
        try{
            return db.prompts.findUnique({
                where: {
                    id: id_prompt
                }
            })
        }
        catch (error) {
            console.error('No se pudo obtener el prompt:', error);
            return null;
        } finally  {
            await db.$disconnect();
        }
        
    },
    async estadisticasPrompts(id_prompt: number) {
        return db.procesados_imagenes.findMany({
            select: {
                feedback_humano:true,
            },
            where: {
                prompts:{
                    id: id_prompt
                }
            }
        })
    }
}