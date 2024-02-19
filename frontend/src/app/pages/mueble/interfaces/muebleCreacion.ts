import { atributos_mueble_mueble } from "src/app/interfaces/atributos_mueble";


export interface MuebleCreacion  {
    id?: number;
    nombre_mueble: string;
    relacion_elementos_muebles?: atributos_mueble_mueble[];
  }