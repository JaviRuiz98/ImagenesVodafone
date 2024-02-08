import { expositores } from "@prisma/client";


export interface MuebleFrontInterfaz {
    id_mueble: number;
    nombre_mueble: string;
    numero_dispositivos: number;
    categoria: string;
    expositores: expositores[];
    
}