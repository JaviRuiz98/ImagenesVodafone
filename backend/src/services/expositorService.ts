import { expositores,  muebles } from "@prisma/client";
import db  from "../config/database";
import { getDestination } from "../config/multer";
import { imagenes, pertenencia_expositor_auditoria, pertenencia_expositor_mueble, regiones } from "@prisma/client";


export const expositoresService = {

    async getById(id_expositor: number): Promise<expositores | null> {
        try{
            return db.expositores.findUnique({
                where: {
                  id: id_expositor
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

// repasar
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
      },

      //falta tipar
     async createExpositor(expositor: any): Promise<expositores> {
       try {
         return await db.expositores.create({ data: expositor });
       } catch (error) {
         throw error;
       } finally {
         await db.$disconnect();
       }
     }, 
     async updateExpositor(id_expositor: number, expositor: any): Promise<expositores | null> {
       try {
         return await db.expositores.update({ where: { id: id_expositor }, data: expositor });
        
       } catch (error) {
         throw error;
       } finally {
         await db.$disconnect();
       }
     },

     async getExpositores(categoria?: string): Promise<expositores[]> {
        try {
          const whereClause = categoria!= null? { categoria: categoria } : {};
          return await db.expositores.findMany({
            where:whereClause,
            include: {
              regiones: true,
              imagenes: true
            }
          });
        } catch (error) {
          throw error;
        }
      },

      async deleteExpositor(id_expositor: number): Promise<expositores | null> {
        try {
          return await db.expositores.delete({ where: { id: id_expositor } });
        }catch (error) {
          throw error;
        }
      },

      async guardarExpositor(nombre: string, activo: boolean, id_imagen: number, region: number, categoria: string, n_dispositivos?: number): Promise<expositores> {
        try {
          return await db.expositores.create({ data: { nombre: nombre, activo: activo, id_imagen: id_imagen, id_region: region, categoria: categoria, numero_dispositivos: n_dispositivos } });
          
        }catch (error) {
          console.log(error)
          throw error;
        }
      },

      //ide auditoria -> objeto pertenencia_expositor_auditoria

      async peaByIdAuditoria(id_expositor_auditoria: number): Promise<pertenencia_expositor_auditoria | null>{
        try{
          return await db.pertenencia_expositor_auditoria.findUnique({
          where: {
            id_expositor_auditoria: id_expositor_auditoria
          }
          });

        }catch(error){
          console.log(error)
          throw error;
        }
      },

      async editarEstadoExpositor(idExpositor: number, valActivo: boolean){
        try{
          return await db.expositores.update({
            where: {id: idExpositor },
            data: { activo: valActivo },
          });
        }catch(error){
          console.error(`Error al intentar actualizar el estado del expositor ${idExpositor}:`, error);
          throw error;
        }

      },
      async getRegiones(): Promise<regiones[]>{
        try{
          return await db.regiones.findMany();
        }catch(error){
          console.error(`Error al intentar obtener las regiones:`, error);
          throw error;
        }
      },
      async getExpositoresByIdMueble(id_mueble: number): Promise<pertenencia_expositor_mueble[] | undefined> {
        
        try {
          return await db.pertenencia_expositor_mueble.findMany({
            where: {
              id_mueble: id_mueble
            },
            include: {
              expositores: {
                include:{
                  imagenes: true
                } 
              }
            }
          })
        }catch(error){
          console.log(error)
          throw error
        }
      }

}




      