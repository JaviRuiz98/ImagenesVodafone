import { muebles } from "./muebles"

export interface atributos_expositores {
    id?: number; //null para crear
    mueble : muebles;
    x_min? : number;
    x_max? : number;
    y_min? : number;
    y_max? : number;
    id_categoria:number;

}