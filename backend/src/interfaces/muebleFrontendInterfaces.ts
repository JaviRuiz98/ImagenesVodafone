
import { elementosConProcesados } from "./expositoresProcesados";


export interface MuebleFrontInterfaz {
    id: number;
    nombre_mueble?: string;
    elementos: elementosConProcesados[];
}