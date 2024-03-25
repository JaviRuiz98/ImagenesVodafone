export interface resultados_ordenados {
    carteles: {
        muy_alta: number,
        alta: number,
        media: number,
        baja: number,
        muy_baja: number,
        ninguna: number,
        otro_idioma: number
    },
    conteo_dispositivos: {
        error: number,
        diferencia: number[]
    }
}