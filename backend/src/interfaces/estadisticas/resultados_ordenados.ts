import { elementos } from "@prisma/client"

export interface resultados_ordenados {
    carteles: {
        muy_alta: number,
        alta: number,
        otro_idioma: number,
        media: number,
        baja: number,
        muy_baja: number,
        ninguna: number,
        no_procesados?: number
    },
    conteo_dispositivos: {
        error: number,
        diferencia: number[],
        no_procesados?: number,

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

export interface estadisticas_carteles {
    elemento: elementos,
    muy_alta: number,
    alta: number,
    media: number,
    baja: number,
    muy_baja: number,
    ninguna: number,
    otro_idioma: number,
}

export interface estadisticas_conteo_dispositivos {
    elemento: elementos,
    error: number,
    diferencia: number[],
}