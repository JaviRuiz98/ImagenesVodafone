import { pertenencia_expositor_auditoria, expositores, procesados_imagenes } from "@prisma/client";

export interface pea_extended extends pertenencia_expositor_auditoria {
    expositores: expositores[],
    procesados_imagenes: procesados_imagenes[]
}