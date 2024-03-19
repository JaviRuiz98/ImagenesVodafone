import { imagenes } from './imagenes';
import { Caracteristicas_productos } from './caracteristicas';

export class productos{

    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    imagenes: imagenes;
    opciones_caracteristicas: Caracteristicas_productos[]

    visible: boolean;

    constructor(id: number, nombre: string, precio: number, descripcion: string, imagenes: imagenes, opciones_caracteristicas: Caracteristicas_productos[]){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.imagenes = imagenes;
        this.opciones_caracteristicas = opciones_caracteristicas;
        this.visible = false;
    }
}