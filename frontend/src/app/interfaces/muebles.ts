import { expositores } from "./expositor";
export interface mueble {
    id_mueble: number;
    nombre_mueble: string;
    expositores: expositores[];
}