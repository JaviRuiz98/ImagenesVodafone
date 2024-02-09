
export class auditoria {
    id_auditoria: number ;
    id_tienda: number;
    id_mobiliario: number;
    fecha: Date;
    estado: string;
    num_expositores: number;

    constructor(valor: null){
        this.fecha = new Date();
        this.estado = 'en progreso';
        this.id_auditoria = 0;
        this.id_tienda = 0;
        this.id_mobiliario = 0;
        this.num_expositores = 0;
    }
}