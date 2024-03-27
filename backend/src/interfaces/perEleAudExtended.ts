import { muebles, pertenencia_elementos_auditoria } from "@prisma/client";
import { elementoExtended } from "./elementos/elementoExtended";
import { procesados_imagenes_extended } from "./procesados/procesadosImagenesExtended";
import { auditoria_extended } from "./auditoriaExtended";

export interface per_ele_aud_extended extends pertenencia_elementos_auditoria {
    muebles?: muebles;
    elementos?: elementoExtended;
    procesados_imagenes: procesados_imagenes_extended[];
    auditorias?: auditoria_extended;
}