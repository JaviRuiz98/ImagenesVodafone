import { imagenes } from "@prisma/client";

export interface elementoExtended {
    id: number;
    id_imagen: number | null;
    id_region: number | null;
    nombre: string | null;
    activo: boolean;
    id_categoria: number;
    imagenes: imagenes;
    procesados_imagenes: any[]; // Ajusta el tipo de acuerdo a tus datos
}