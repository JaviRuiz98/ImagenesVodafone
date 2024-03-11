import db from "../config/database";

export const loginService = {
    async existeUsuario(usuario: string): Promise<boolean> {
        try {
            return (await db.usuarios.findMany({ where: { usuario: usuario } })).length > 0;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            await db.$disconnect(); 
        }
    },
    async insertarUsuario(usuario: string, password: string) {
        try {
            await db.usuarios.create({ 
                data: { 
                    usuario: usuario, 
                    password: password 
                } 
            });
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            await db.$disconnect(); 
        }
    },
    async getPasswordByUsuario(usuario: string): Promise<any> {
        try {
            const user = await db.usuarios.findFirst({
                where: {
                    usuario: usuario,
                }
            });
            return user;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            await db.$disconnect();
        }
    }
    
};


