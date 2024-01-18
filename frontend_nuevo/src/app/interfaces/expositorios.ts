
import { imagenes } from "./imagenes";
import { dispositivos } from "./dispositivos";
export interface expositorios {
    id_expositorio: number;
    id_mueble: number;
    imagen: imagenes;
    dispositivos: dispositivos[];
}