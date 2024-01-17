[
    {
        "id_tienda": 1,
        "sfid": "tienda001",
        "muebles": [
            {
                "id_mueble": 10,
                "id_tienda": 1,
                "expositorios": [
                    {
                        "id_expositorio": 100,
                        "id_mueble": 10,
                        "id_imagen": 200,
                        "imagenes": {
                            "id_imagen": 200,
                            "url": "http://example.com/imagen.jpg"
                        },
                        "dispositivos": [
                            {
                                "id_dispositivo": 300,
                                "id_expositorio": 100,
                                "nombre": "Dispositivo 1"
                            }
                            //mas dispositivos (puede ser vacio)
                        ],
                        "procesados_imagenes": [
                            //procesado 1 
                            {
                                "id_procesado_imagen": 400,
                                "id_imagen": 200,
                                "id_expositorio": 100,
                                "fecha": "2024-01-17T12:00:00Z",
                                "comentarios": "Procesado satisfactoriamente",
                                "valido": true,
                                "IA_utilizada": "ModeloXYZ",
                                "prompt_usado": "Prompt de ejemplo",
                                "imagenes": {
                                    "id_imagen": 200,
                                    "url": "http://example.com/imagen.jpg"
                                },
                                "respuestas_carteles": 
                                [
                                    {
                                        "id_respuesta_movil": 500,
                                        "id_procesado_imagen": 400,
                                        "probabilidad": "0.95"
                                    }
                                ],
                                
                                "respuestas_movil": [],
                                
                            }, 
                            //procesado 2
                            {
                                "id_procesado_imagen": 401,
                                "id_imagen": 200,
                                "id_expositorio": 100,
                                "fecha": "2024-01-17T12:00:00Z",
                                "comentarios": "Procesado satisfactoriamente",
                                "valido": true,
                                "IA_utilizada": "ModeloXYZ",
                                "prompt_usado": "Prompt de ejemplo",
                                "imagenes": {
                                    "id_imagen": 200,
                                    "url": "http://example.com/imagen.jpg"
                                },
                                "respuestas_movil": 
                                    {
                                        "id_respuesta_movil": 600,
                                        "id_procesado_imagen": 400,
                                        "huecos_contados": 5,
                                        "moviles_contados": 10
                                    }
                                
                            }

                        ]
                    } //mas expositorios (con imagenes, dispositivos y procesados)
                ]
            }
            //mas muebles
        ]
    }
    //mas tiendas
]
