import { productos } from "./productos";
import { caracteristicas_productos } from "./caracteristicas";


export interface carrito {
    id: number;
    id_pedido: number;
    id_caracteristicas_productos: number;
    cantidad: number;
}