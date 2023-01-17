import { prisma } from "../index";

export class UserService {
    constructor() { }

    public static async create(data: any) {
        try {
            const user = await prisma.user.create({ data: { ...data } });

            return { success: true, user };
        } catch (error) {
            console.log({ error });
            return { sucess: false, error: 'Hubo un error' };
        }
    }

    public static async getAll() {
        try {
            const users = await prisma.user.findMany();

            return { success: true, users };
        } catch (error) {
            console.log({ error });
            return { sucess: false, error: 'Hubo un error' };
        }
    }

    public static async getById(id:any) {
        try {
            const user = await prisma.user.findMany({ where: { id } });

            return { success: true, user };
        } catch (error) {
            console.log({ error });
            return { sucess: false, error: 'Hubo un error' };
        }
    }

    

    public static async deleteById(id: any) {
        try {
            const deleted = await prisma.user.delete({ where: { id } });

            return { success: true, deleted };
        } catch (error) {
            console.log({ error });
            return { sucess: false, error: 'Hubo un error, creo que el id no es el correcto' };
        }
    }


}