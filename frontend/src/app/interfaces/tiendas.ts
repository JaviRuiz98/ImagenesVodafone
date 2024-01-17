import { mueble } from "./muebles";

export interface tiendas {
    id_tienda: number;
    sfid: number;
    muebles: mueble[];
    
}