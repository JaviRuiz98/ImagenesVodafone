import { atributos_expositores } from "./atributos_expositores";



export interface expositores {
    id?: number; //id nulo para creación
    nombre: string;
    atributos_expositores: atributos_expositores[];
    
}