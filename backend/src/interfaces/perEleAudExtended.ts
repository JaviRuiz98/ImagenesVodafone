import { muebles } from "@prisma/client";
import { elementoExtended } from "./elementoExtended";

export interface per_ele_aud_extended {
    id: number;
    id_auditoria: number;
    id_mueble: number;
    id_elemento: number;
    muebles: muebles;
    elementos: elementoExtended;
    procesados_imagenes: any[]; // Ajusta el tipo de acuerdo a tus datos
}