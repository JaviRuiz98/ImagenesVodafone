
import { imagenes } from "./imagenes";
import { procesados_imagenes } from "./procesados_imagenes";
import { regiones } from "./regiones";
import { categorias_elementos } from "./categoria";

export interface elementos {
    id: number;
    imagenes: imagenes;
    region: regiones;
    nombre: string;
    activo: boolean;
    categorias_elementos: categorias_elementos;
    procesados_imagenes?: procesados_imagenes[];
}

