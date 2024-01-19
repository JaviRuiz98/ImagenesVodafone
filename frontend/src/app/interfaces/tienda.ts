import { mueble } from "./muebles";

export interface tienda {
    id_tienda: number;
    sfid: string;
    muebles: mueble[];
    
}