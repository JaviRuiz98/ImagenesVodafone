export interface resultados_ordenados {
    carteles: {
        muy_alta: number,
        alta: number,
        otro_idioma: number
        media: number,
        baja: number,
        muy_baja: number,
        ninguna: number,
        no_procesados?: number
    },
    conteo_dispositivos: {
        error: number,
        diferencia: number[],
        no_procesados?: number
    }
}