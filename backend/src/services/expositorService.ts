import { expositores, imagenes, muebles } from "@prisma/client";
import db  from "../config/database";
import { getDestination } from "../config/multer";

export const expositoresService = {

    async getById(id_expositor: number): Promise<expositores | null> {
        try{
            return db.expositores.findUnique({
                where: {
                    id_expositor: id_expositor
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
      
          image.url = `${getDestination('imagenesReferencia')}/${image.url}`;
          return image;
        } catch (error) {
          console.log("Error:", error);
          throw error;
        } finally {
          await db.$disconnect();
        }
      },
      

      async  getMueble(idExpositor: number): Promise<muebles | null> {
        try {
          const mueble = await db.muebles.findFirst({
            where: {
             pertenencia_expositor_mueble: {
               some: {
                 id_expositor: idExpositor,
                 
               },
               
             }
            },
        
          });
          return mueble
    
        } catch (error) {
         
          throw error;
        } finally {
          await db.$disconnect();
        }
      }*/
      



    
}