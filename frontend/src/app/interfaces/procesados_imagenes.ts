import { respuesta_carteles } from "./respuesta_carteles";
import { respuesta_dispositivos } from "./respuesta_dispositivos";


export interface procesados_imagenes {
    id_procesado_imagen: number;
    id_imagen: number;
    id_expositor: number;
    fecha: Date;
    comentarios?: string;
    valido: boolean;
    IA_utilizada?: string;
    prompt_usado?: string;
    respuesta_carteles?: respuesta_carteles | null;
    respuesta_dispositivos?: respuesta_dispositivos | null;
}