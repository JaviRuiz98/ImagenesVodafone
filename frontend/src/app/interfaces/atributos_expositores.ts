import { elementos } from "./elementos";
import { expositores } from "./expositores";

export interface atributos_expositores {
    id?: number; //null para crear
    expositor : expositores;
    id_categoria:number;
    elemento?: elementos; //es el elemento activo del atributo

    x_start? : number;
    y_start? : number;
    ancho? : number;
    alto? : number;
    angulo? : number;

}