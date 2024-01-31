export interface Filtro_procesados {
    orden: string,
    prompts: string[],
    ia: string,
    categoria: string,
    respuestas_carteles: string[],
    respuestas_dispositivos: string[]
}

export interface Filtro {
    label: string,
    value: string
}