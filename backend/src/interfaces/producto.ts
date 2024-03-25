import { imagenes } from "@prisma/client";
import { Caracteristicas_Productos } from "./opciones_caracteristicas";

export interface productoExtended {
    id: number; 
    nombre: string | null;
    precio: number;
    descripcion: string | null;
    cantidad: number;
    imagenes: imagenes; 
    caracteristica_seleccionada: Caracteristicas_Productos;
    caracteristicas_productos: Caracteristicas_Productos[];
}