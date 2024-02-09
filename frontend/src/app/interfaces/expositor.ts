
import { imagenes } from "./imagenes";
import { dispositivos } from "./dispositivos";
import { procesados_imagenes } from "./procesados_imagenes";

export interface Expositor {
    id_expositor: number;
    imagen: imagenes;
    nombre: string;
    activo: boolean;
}