export interface datos_graficas {
    etiqueta: string | Date | number;
    color?: string;
    valor: number; // eje y
    valor2?: number | Date; // eje x
}

export interface datos_graficas_multidatos {
    etiquetas: string[]; //eje x
    color?: string[];
    datos: number[][]; //eje y
}