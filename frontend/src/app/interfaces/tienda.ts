import { pertenencia_mueble_tienda } from "./pertenencia_muebles_tienda";

export interface tienda {
    id: number;
    sfid: string;
    pertenencia_mueble_tienda: pertenencia_mueble_tienda[];
    activo: boolean;
}