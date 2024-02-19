import { expositores } from "./expositores";



export interface muebles {
    id: number;
    nombre: string;
    expositores: expositores[];
}