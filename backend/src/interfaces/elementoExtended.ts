import { imagenes, elementos } from "@prisma/client";
import { procesados_imagenes_extended } from "./procesadosImagenesExtended";

export interface elementoExtended extends elementos {
    id_region?: number | null;
    id_expositor?: number | null; // para cuando es un elemento perteneciente a una auditoria
    imagenes?: imagenes;
    procesados_imagenes?: procesados_imagenes_extended[]; // Ajusta el tipo de acuerdo a tus datos
}