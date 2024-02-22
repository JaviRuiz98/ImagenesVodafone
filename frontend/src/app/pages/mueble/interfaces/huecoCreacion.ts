import { elementos } from "src/app/interfaces/elementos"

export interface huecoCreacion {
    url_imagen: string
    x_max: number
    x_min: number
    y_max: number
    y_min: number
    id_categoria?: number
    elemento?: elementos
}