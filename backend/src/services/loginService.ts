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
};


