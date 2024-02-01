// export type estadisticaPrompts = { type: 'id_prompt', id_prompt: number } | { type: 'image_url', image_url: { url: string } };



export interface estadisticaPrompts {
    id_prompt: number;
    nombre_prompt: string | null;
    likes: number;
    dislikes: number;
    nulos: number;
    porcentaje_exito: number;
}