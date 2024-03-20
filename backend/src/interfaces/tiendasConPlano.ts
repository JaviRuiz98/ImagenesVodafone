import { imagenes, pertenencia_mueble_tienda, tiendas } from "@prisma/client";

export interface tiendasConPlano extends tiendas {
    imagen_plano?: imagenes;
    pertenencia_mueble_tienda?: pertenencia_mueble_tienda[],
    
}