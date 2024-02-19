import { atributos_mueble_mueble } from "./atributos_mueble";


export interface muebles {
    id: number;
    nombre_mueble: string;
    relacion_elementos_mueble: atributos_mueble_mueble[];  
}