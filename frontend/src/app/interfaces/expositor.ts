
import { imagenes } from "./imagenes";
import { procesados_imagenes } from "./procesados_imagenes";

export interface Expositor {
    id_expositor: number;
    imagen: imagenes;
    nombre: string;
    procesados_imagenes: procesados_imagenes[];
}