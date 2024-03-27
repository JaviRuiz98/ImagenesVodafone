import { elementos, procesados_imagenes } from "@prisma/client";


export interface elementosConIdExpositorAuditoria extends elementos {
    id_expositor_auditoria: number
}
export interface elementosConProcesados extends elementos {
    procesados_imagenes: procesados_imagenes[]
}