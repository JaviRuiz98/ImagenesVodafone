import { categorias_elementos } from "./categoria";
import { elementos } from "./elementos";
import { expositores } from "./expositores";

export interface atributos_expositores {
    id?: number; //null para crear
    expositor? : expositores; //null para crear
    x_min? : number;
    x_max? : number;
    y_min? : number;
    y_max? : number;
    categorias_elementos: categorias_elementos;
    elemento?: elementos; //es el elemento activo del atributo

}