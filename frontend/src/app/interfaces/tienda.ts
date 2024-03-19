import { pertenencia_mueble_tienda } from "./pertenencia_muebles_tienda";

export interface tienda {
    id: number;
    cif: string;
    razon_social: string;
    tipo_distribuidor: string;
    sfid: string;
    nombre: string;
    activo: boolean;
    visible: boolean;
    vodafone: boolean;
    lowi: boolean;
    canal: string;
    tipo_pdv: string;
    zona_geografica: string;
    provincia: string;
    poblacion: string;
    cp: string;
    pertenencia_mueble_tienda: pertenencia_mueble_tienda[];
}
export interface tiendaCreacion extends tienda {
    archivo_imagen?: File;
}