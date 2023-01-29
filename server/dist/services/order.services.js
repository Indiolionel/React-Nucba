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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const index_1 = require("../index");
class OrderService {
    constructor() { }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { shipping, userId, buys } = data;
            try {
                const order = yield index_1.prisma.order.create({
                    data: {
                        shipping,
                        userId,
                        buys: { createMany: { data: [...buys] } }
                    },
                });
                return { success: true, order };
            }
            catch (error) {
                console.log({ error });
                return { sucess: false, mensaje: 'Hubo un error', error };
            }
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield index_1.prisma.order.findMany({
                    include: {
                        // @ts-ignore
                        user: true,
                        buys: true
                    },
                });
                return { success: true, order };
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
                const order = yield index_1.prisma.order.findMany({ where: { id } });
                return { success: true, order };
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
                const deleted = yield index_1.prisma.order.delete({ where: { id } });
                return { success: true, deleted };
            }
            catch (error) {
                console.log({ error });
                return { sucess: false, error: 'Hubo un error, creo que el id no es el correcto' };
            }
        });
    }
}
exports.OrderService = OrderService;
