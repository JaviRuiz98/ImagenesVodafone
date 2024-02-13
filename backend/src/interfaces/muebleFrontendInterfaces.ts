
import { expositoresConProcesados } from "./expositoresProcesados";


export interface MuebleFrontInterfaz {
    id: number;
    nombre_mueble: string;
    numero_expositores_dispositivos: number;
    numero_expositores_carteles: number;
    expositores: expositoresConProcesados[];
    
}