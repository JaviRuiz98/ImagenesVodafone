import { atributos_expositores } from "./atributos_expositores";
import { elementos } from "./elementos";


export interface expositores {
    id_expositor: number;
    nombre: string;
    elemento: elementos[];
}
export interface expositores_con_atributos {
    id_expositor: number;
    nombre: string;
    atributos_mueble: atributos_expositores[];
    
}