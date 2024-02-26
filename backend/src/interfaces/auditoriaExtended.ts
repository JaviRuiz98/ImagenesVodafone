import { auditorias } from "@prisma/client";
import { tiendas } from "@prisma/client";

export interface auditoria_extended extends auditorias {
    tiendas?: tiendas[],
    num_expositores_procesados: number,
    num_expositores: number,
    datos_barra_progreso: number[]
}