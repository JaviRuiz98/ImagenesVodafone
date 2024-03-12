



export interface muebleCreation{
    nombre_mueble: string,
    region: {
        id: number
    },
    expositores: [
        {
            nombre_expositor: string,
            
            atributos_expositores: [
            
                {
                    x_start?: number,
                    y_start?: number,
                    ancho?: number,
                    alto?: number,
                    angulo?: number,
                    categorias_elementos?: {
                        id: number
                    },
                    elemento?: {
                        id?:number,
                        nombre?: string,
                        imagen ?: string,
                        archivo_imagen?: File,
                        nombre_archivo?: string,
                        categorias_elementos?: {
                            id: number
                        },

                       
                    }
                }
            ]
        }
    ]
}