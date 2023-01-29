"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const index_1 = require("../index");
const jwt_services_1 = require("./jwt.services");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    constructor() { }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // try {
            //   aca intento obtener el usuario con el email, usando findunique parametro email
            // } catch (error) {
            // si entra aca, no existe el email, por lo tanto:
            console.log("llegada del dato:", data);
            try {
                const emailDuplicate = yield index_1.prisma.user.findUnique({ where: { email: data.email } });
                console.log("emailCoincide:", emailDuplicate);
                if (emailDuplicate)
                    return { sucess: false, error: "El email ya tiene una cuenta creada", code: "auth/email-already-in-use" };
                const salt = yield bcrypt_1.default.genSalt(10);
                const hashPassword = yield bcrypt_1.default.hash(data.password, salt);
                console.log("passwordHash", hashPassword);
                const user = yield index_1.prisma.user.create({ data: Object.assign(Object.assign({}, data), { password: hashPassword }) });
                console.log("userCreado;", user);
                return { success: true, user };
            }
            catch (error) {
                console.log({ error });
                return { sucess: false, error: 'Hubo un error inesperado' };
            }
            // }
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield index_1.prisma.user.findMany({
                    include: {
                        orders: true
                    },
                });
                return { success: true, users };
            }
            catch (error) {
                console.log({ error });
                return { sucess: false, error: 'Hubo un error' };
            }
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield index_1.prisma.user.findMany({ where: { id }, include: { orders: true } });
                return { success: true, user };
            }
            catch (error) {
                console.log({ error });
                return { sucess: false, error: 'Hubo un error' };
            }
        });
    }
    // getOrderByIdUser
    static getOrderByIdUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield index_1.prisma.user.findUnique({
                    where: { id }, include: {
                        orders: {
                            include: { buys: true }
                        },
                    }
                });
                if (!user)
                    return { success: false, error: "Usuario inexistente" };
                return { success: true, orders: user.orders };
            }
            catch (error) {
                console.log({ error });
                return { sucess: false, error: 'Hubo un error' };
            }
        });
    }
    static deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleted = yield index_1.prisma.user.delete({ where: { id } });
                return { success: true, deleted };
            }
            catch (error) {
                console.log({ error });
                return { sucess: false, error: 'Hubo un error, creo que el id no es el correcto' };
            }
        });
    }
    static login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = data;
            try {
                const user = yield index_1.prisma.user.findUnique({ where: { email: data.email } });
                if (!user)
                    return { sucess: false, error: 'No existe el email registrado', code: "auth/user-not-found" };
                // if (data.password !== user.password) return { sucess: false, error: 'Los datos ingresados son incorrectos', code: "auth/wrong-password" }
                const token = jwt_services_1.JWTservice.sign({ id: user.id, email });
                const isMatch = yield bcrypt_1.default.compare(data.password, user.password);
                if (!isMatch) {
                    return { sucess: false, error: 'Los datos ingresados son incorrectos', code: "auth/wrong-password" };
                }
                return { success: true, data: { token, user } };
            }
            catch (error) {
                console.log({ error });
                return { sucess: false, error: 'Hubo un error inesperado' };
            }
        });
    }
}
exports.UserService = UserService;
