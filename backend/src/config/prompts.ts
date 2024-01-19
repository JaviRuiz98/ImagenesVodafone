const prompt_r1 = `Eres un experto contando la cantidad de teléfonos móviles presentes en una mesa.
    Adjunto una imagen con unos moviles expuestos para ser vendidos. Dime por favor cuantos moviles hay en formato json. 
    Si no puedes hacerlo di que error_solicitud es error, si lo haces di que exitoso. En caso de que sea error di que el numero de telefonos es 0.
    La respuesta solo debe contener esto: {"numero_telefonos": "numero", "error_solicitud": "exitoso/error", "comentarios": "comentarios"}
    Tampoco empieces viendo de que es un json, directamente empieza usando { y termina con }.`;

const prompt_r1_english = `You are an expert at counting the number of mobile phones in a table. Please provide the number of mobile phones in JSON format".
I am attaching an image of mobile phones for sale. Please give me the number of mobile phones. If unable, say "error_request is error", if successful, say "successful". If it fails, say that the number of phones is 0.
The response should only contain this: {"numero_telefonos": "numero", "error_solicitud": "exitoso/error", "comentarios": "comentarios"}.
Don't start by saying that the response is a json, start directly with "{" and end with "}".`

const prompt_r1_extendido = `Eres un experto en identificación de teléfonos móviles.
Dada una imagen con unos móviles expuestos para ser vendido dime cuantos móviles son visibles.
La respuesta debe ser en formato Json y tendrá los siguientes parámetros:
•  numero_telefonos: este campo es un número entero que indicará el nº de teléfonos que son visibles en la imagen.
•  comentarios: este campo es una cadena de texto que representará información opcional adicional si es necesario aportar algo (ubicación, consideraciones,etc…)
•  error_solicitud: es una cadena de texto que solo puede tomar como valor “exitoso” o “error” y se indicará “error” solo en caso de que no seas capaz de identificar el número de teléfonos, en cualquier otro caso “error_solicitud” será “exitoso”.
Un ejemplo de una respuesta válida es:
{
"numero_telefonos": "4",
"error_solicitud": "exitoso ",
"comentarios": "comentario útil"
}
Asegúrate de que tu respuesta siga estrictamente el formato definido. Empieza directamente con { y acaba con }.`

const prompt_c1 = `Eres un experto en identificación de teléfonos móviles.
Dada una imagen con unos móviles expuestos para ser vendido dime cuantos móviles son visibles.
Es posible que además de smartphones, encuentres móviles con fundas protectoras extrañas, móviles antiguos, tablets o dispositivos electrónicos de los que no estés seguro si pueden ser considerados telefonos móviles. Este tipo de dispositivos los llamaremos “teléfonos dudosos”.
La respuesta debe ser en formato Json y tendrá los siguientes parámetros:
•  numero_telefonos: este campo es un número entero que indicará el número de teléfonos que son visibles en la imagen.
•  números_telefonos_dudosos: este campo es un número entero que representará el número de teléfonos dudosos que son visibles en la imagen.
•  comentarios: este campo es una cadena de texto que representará información opcional adicional si es necesario aportar algo (ubicación, consideraciones,etc…)
•  error_solicitud: es una cadena de texto que solo puede tomar como valor “exitoso” o “error” y se indicará “error” solo en caso de que no seas capaz de identificar el número de teléfono en cualquier otro caso “error_solicitud” será “exitoso”.
Un ejemplo de una respuesta válida es:
{
"numero_telefonos": 4,
“numero_telefonos_dudosos”:2,
"error_solicitud": "exitoso ",
"comentarios": "comentario útil"
}
Asegúrate de que tu respuesta siga estrictamente el formato definido. Empieza con { y acaba con }.`;

function prompt_dispositivosEsperados_1(num_dispositivos:number): string{
    return `Eres un experto contando la cantidad de teléfonos móviles presentes en una mesa. Debes encontrar ${num_dispositivos} dispositivos
    Adjunto una imagen con unos moviles expuestos para ser vendidos. Dime por favor cuantos moviles hay en formato json. 
    Si no puedes hacerlo di que error_solicitud es error, si lo haces di que exitoso. En caso de que sea error di que el numero de telefonos es 0.
    La respuesta solo debe contener esto: {"numero_telefonos": "numero", "error_solicitud": "exitoso/error", "comentarios": "comentarios"}
    Tampoco empieces viendo de que es un json, directamente empieza usando { y termina con }.`;
}

function prompt_dispositivosEsperados_2(num_dispositivos:number): string{
    return `Eres un experto contando la cantidad de teléfonos móviles presentes en una mesa. 
    Adjunto una imagen con unos moviles expuestos para ser vendidos. Debes encontrar ${num_dispositivos} dispositivos, estos están en la imagen de modelo pintados con una región verde. 
    Dime por favor cuantos moviles hay en la foto real en formato json. 
    Si no puedes hacerlo di que valido es false, si lo haces di que true. En caso de que sea error di que el numero de telefonos es 0.
    En caso de que no cuentes los mismos móviles de los esperados indica que posiciones faltan o hay de más en los comentarios.
    La respuesta solo debe contener esto: {"dispositivos_contados": "numero", "valido": "true/false", "comentarios": "comentarios"}
    Tampoco empieces viendo de que es un json, directamente empieza usando { y termina con }.`;
}

//--------------------------------------------------------------------------------------------------------------------------------------------------

const prompt_carteles_r1 = `Dame una probabilidad de que el cartel de la primera imagen esté contenida en la otra imagen en formato json por favor. 
Si no puedes hacerlo di que es error en probab_estar_contenido y todo comentario añadelo en comentarios. 
Todo mensaje de comentarios es opcional y debe estar contenido dentro de la estructura json.
Tampoco empieces avisando de que es un json, directamente empieza usando { y termina con }. Este prompt tiene como finalidad servir como api.
Para decir que la probabilidad de estar contenido es muy alta debe ser el mismo cartel o ser igual por lo menos en un 95%.
Es importante ver que el texto del cartel debe coincidir.
Solo con este estilo: {"probab_estar_contenido": "muy alta/alta/media/baja/muy baja/ninguna/error", "comentarios": "comentarios"}`

//--------------------------------------------------------------------------------------------------------------------------------------------------

export function getPromptCarteles(nombre_prompt: string): string{
    switch (nombre_prompt) {
        case 'prompt_carteles_r1':
            return prompt_carteles_r1;
        default:
            return `Dame error en este formato: {"numero_telefonos": "0", "error_solicitud": "error", "comentarios": "Prompt mal especificado"}`;
    } 
}

export function getPromptDispositivos(nombre_prompt: string, dispositivosEsperados: number): string {
    switch (nombre_prompt) {
        case 'prompt_r1': 
            return prompt_r1;
        case 'prompt_r1_english':
            return prompt_r1_english;
        case 'prompt_r1_extendido':
            return prompt_r1_extendido;
        case 'prompt_c1':
            return prompt_c1;
        case 'prompt_telefonosEsperados_1':
            return prompt_dispositivosEsperados_1(dispositivosEsperados);
        case 'prompt_telefonosEsperados_2':
            return prompt_dispositivosEsperados_2(dispositivosEsperados);
        default: 
            return 'Dame error en este formato: {"numero_telefonos": "0", "error_solicitud": "error", "comentarios": "Prompt mal especificado"}';  
    }
};

