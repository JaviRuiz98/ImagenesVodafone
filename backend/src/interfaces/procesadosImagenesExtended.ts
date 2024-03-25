import { procesados_imagenes, probabilidades_respuesta_carteles, imagenes, categorias_elementos } from "@prisma/client";

export interface procesados_imagenes_extended extends procesados_imagenes {
    categorias_elementos?: categorias_elementos;
    probabilidades_respuesta_carteles?: probabilidades_respuesta_carteles | null;
    imagenes?: imagenes;

}