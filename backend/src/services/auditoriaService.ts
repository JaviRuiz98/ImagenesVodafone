import db  from "../config/database";

export const auditoriaService = {

    async getFechaAuditoriaDadoId(id_auditoria: number): Promise<Date | null> {
        try {
            const auditoria =  await db.auditoria.findUnique({
                where: {
                    id_auditoria: id_auditoria
                },
                select: {
                    fecha: true
                }
            });
            return auditoria?.fecha ?? null;
        } catch (error) {
            throw error;
        }
    }
}