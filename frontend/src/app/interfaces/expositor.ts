
import { imagenes } from "./imagenes";
import { dispositivos } from "./dispositivos";
import { procesados_imagenes } from "./procesados_imagenes";
export interface expositores {
    id_expositor: number;
    id_mueble: number;
    imagenes: imagenes;
    dispositivos: dispositivos[];
    procesados_imagenes: procesados_imagenes[];
}