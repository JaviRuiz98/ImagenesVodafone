import { expositores } from "./expositor";

export interface muebles {
    id_mueble: number;
    nombre_mueble: string;
    pertenencia_expositor_mueble:
    {
       id_pertenencia_expositor_mueble: number
       expositores: expositores[]
    }
    
}