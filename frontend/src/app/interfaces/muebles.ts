import { expositores } from "./expositor";

export interface muebles {
    id_mueble: number;
    nombre_mueble: string;
   expositores: expositores[];
    
}