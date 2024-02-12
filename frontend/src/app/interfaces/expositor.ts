
import { imagenes } from "./imagenes";
import { procesados_imagenes } from "./procesados_imagenes";

export interface Expositor {
    id_expositor: number;
    imagenes: imagenes;
    nombre: string;
    activo: boolean;
    procesados_imagenes: procesados_imagenes[];
}