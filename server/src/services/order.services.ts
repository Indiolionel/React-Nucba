import { prisma } from "../index";

export class OrderService {
    constructor() { }

    public static async create(data: any) {
        const { shipping, userId, buys } = data;
        try {
            const order = await prisma.order.create(
                
                {
                    data: {
                        shipping,
                        userId,
                        buys: { createMany: { data: [...buys] } }
                    },

                });
                
            return { success: true, order };
        } catch (error) {
            console.log({ error });
            return { sucess: false, mensaje: 'Hubo un error',error };
        }
    }

    public static async getAll() {
        try {
            const order = await prisma.order.findMany({
                include: {

                    // @ts-ignore
                    user: true,
                    buys: true
                },
            }

            );

            return { success: true, order };
        } catch (error) {
            console.log({ error });
            return { sucess: false, error: 'Hubo un error' };
        }
    }

    public static async getById(id: any) {
        try {
            const order = await prisma.order.findUnique({ where: { id } });

            if (!order) return { success: false, error: "No existe el id de order" };


            return { success: true, order };
        } catch (error) {
            console.log({ error });
            return { sucess: false, error: 'Hubo un error' };
        }
    }



    public static async deleteById(id: any) {
        try {
            const deleted = await prisma.order.delete({ where: { id } });

            return { success: true, deleted };
        } catch (error) {
            console.log({ error });
            return { sucess: false, error: 'Hubo un error, creo que el id no es el correcto' };
        }
    }


}