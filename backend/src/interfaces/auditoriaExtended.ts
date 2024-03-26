import { auditorias, estados_auditoria } from "@prisma/client";
import { tiendas } from "@prisma/client";

export interface auditoria_extended extends auditorias {
    tiendas?: tiendas[],
    estados_auditoria?: estados_auditoria[],
    
    num_expositores_procesados?: number,
    num_expositores?: number,
    datos_barra_progreso?: number[]
}