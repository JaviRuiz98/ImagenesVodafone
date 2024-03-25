import { elementos,  muebles } from "@prisma/client";
import db  from "../config/database";
import { getFtpDestination } from "../config/ftpDownload";
import { imagenes, regiones, pertenencia_elementos_auditoria, categorias_elementos } from "@prisma/client";


export const elementosService = {

    async getById(id_elemento: number): Promise<elementos | null> {
        try{
            return db.elementos.findUnique({
                where: {
                  id: id_elemento
                },
                include: {
                  imagenes: true,
                  categorias_elementos: true,

                }
            })
        }
        catch (error) {
            console.error('No se pudo obtener el elementoio:', error);
            return null;
        } finally  {
            await db.$disconnect();
        }
        
    },

    getAllActivos(): Promise<elementos[]> {
        return db.elementos.findMany({
            where: {
                activo: true
            }
        })
    },

// repasar
    async  getImage(id_imagen: number): Promise<imagenes> {
        try {
          const image = await db.imagenes.findUnique({
            where: {
              id: id_imagen
            }
          });
      
          if (!image) {
            throw new Error(`No se encontró ninguna imagen con ID ${id_imagen}`);
          }
      
          image.url = `${getFtpDestination('imagenesReferencia')}/${image.url}`;
          return image;
        } catch (error) {
          console.log("Error:", error);
          throw error;
        } finally {
          await db.$disconnect();
        }
      },
      

      async  getMuebleById(id_elemento: number): Promise<muebles | null> {
        try {
         
          throw new Error(`Método no implelemntado  ${id_elemento}`);
    
        } catch (error) {
         
          throw error;
        } finally {
          await db.$disconnect();
        }
      },

      //falta tipar
     async create(elemento: any): Promise<elementos> {
       try {
         return await db.elementos.create({ data: elemento });
       } catch (error) {
         throw error;
       } finally {
         await db.$disconnect();
       }
     }, 
     async update(id_elemento: number, elemento: any): Promise<elementos | null> {
       try {
         return await db.elementos.update({ where: { id: id_elemento }, data: elemento });
        
       } catch (error) {
         throw error;
       } finally {
         await db.$disconnect();
       }
     },

     async getAll(categoria?: number): Promise<elementos[]> {
        try {
          const whereClause = categoria!= null? { id_categoria: categoria } : {};
          return await db.elementos.findMany({
            where:whereClause,
            include: {
              imagenes: true,
              categorias_elementos: true
            }
          });
        } catch (error) {
          throw error;
        }
      },

      async deleteElemento(id_elemento: number): Promise<elementos | null> {
        try {
          return await db.elementos.delete({ where: { id: id_elemento } });
        }catch (error) {
          throw error;
        }
      },

      async guardarElemento(nombre: string, activo: boolean, id_imagen: number,  categoria: number): Promise<elementos> {
        try {
          return await db.elementos.create({ data: { nombre: nombre, activo: activo, id_imagen: id_imagen,  id_categoria: categoria } });
          
        }catch (error) {
          console.log(error)
          throw error;
        }
      },

      //ide auditoria -> objeto pertenencia_elemento_auditoria

      async peaByIdAuditoria(id_elemento_auditoria: number): Promise<pertenencia_elementos_auditoria | null>{
        try{
          return await db.pertenencia_elementos_auditoria.findUnique({
          where: {
            id: id_elemento_auditoria
          }
          });

        }catch(error){
          console.log(error)
          throw error;
        }
      },

      async editarEstadoelemento(idelemento: number, valActivo: boolean){
        try{
          return await db.elementos.update({
            where: {id: idelemento },
            data: { activo: valActivo },
          });
        }catch(error){
          console.error(`Error al intentar actualizar el estado del elemento ${idelemento}:`, error);
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
      async getCategorias(): Promise<categorias_elementos[]>{
        try{
          return await db.categorias_elementos.findMany();
        }catch(error){
          console.error(`Error al intentar obtener las categorias:`, error);
          throw error;
        }
      }, 

    
     

}




      