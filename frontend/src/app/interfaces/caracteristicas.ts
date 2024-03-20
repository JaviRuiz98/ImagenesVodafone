


export class caracteristicas_productos{
    id: number;
    id_producto: number;
    genero: string; // hombre, mujer, unisex
    talla: string;
    stock: number;

    constructor(id: number, id_producto: number, genero: string, talla: string, stock: number){
        this.id = 0;
        this.id_producto = 0;
        this.genero = '';
        this.talla = '';
        this.stock = 0;
    }
}