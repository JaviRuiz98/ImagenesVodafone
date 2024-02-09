import { expositores, procesados_imagenes } from "@prisma/client";


export interface expositoresConIdExpositorAuditoria extends expositores {
    id_expositor_auditoria: number
}
export interface expositoresConProcesados extends expositores {
    procesados_imagenes?: procesados_imagenes[]
}