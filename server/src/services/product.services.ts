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
    public static async updateById(id:any,data: any) {
        try {
            const product = await prisma.product.findUnique(
                { where: { id } },
            );
            if (!product) return { success: false, error: 'No existe un producto con ese Id' };

            const modified = await prisma.product.update({
				where: { id },
				data: { ...data ,stock: data.stock }
                //id, stock: stockNew
			});

            return { success: true, modified };
        } catch (error) {
            console.log({ error });
            return { sucess: false, mensaje: 'Hubo un error',error };
        }
    }

}

