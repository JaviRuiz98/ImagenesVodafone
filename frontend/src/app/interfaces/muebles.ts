import { expositores } from "./expositores";
import { regiones } from "./regiones";

export interface muebles {
    id: number;
    nombre: string;
    regiones?: regiones;
    expositores: expositores[];
}