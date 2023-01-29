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
exports.BuyControllers = void 0;
const buy_services_1 = require("../services/buy.services");
class BuyControllers {
    constructor() { }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const created = yield buy_services_1.BuyService.create(req.body);
            res.status(created.success ? 201 : 400).send(created);
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield buy_services_1.BuyService.getById(+req.params.id);
            res.status(user.success ? 201 : 400).send(user);
        });
    }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield buy_services_1.BuyService.getAll();
            res.status(users.success ? 201 : 400).send(users);
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield buy_services_1.BuyService.deleteById(+req.params.id);
            res.status(deleted.success ? 200 : 404).send(deleted);
        });
    }
}
exports.BuyControllers = BuyControllers;
