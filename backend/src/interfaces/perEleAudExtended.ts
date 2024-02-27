import { muebles } from "@prisma/client";
import { elementoExtended } from "./elementoExtended";
import { procesados_imagenes_extended } from "./procesadosImagenesExtended";

export interface per_ele_aud_extended {
    id: number;
    id_auditoria: number;
    id_mueble: number;
    id_elemento: number;
    muebles: muebles;
    elementos: elementoExtended;
    procesados_imagenes: procesados_imagenes_extended[]; // Ajusta el tipo de acuerdo a tus datos
}