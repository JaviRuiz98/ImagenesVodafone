import { imagenes } from './imagenes';


export interface productos{

    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    imagenes: imagenes;

}