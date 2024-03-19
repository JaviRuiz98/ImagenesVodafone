
import { imagenes } from "./imagenes";
import { procesados_imagenes } from "./procesados_imagenes";
import { categorias_elementos } from "./categoria";

export interface elementos {
    id?: number; //null para crear
    imagenes: imagenes;
    nombre: string;
    activo: boolean;
    categorias_elementos: categorias_elementos;
    procesados_imagenes?: procesados_imagenes[];
}

