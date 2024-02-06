
export class auditoria {
    id_auditoria: number ;
    id_tienda: number;
    id_mobiliario: number;
    fecha: Date;
    terminado: boolean;

    constructor(valor: null){
        this.fecha = new Date();
        this.terminado = false;
        this.id_auditoria = 0;
        this.id_tienda = 0;
        this.id_mobiliario = 0;
    }
}