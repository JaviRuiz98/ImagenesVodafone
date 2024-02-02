import { procesados_imagenes } from "@prisma/client";
import db  from "../config/database";


//tipo_procesamiento
export const procesamientoService = {
    async create (id_imagen: number, id_expositor: number, comentarios: string, valido: boolean, IA_utilizada: string, id_prompt_usado: number, id_auditoria?: number) {

        const procesamiento = await db.procesados_imagenes.create({
            data: {                
                id_imagen: id_imagen,
                id_expositor: id_expositor,
                comentarios: comentarios,
                valido: valido,
                IA_utilizada: IA_utilizada,
                id_prompt_usado: id_prompt_usado,
                id_auditoria: id_auditoria? id_auditoria : null
            }
        });
        
        return procesamiento.id_procesado_imagen
    }, 

    getById(id_procesado_imagen: number): Promise<procesados_imagenes | null> {
        return db.procesados_imagenes.findUnique({
            where: {
                id_procesado_imagen: id_procesado_imagen
            },
            include: {
                imagenes: true,
                respuestas_carteles: true,
                respuestas_dispositivos: true,
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
    }
}

export const respuestaService = {
    async createRespuestaCartel (id_procesado_imagen: number, probabilidad: 'muy alta' | 'alta' | 'media' | 'baja' | 'muy baja' | 'ninguna' | 'error') {
        const respuesta_carteles = await db.respuestas_carteles.create({
            data: {                
                id_procesado_imagen: id_procesado_imagen,
                probabilidad: probabilidad,
            }
        });
        console.log(respuesta_carteles);
        
    },

    async createRespuestaDispositivo (id_procesado_imagen: number, huecos_esperados: number, dispositivos_contados: number) {
        const respuesta_dispositivos = await db.respuestas_dispositivos.create({
            data: {                
                id_procesado_imagen: id_procesado_imagen,
                huecos_esperados: huecos_esperados,
                dispositivos_contados: dispositivos_contados,
            }
        });
        console.log(respuesta_dispositivos);
    }
}