import { imagenes } from "./imagenes";
import { probabilidad_respuesta_carteles } from "./probabilidad_respuesta_carteles";
import { Prompt } from "./prompts";


export interface procesados_imagenes {
    id_procesado_imagen: number;
    id_expositor: number;
    fecha: Date;
    comentarios?: string;
    valido: boolean;
    IA_utilizada?: string;
    prompts: Prompt;
    feedback_humano: boolean | null;  //  null (sin datos), 0 para dislike y 1 para like
    imagenes: imagenes;
    probabilidad_respuesta_carteles: probabilidad_respuesta_carteles;
    dispositivos_contados: number;
    huecos_esperados:number;
}