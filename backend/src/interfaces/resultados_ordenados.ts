import { elementos } from "@prisma/client"

export interface resultados_ordenados {
    carteles: {
        muy_alta: number,
        alta: number,
        media: number,
        baja: number,
        muy_baja: number,
        ninguna: number,
        otro_idioma: number,
        no_procesados?: number
    },
    conteo_dispositivos: {
        error: number,
        diferencia: number[],
        no_procesados?: number

    }
}

export interface resultados_ordenados_elementos {
    carteles: {
        muy_alta: elementos[],
        alta: elementos[],
        media: elementos[],
        baja: elementos[],
        muy_baja: elementos[],
        ninguna: elementos[],
        otro_idioma: elementos[],
    },
    conteo_dispositivos: {
        error: elementos[],
        diferencia: elementos[][],
    }
}