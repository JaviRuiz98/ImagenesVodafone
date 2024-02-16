
import { imagenes } from "./imagenes";
import { procesados_imagenes } from "./procesados_imagenes";
import { regiones } from "./regiones";

export interface elementos {
    id: number;
    imagenes: imagenes;
    region: regiones;
    nombre: string;
    activo: boolean;
    categoria:number;
    procesados_imagenes: procesados_imagenes[];
}