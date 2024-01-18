import { expositorios, imagenes } from "@prisma/client";

export  interface expositorioProcesado extends expositorios{
    imagen_procesada: imagenes
}

