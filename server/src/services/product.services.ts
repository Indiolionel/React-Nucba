import { prisma } from "../index";

export class ProductService {
    constructor() { }

    public static async create(data: any) {
        try {
            const product = await prisma.product.create(
                {
                    data: { ...data   }

                });

            return { success: true, product };
        } catch (error) {
            console.log({ error });
            return { sucess: false, mensaje: 'Hubo un error',error };
        }
    }



}