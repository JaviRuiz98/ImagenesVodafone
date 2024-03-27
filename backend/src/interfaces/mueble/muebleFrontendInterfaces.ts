
import { elementosConProcesados } from "./expositoresProcesados";


export interface ExpositorFrontInterfaz {
    id: number;
    nombre?: string;
    elementos: elementosConProcesados[];
}