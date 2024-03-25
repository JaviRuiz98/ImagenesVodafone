import { estados_auditoria, auditorias } from "@prisma/client";

export interface estados_extended extends estados_auditoria {
    auditorias?: auditorias[],
    num_auditorias?: number
}