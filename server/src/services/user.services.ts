import { prisma } from "../index";

export class UserService {
    constructor() { }

    public static async create(data: any) {
        // try {
        //   aca intento obtener el usuario con el email, usando findunique parametro email
        // } catch (error) {
        // si entra aca, no existe el email, por lo tanto:
        console.log("llegada del dato:", data)


        try {
            const emailDuplicate = await prisma.user.findUnique({ where: { email: data.email } });
            console.log("emailCoincide:",emailDuplicate)
            if (emailDuplicate) return { sucess: false, error: "El email ya tiene una cuenta creada", code: "auth/email-already-in-use" };


            const user = await prisma.user.create({ data: { ...data } });

            console.log("userCreado;", user)

            return { success: true, user };
        } catch (error) {
            console.log({ error });
            return { sucess: false, error: 'Hubo un error inesperado' };
        }
        // }
    }

    public static async getAll() {
        try {
            const users = await prisma.user.findMany({
                include: {
                    orders: true
                },
            });

            return { success: true, users };
        } catch (error) {
            console.log({ error });
            return { sucess: false, error: 'Hubo un error' };
        }
    }

    public static async getById(id: any) {
        try {
            const user = await prisma.user.findMany(
                { where: { id }, include: { orders: true } },

            );

            return { success: true, user };
        } catch (error) {
            console.log({ error });
            return { sucess: false, error: 'Hubo un error' };
        }
    }

    // getOrderByIdUser

  public static async getOrderByIdUser(id: any) {
        try {
            const user = await prisma.user.findUnique(
                { where: { id }, include: { 
                    orders: {
                        include:{buys:true}
                    },
                    
                } }

            );
            if (!user) return { success: false, error:"Usuario inexistente" }; 

            return { success: true, orders: user.orders }; 
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

    public static async login(data: any) {
        console.log("DataLogin:", data)
        try {
            const user = await prisma.user.findUnique({ where: { email: data.email } });
            if (!user) return { sucess: false, error: 'No existe el email registrado', code: "auth/user-not-found" };

            if (data.password !== user.password) return { sucess: false, error: 'Los datos ingresados son incorrectos', code: "auth/wrong-password" }

            return { success: true, user };
        } catch (error) {
            console.log({ error });
            return { sucess: false, error: 'Hubo un error inesperado' };
        }
    }

}