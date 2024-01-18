

export interface procesados_imagenes {
    id_procesado_imagen: number;
    id_imagen: number;
    id_expositorio: number;
    fecha: Date;
    comentarios?: string;
    valido: boolean;
    IA_utilizada?: string;
    prompt_usado?: string;
}