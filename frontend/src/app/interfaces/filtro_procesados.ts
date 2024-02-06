export interface filtro_procesados {
    orden: String,
    categoria: String,
    prompts: number [],
    rangos_cuentas: {
      min: number,
      max: number
    },
    respuestas_carteles: string [],
    id_tienda?: number
}
export interface Filtro {
    label: string,
    value: string
}