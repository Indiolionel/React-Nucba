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
exports.BuyService = void 0;
const index_1 = require("../index");
class BuyService {
    constructor() { }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const buy = yield index_1.prisma.buy.create({
                    data: Object.assign({}, data)
                });
                return { success: true, buy };
            }
            catch (error) {
                console.log({ error });
                return { sucess: false, error: 'Hubo un error' };
            }
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const buy = yield index_1.prisma.buy.findMany();
                return { success: true, buy };
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
                const buy = yield index_1.prisma.buy.findMany({ where: { id } });
                return { success: true, buy };
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
                const deleted = yield index_1.prisma.buy.delete({ where: { id } });
                return { success: true, deleted };
            }
            catch (error) {
                console.log({ error });
                return { sucess: false, error: 'Hubo un error, creo que el id no es el correcto' };
            }
        });
    }
}
exports.BuyService = BuyService;
