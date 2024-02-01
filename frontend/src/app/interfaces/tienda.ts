import { muebles } from "./muebles";

export interface tienda {
    id_tienda: number;
    sfid: string;
    muebles: muebles[];
    
}