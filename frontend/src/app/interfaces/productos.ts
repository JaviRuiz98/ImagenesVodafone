import { imagenes } from './imagenes';
import { Opciones_caracteristicas } from './caracteristicas';

export class productos{

    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    imagenes: imagenes;
    opciones_caracteristicas: Opciones_caracteristicas[]

    constructor(id: number, nombre: string, precio: number, descripcion: string, imagenes: imagenes, opciones_caracteristicas: Opciones_caracteristicas[]){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.imagenes = imagenes;
        this.opciones_caracteristicas = opciones_caracteristicas;
    }
}