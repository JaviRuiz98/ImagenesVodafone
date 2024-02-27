import { elementos } from "./elementos";
import { tienda } from "./tienda";
import { procesados_imagenes } from "./procesados_imagenes";

export interface datos_informe {
    datos_barra_progreso: number[],
    fecha: Date,
    fecha_fin: Date,
    id: number,
    id_estado: number,
    id_tienda: number,
    num_expositores: number,
    num_expositores_procesados: number,
    procesados_auditoria: procesados_auditoria[],
    tiendas: tienda
}

export interface procesados_auditoria {
    elementos: elementos,
    id: number,
    id_auditoria: number,
    id_elemento: number,
    id_mueble: number,
    procesados_imagenes: procesados_imagenes[]
}