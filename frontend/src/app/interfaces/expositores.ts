import { atributos_expositores } from "./atributos_expositores";
import { elementos } from "./elementos";


export interface expositores {
    id: number;
    nombre: string;
    elementos: elementos[];
}
export interface expositores_con_atributos {
    id: number;
    nombre: string;
    atributos_mueble: atributos_expositores[];
    
}