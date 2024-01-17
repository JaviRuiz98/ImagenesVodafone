import { expositorios, imagenes } from "@prisma/client";
import db  from "../config/database";
import { getDestination } from "../config/multer";

export const expositorioService = {

    async getById(id_expositorio: number): Promise<expositorios | null> {
        try{
            return db.expositorios.findUnique({
                where: {
                    id_expositorio: id_expositorio
                }
            })
        }
        catch (error) {
            console.error('No se pudo obtener el expositorio:', error);
            return null;
        } finally  {
            await db.$disconnect();
        }
        
    },

    //repasar
    async  getImage(id_image: number): Promise<imagenes> {
        try {
          const image = await db.imagenes.findUnique({
            where: {
              id_imagen: id_image
            }
          });
      
          if (!image) {
            throw new Error(`No se encontró ninguna imagen con ID ${id_image}`);
          }
      
          image.url = `${getDestination('imagen_referencia')}/${image.url}`;
          return image;
        } catch (error) {
          console.log("Error:", error);
          throw error;
        } finally {
          await db.$disconnect();
        }
      }



    
}