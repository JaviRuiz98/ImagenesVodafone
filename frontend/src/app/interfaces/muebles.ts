import { expositores } from "./expositores";
import { imagenes } from "./imagenes";
import { regiones } from "./regiones";

export interface muebles {
    id: number;
    nombre: string;
    regiones?: regiones;
    expositores: expositores[];
    imagen_representativa: imagenes[];
}