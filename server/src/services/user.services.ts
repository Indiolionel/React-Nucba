import { prisma } from "../index";
import { JWTservice } from "./jwt.services";
import bcrypt from 'bcrypt'





export class UserService {
    constructor() { }

    public static async create(data: any) {
      
        try {
            const emailDuplicate = await prisma.user.findUnique({ where: { email: data.email } });
            if (emailDuplicate) return { sucess: false, error: "El email ya tiene una cuenta creada", code: "auth/email-already-in-use" };

            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(data.password, salt)
            const user = await prisma.user.create({ data: { ...data, password: hashPassword } });

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
            const user = await prisma.user.findUnique(
                { where: { id }, include: { orders: true } },
            );
            if (!user) return { sucess: false, error: 'No existe ese id de usuario' };

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
                {
                    where: { id }, include: {
                        orders: {
                            include: { buys: true }
                        },

                    }
                }
            );
            if (!user) return { success: false, error: "Usuario inexistente" };

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

        const { email } = data

        try {
            const user = await prisma.user.findUnique({ where: { email: data.email } });
            if (!user) return { sucess: false, error: 'No existe el email registrado', code: "auth/user-not-found" };

            // if (data.password !== user.password) return { sucess: false, error: 'Los datos ingresados son incorrectos', code: "auth/wrong-password" }

            const token = JWTservice.sign({ id: user.id, email })
            const isMatch = await bcrypt.compare(data.password, user.password)

            if (!isMatch) {
                return { sucess: false, error: 'Los datos ingresados son incorrectos', code: "auth/wrong-password" }
            }

            return { success: true, data: { token, user } };
        } catch (error) {
            console.log({ error });
            return { sucess: false, error: 'Hubo un error inesperado' };
        }
    }

   
    public static async updateOne(email: string, data: any) {
        try {
			const user = await prisma.user.findUnique(
                { where: { email } },
            );
			if (!user) return { success: false, error: 'No existe una cuenta con ese email' };
            const {id} = user
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(data.password, salt)
			const modified = await prisma.user.update({
				where: { id },
				data: { ...data ,password:hashPassword }
			});
			return { success: true, modified };
		} catch (error) {
			console.log({ error });
			return { success: false, error: 'Hubo un error' };
		}
    }
 

}