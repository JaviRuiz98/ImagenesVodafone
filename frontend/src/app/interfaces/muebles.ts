import { expositores } from "./expositores";
import { imagenes } from "./imagenes";
import { pertenencia_mueble_tienda } from "./pertenencia_muebles_tienda";
import { regiones } from "./regiones";

export interface muebles {
    id: number;
    nombre: string;
    regiones?: regiones;
    expositores: expositores[];
    imagen_representativa: imagenes[];
    pertenencia_mueble_tienda?: pertenencia_mueble_tienda[];
}