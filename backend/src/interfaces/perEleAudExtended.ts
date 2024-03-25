import { muebles, pertenencia_elementos_auditoria } from "@prisma/client";
import { elementoExtended } from "./elementoExtended";
import { procesados_imagenes_extended } from "./procesadosImagenesExtended";

export interface per_ele_aud_extended extends pertenencia_elementos_auditoria {
    muebles?: muebles;
    elementos?: elementoExtended;
    procesados_imagenes: procesados_imagenes_extended[];
}