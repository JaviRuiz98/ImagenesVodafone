import { muebles } from "./muebles";
export interface pertenencia_mueble_tienda {
    id_mueble: number;
    id_pertenencia_mueble_mobiliario: number;
    id_tienda: number;
    muebles: muebles[];
}