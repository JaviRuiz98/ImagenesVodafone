import { imagenes } from "./imagenes";


export interface procesados_imagenes {
    id_procesado_imagen: number;
    id_expositor: number;
    fecha: Date;
    comentarios?: string;
    valido: boolean;
    IA_utilizada?: string;
    prompt_usado?: string;
    imagenes: imagenes;
}