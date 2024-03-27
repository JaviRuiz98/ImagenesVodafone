import { procesados_imagenes, probabilidades_respuesta_carteles, imagenes, categorias_elementos, elementos } from "@prisma/client";

export interface procesados_imagenes_extended extends procesados_imagenes {
    categorias_elementos?: categorias_elementos;
    probabilidades_respuesta_carteles?: probabilidades_respuesta_carteles | null;
    imagenes?: imagenes;

}

export interface procesados_imagenes_elementos extends procesados_imagenes { 
    elementos: elementos;
}

export interface elementos_con_procesados extends elementos {
    procesados_imagenes: procesados_imagenes[];
}