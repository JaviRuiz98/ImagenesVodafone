function prompt_dispositivosEsperados_2(num_dispositivos:number): string{
    return `Eres un experto contando la cantidad de teléfonos móviles presentes en una mesa. 
    Adjunto una imagen con unos moviles expuestos para ser vendidos. Debes encontrar ${num_dispositivos} dispositivos, estos están en la imagen de modelo pintados con una región verde. 
    Dime por favor cuantos moviles hay en la foto real en formato json. 
    Si no puedes hacerlo di que valido es false, si lo haces di que true. En caso de que sea error di que el numero de telefonos es 0.
    En caso de que no cuentes los mismos móviles de los esperados indica que posiciones faltan o hay de más en los comentarios.
    La respuesta solo debe contener esto: {"dispositivos_contados": "numero", "valido": "true/false", "comentarios": "comentarios"}
    Tampoco empieces viendo de que es un json, directamente empieza usando { y termina con }.`;
}

function prompt_dispositivosEsperados_3(num_dispositivos:number): string{
    return `Eres un experto contando el número de dispositivos puestos a la venta en una foto. Actuarás como una api que responde en formato json. Empezando el mensaje directamente con { y terminando con }.
    Se te adjuntará una imagen virtual donde se marcará claramente los dispositivos esperados en esa imagen. En este caso se esperan ${num_dispositivos} dispositivos. 
    También se adjuntará una imagen real donde estarán o no los dispositivos en sus lugares.
    El primer paso es comprobar que la imagen real es el mismo mueble que el modelo. Si no es el caso di que valido = false, di que los dispositivos contados son 0 e indica el problema en los comentarios.
    Si los muebles coinciden cuenta los dispositivos y añade el número de dispositivos en el apartado dispositivos_contados. No tengas en cuenta los huecos esperados a la hora de contar. Cuenta y luego compruebas si coinciden.
    Ten en cuenta que los dispositivos son todo tipo de dispositivos electrónicos presentes en una tienda de un operador móvil: teléfonos, smartphones, smartwatches, aspiradoras, airfriers, televisores...
    La respuesta solo debe contener esto: {"dispositivos_contados": "numero", "valido": "true/false", "comentarios": "comentarios"}`
}

//--------------------------------------------------------------------------------------------------------------------------------------------------

const prompt_carteles_r1 = `Dame una probabilidad de que el cartel de la primera imagen esté contenida en la otra imagen en formato json por favor. 
Si no puedes hacerlo di que es false en valido y si puedes hacerlo pon true,todo comentario al respecto añadelo en comentarios. 
Todo mensaje de comentarios es opcional y debe estar contenido dentro de la estructura json.
Tampoco empieces avisando de que es un json, directamente empieza usando { y termina con }. Este prompt tiene como finalidad servir como api.
Para decir que la probabilidad de estar contenido es muy alta debe ser el mismo cartel o ser igual por lo menos en un 95%.
Es importante ver que el texto del cartel debe coincidir.
Solo con este estilo: {"probab_estar_contenido": "muy alta/alta/media/baja/muy baja/ninguna/error", "valido": "true/false", "comentarios": "comentarios"}`

const prompt_carteles_r2 = `Dame una probabilidad de que el cartel de la primera imagen esté contenida en la otra imagen en formato json por favor. 
Si no puedes hacerlo di que es false en valido y si puedes hacerlo pon true,todo comentario al respecto añadelo en comentarios. 
Todo mensaje de comentarios es opcional y debe estar contenido dentro de la estructura json.
Tampoco empieces avisando de que es un json, directamente empieza usando { y termina con }. Este prompt tiene como finalidad servir como api.
Primero comprueba que el idioma de los dos carteles sea coincidente, en caso de no serlo indicalo con probab_estar_contenido: otro idioma.
Para decir que la probabilidad de estar contenido es muy alta debe ser el mismo cartel y contener exactamente los mismos elementos. Ni más elementos ni menos.
Es importante ver que el texto del cartel debe coincidir.
Solo con este estilo: {"probab_estar_contenido": "muy alta/alta/media/baja/muy baja/ninguna/otro idioma/error", "valido": "true/false", "comentarios": "comentarios"}`

//--------------------------------------------------------------------------------------------------------------------------------------------------

export function getPromptCarteles(nombre_prompt: string): string{
    switch (nombre_prompt) {
        case 'prompt_carteles_r1':
            return prompt_carteles_r1;
        case 'prompt_carteles_r2':
            return prompt_carteles_r2;
        default:
            return `Dame error en este formato: {"numero_telefonos": "0", "error_solicitud": "error", "comentarios": "Prompt mal especificado"}`;
    } 
}

export function getPromptDispositivos(nombre_prompt: string, dispositivosEsperados: number): string {
    switch (nombre_prompt) {
        case 'prompt_telefonosEsperados_2':
            return prompt_dispositivosEsperados_2(dispositivosEsperados);
        case 'prompt_telefonosEsperados_3':
            return prompt_dispositivosEsperados_3(dispositivosEsperados);
        default: 
            return 'Dame error en este formato: {"numero_telefonos": "0", "error_solicitud": "error", "comentarios": "Prompt mal especificado"}';  
    }
};

