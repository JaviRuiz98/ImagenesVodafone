
import { imagenes } from "./imagenes";
import { procesados_imagenes } from "./procesados_imagenes";
import { regiones } from "./regiones";

export interface Expositor {
    id: number;
    imagenes: imagenes;
    region: regiones;
    nombre: string;
    activo: boolean;
    numero_dispositivos?: number;
    categoria:string;
    procesados_imagenes: procesados_imagenes[];
}