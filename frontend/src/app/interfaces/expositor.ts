
import { imagenes } from "./imagenes";


export interface Expositor {
    id_expositor: number;
    imagenes: imagenes;
    nombre: string;
    procesados_imagenes: procesados_imagenes[];
}