import db  from "../config/database";

export const loginService = {
    async existeUsuario(usuario: string): Promise<boolean> {
        try{
            
            // const usuarioExistente = await db.usuarios.findUnique({
            //     where: {
            //         usuario: usuario,
            //     },
            // });
            return usuario == 'admin';
        }  catch(error){
            console.log(error);
            throw error;
        }finally{
            db.$disconnect();
        }
    },
}

