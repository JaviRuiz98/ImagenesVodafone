export interface datos_graficas {
    etiqueta: string | Date | number;
    color?: string;
    valor: number; // eje y
    valor2?: number | Date; // eje x
}

export interface datos_graficas_multidatos {
    // por cada conjunto de datos
    color?: string[];
    leyenda: string[];

    // por cada etiqueta
    etiquetas: string[]; //eje x
    datos: number[][]; //eje y
}