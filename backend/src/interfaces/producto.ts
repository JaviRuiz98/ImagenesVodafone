import { imagenes } from "@prisma/client";
import { opciones_caracteristicas } from "./opciones_caracteristicas";

export interface producto {
    id: number; 
    nombre: string | null;
    precio: number;
    descripcion: string | null;

    imagenes: imagenes; 
    opciones_caracteristicas: opciones_caracteristicas[];
}