import { muebles } from "./muebles";
import { posiciones_muebles_tienda } from "./posiciones_muebles_tienda";

export interface pertenencia_mueble_tienda {
    id_mueble: number;
    id_pertenencia_mueble_mobiliario: number;
    id_tienda: number;
    muebles: muebles[];
    posiciones_muebles_tienda?: posiciones_muebles_tienda[];
}