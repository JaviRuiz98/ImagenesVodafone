import { Expositor } from "./expositor";

export interface muebles {
    id: number;
    nombre_mueble: string;
    numero_expositores_carteles: number;
    numero_expositores_dispositivos: number;
    expositores: Expositor[];  
}