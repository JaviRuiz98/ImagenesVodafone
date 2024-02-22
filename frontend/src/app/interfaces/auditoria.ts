import { estados_auditoria } from './estados_auditoria';

export class auditoria {
    id: number ;
    id_tienda: number;
    id_mobiliario: number;
    fecha: Date;
    estado: string;
    num_expositores_procesados: number;
    num_expositores: number;
    datos_barra_progreso: number[];
    estados_auditoria: estados_auditoria;

    constructor(valor: null){
        this.fecha = new Date();
        this.estado = 'en progreso';
        this.id = 0;
        this.id_tienda = 0;
        this.id_mobiliario = 0;
        this.num_expositores_procesados = 0;
        this.num_expositores = 0;
        this.datos_barra_progreso = [];
        this.estados_auditoria = new estados_auditoria(null);
    }
}