import { auditorias } from "@prisma/client";

export interface auditoria_extended extends auditorias {
    num_expositores_procesados: number,
    num_expositores: number,
}