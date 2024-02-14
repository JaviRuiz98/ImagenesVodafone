import { Expositor } from "src/app/interfaces/expositor";

export interface MuebleCreacion  {
    id?: number;
    nombre_mueble: string;
    numero_expositores_carteles: number;
    numero_expositores_dispositivos: number;
    expositores: Expositor[];  
  }