import {  procesados_imagenes, elementos, pertenencia_elementos_auditoria } from "@prisma/client";

export interface pea_extended extends pertenencia_elementos_auditoria {
    elementos: elementos,
    procesados_imagenes: procesados_imagenes[]
}