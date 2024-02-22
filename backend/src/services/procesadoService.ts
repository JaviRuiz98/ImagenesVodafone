import { procesados_imagenes } from "@prisma/client";
import db  from "../config/database";


//tipo_procesado
export const procesadoService = {
    async create (
        id_elemento_auditoria: number, 
        id_imagen: number,
        id_auditoria: number,
        id_categoria: number,
        comentarios: string,
        valido: boolean,
        IA_utilizada: string,
        id_prompt_usado: number,
        id_probabilidad_cartel?: number,
        dispositivos_contados?: number,
        huecos_esperados?: number
        ) {
        try {
            const procesado = await db.procesados_imagenes.create({
                data: {                
                    id_elementos_auditoria: id_elemento_auditoria,
                    id_imagen: id_imagen,                
                    id_auditoria: id_auditoria,
                    id_categoria: id_categoria,
                    comentarios: comentarios,
                    valido: valido,
                    IA_utilizada: IA_utilizada,
                    id_prompt: id_prompt_usado,
                    id_probabilidad_cartel: id_probabilidad_cartel,
                    dispositivos_contados: dispositivos_contados,
                    huecos_esperados: huecos_esperados,
                }
            });
            
            return procesado.id;
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            db.$disconnect();
        }       
        
  
    }, 

    getById(id_procesado_imagen: number): Promise<procesados_imagenes | null> {
        return db.procesados_imagenes.findUnique({
            where: {
                id: id_procesado_imagen
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
                id: id_procesado_imagen
            }
        })
    },

    async feedbackProcesado(id_procesado_imagen: number, feedback_Humano: boolean | null) {
        return await db.procesados_imagenes.update({
            where: {
                id: id_procesado_imagen
            },
            data: {
                feedback_humano: feedback_Humano
            }
        });
    },

    async getProcesadosByIdExpositor(id_elementos_auditoria: number) {
        return await db.procesados_imagenes.findMany({
            where: {
                id_elementos_auditoria: id_elementos_auditoria
            }
        })
    },

    async getProcesadosByIdAuditoria(id_auditoria: number) {
        return await db.procesados_imagenes.findMany({
            where: {
                id_auditoria: id_auditoria
            }
        })
    },

    async getIdExpositorAuditoria(id_elemento: number,  id_auditoria: number): Promise<number | undefined> {
        const pea = await db.pertenencia_elementos_auditoria.findMany({
            where: {
                id_elemento: id_elemento,
                id_auditoria: id_auditoria,
                
            }
        })

        return pea[0]?.id;
    },

    async getIdProbabilidadCartelDadaProbabilidad(probabilidad_detectada: string) : Promise<number | undefined> {
        const probabilidad_object: any = await db.probabilidades_respuesta_carteles.findUnique({
            where: {
                probabilidad: probabilidad_detectada
            }
        })

        return probabilidad_object.id;
    }
}