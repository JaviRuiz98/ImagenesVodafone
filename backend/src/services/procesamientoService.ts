import db  from "../config/database";

export const procesamientoService = {
    async create (tipoProcesado: string, id_imagen: number, id_expositor: number, comentarios: string, valido: boolean, IA_utilizada: string, prompt_usado: string) {

        const procesamiento = await db.procesados_imagenes.create({
            data: {                
                id_imagen: id_imagen,
                id_expositor: id_expositor,
                comentarios: comentarios,
                valido: valido,
                tipo_procesado: tipoProcesado,
                IA_utilizada: IA_utilizada,
                prompt_usado: prompt_usado,
            }
        });
        console.log(procesamiento);
    }, 
    


}