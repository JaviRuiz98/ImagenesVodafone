import { prompts } from "@prisma/client";
import db  from "../config/database";

export const promptService = {

    async getAll(): Promise<prompts[]> {
        try{
            return await db.prompts.findMany(
                {
                    orderBy: {
                        id_prompt: 'desc'
                    },
                    include:{ }
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
                    id_prompt: id_prompt
                }
            })
        }
        catch (error) {
            console.error('No se pudo obtener el prompt:', error);
            return null;
        } finally  {
            await db.$disconnect();
        }
        
    }
}