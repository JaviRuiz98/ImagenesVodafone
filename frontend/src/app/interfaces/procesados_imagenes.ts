import { imagenes } from "./imagenes";
import { respuesta_carteles } from "./respuesta_carteles";
import { respuesta_dispositivos } from "./respuesta_dispositivos";


export interface procesados_imagenes {
    id_procesado_imagen: number;
    id_expositor: number;
    fecha: Date;
    comentarios?: string;
    valido: boolean;
    IA_utilizada?: string;
    prompt_usado?: string;
    imagenes: imagenes;
    respuestas_carteles: respuesta_carteles[];
    respuestas_dispositivos: respuesta_dispositivos[];
}