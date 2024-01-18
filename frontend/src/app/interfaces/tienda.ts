import { mueble } from "./muebles";

export interface tienda {
    id_tienda: number;
    sfid: number;
    muebles: mueble[];
    
}