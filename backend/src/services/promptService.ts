import { prompts } from "@prisma/client";
import db  from "../config/database";

export const promptService = {

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