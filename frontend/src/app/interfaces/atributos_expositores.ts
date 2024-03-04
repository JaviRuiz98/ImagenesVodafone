import { elementoCreacion } from "../pages/mueble/interfaces/elementoCreacion";
import { categorias_elementos } from "./categoria";
import { elementos } from "./elementos";
import { expositores } from "./expositores";

export interface atributos_expositores {
    id?: number; //null para crear
    expositor?: expositores;
    categorias_elementos: categorias_elementos;
    elemento?: elementos | elementoCreacion; //es el elemento activo del atributo

    x_start? : number;
    y_start? : number;
    ancho? : number;
    alto? : number;
    angulo? : number;

}