import { procesados_imagenes } from "@prisma/client";
import db  from "../config/database";


//tipo_procesado
export const procesadoService = {
    async create (id_imagen: number, id_expositor: number, categoria: string, comentarios: string, valido: boolean, IA_utilizada: string, id_prompt_usado: number, probabilidad_cartel?: string, dispositivos_contados?: number, huecos_esperados?: number) {

       
        const procesado = await db.procesados_imagenes.create({
            data: {                
                id_imagen: id_imagen,
                id_expositor: id_expositor,
                categoria: categoria,
                comentarios: comentarios,
                valido: valido,
                IA_utilizada: IA_utilizada,
                id_prompt_usado: id_prompt_usado,
                probabilidad_cartel: probabilidad_cartel,
                dispositivos_contados: dispositivos_contados,
                huecos_esperados: huecos_esperados,
            }
        });
        
        return procesado.id_procesado_imagen
  
    }, 

    getById(id_procesado_imagen: number): Promise<procesados_imagenes | null> {
        return db.procesados_imagenes.findUnique({
            where: {
                id_procesado_imagen: id_procesado_imagen
            },
            include: {
                imagenes: true,
                prompts: true
            }
        })
    },

    borrarProcesado(id_procesado_imagen: number) {
        return db.procesados_imagenes.delete({
            where: {
                id_procesado_imagen: id_procesado_imagen
            }
        })
    },

    async feedbackProcesado(id_procesado_imagen: number, feedback_Humano: boolean | null) {
        
        return await db.procesados_imagenes.update({
            where: {
                id_procesado_imagen: id_procesado_imagen
            },
            data: {
                feedback_humano: feedback_Humano
            }
        });
    },

    async getProcesadosByIdExpositor(id_expositor: number) {
        return await db.procesados_imagenes.findMany({
            where: {
                id_expositor: id_expositor
            }
        })
    },

    async getProcesadosByIdAuditoria(id_auditoria: number) {
        return await db.procesados_imagenes.findMany({
            where: {
                id_auditoria: id_auditoria
            }
        })
    }



}