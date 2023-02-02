import { prisma } from "../index";

export class BuyService {
    constructor() { }

    public static async create(data: any) {

        try {
            const buy = await prisma.buy.create(
                {
                    data: { ...data }
                });

            return { success: true, buy };
        } catch (error) {
            console.log({ error });
            return { sucess: false, error: 'Hubo un error' };
        }
    }

    public static async getAll() {
        try {
            const buy = await prisma.buy.findMany();

            return { success: true, buy };
        } catch (error) {
            console.log({ error });
            return { sucess: false, error: 'Hubo un error' };
        }
    }

    public static async getById(id: any) {
        try {
            const buy = await prisma.buy.findUnique({ where: { id } });

            if (!buy) return { success: false, error: "No existe el id de buy" };


            return { success: true, buy };
        } catch (error) {
            console.log({ error });
            return { sucess: false, error: 'Hubo un error' };
        }
    }



    public static async deleteById(id: any) {
        try {
            const deleted = await prisma.buy.delete({ where: { id } });

            return { success: true, deleted };
        } catch (error) {
            console.log({ error });
            return { sucess: false, error: 'Hubo un error, creo que el id no es el correcto' };
        }
    }


}