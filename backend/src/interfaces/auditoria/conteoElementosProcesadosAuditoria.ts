export interface conteo_elementos_procesados_auditoria {
    en_progreso: {
        total: number,
        procesados: number,
        porcentaje: number
    },
    finalizada: {
        total: number,
        procesados: number,
        porcentaje: number
    },
    caducada: {
        total: number,
        procesados: number,
        porcentaje: number
    }
}