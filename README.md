#GETTING STARTED
    #backend
        -Se deben seguir los siguientes pasos:
        -Ejecutar en la consola npm install para obtener los node modules en local
        -Escribir en la consola npm run prisma:init
        -Especificar en el prisma el provider de base de datos
        -En el .env poner nuestro DATABASE_URL 
            DATABASE_URL="provider://usuario:contraseña@localhost:puerto/nombre_de_la_base_de_datos"
        -Ejecutar en la consola 
            -npm run prisma:pull
            -npm run prisma:generate
        -Si se guardan los archivos en local, especificarlo en las rutas cambiando los improts
        -Si se guardan usando FTP se debe configurar en el .env: HOST_FTP, USER_FTP, PASSWORD_FTP
        -Por último configurar en el .env el API_KEY_OPENAI que equivale a una key válida de openAI

    #frontend
        -Ejecutar en la consola npm install para obtener los node modules en local
