
import { imagenes } from "./imagenes";
import { dispositivos } from "./dispositivos";
export interface expositores {
    id_expositor: number;
    id_mueble: number;
    imagenes: imagenes;
    dispositivos: dispositivos[];
}