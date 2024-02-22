import { elementos } from "./elementos";
import { expositores } from "./expositores";

export interface atributos_expositores {
    id?: number; //null para crear
    expositor : expositores;
    x_min? : number;
    x_max? : number;
    y_min? : number;
    y_max? : number;
    id_categoria:number;
    elemento?: elementos; //es el elemento activo del atributo

}