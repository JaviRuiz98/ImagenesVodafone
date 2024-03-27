import { imagenes } from './imagenes';
import { caracteristicas_productos } from './caracteristicas';

export class productos{

    id: number;
    nombre: string;
    precio: number;
    genero: string;
    descripcion: string;

    imagenes: imagenes;
    caracteristicas_productos: caracteristicas_productos[]


    caracteristica_seleccionada?: caracteristicas_productos;
    cantidad?: number;

    constructor(id: number, nombre: string, precio: number, descripcion: string, imagenes: imagenes, caracteristicas_productos: caracteristicas_productos[]){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.imagenes = imagenes;
        this.caracteristicas_productos = caracteristicas_productos;
    }
}