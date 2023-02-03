import { prisma } from "../index";

export class CategoryService {
    constructor() { }

    public static async create(data: any) {
        try {
            const category = await prisma.category.create(
                {
                    data: { ...data },

                });

            return { success: true, category };
        } catch (error) {
            console.log({ error });
            return { sucess: false, mensaje: 'Hubo un error', error };
        }
    }

    public static async getAll() {
        try {
            const categorys = await prisma.category.findMany({
                include: {
                    products: true
                },

            });

            return { success: true, categorys };
        } catch (error) {
            console.log({ error });
            return { sucess: false, error: 'Hubo un error' };
        }
    }

    public static async getById(id: any) {
        try {
            const category = await prisma.category.findUnique(
                { where: { id }, include: { products: true } },
            );
            console.log(category)

            if (!category) return { success: false, error: "No existe el id de categoria" };


            return { success: true, category };
        } catch (error) {
            console.log({ error });
            return { sucess: false, error: 'Hubo un error' };
        }
    }

}