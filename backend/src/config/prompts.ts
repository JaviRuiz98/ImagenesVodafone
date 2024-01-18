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
Asegúrate de que tu respuesta siga estrictamente el formato definido. Empieza con { y acaba con }.`

export function getPrompt(nombre_prompt: string): string {
    switch (nombre_prompt) {
        case 'prompt_r1': 
            return prompt_r1;
        case 'prompt_r1_english':
            return prompt_r1_english;
        case 'prompt_r1_extendido':
            return prompt_r1_extendido;
        case 'prompt_c1':
            return prompt_c1;
        default: 
            return 'Dame error en este formato: {"numero_telefonos": "0", "error_solicitud": "error", "comentarios": "Prompt mal especificado"}';  
    }
};