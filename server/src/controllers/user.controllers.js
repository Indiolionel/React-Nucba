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
exports.UserControllers = void 0;
const user_services_1 = require("../services/user.services");
class UserControllers {
    constructor() { }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const created = yield user_services_1.UserService.create(req.body);
            res.status(created.success ? 201 : 400).send(created);
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_services_1.UserService.getById(+req.params.id);
            res.status(user.success ? 201 : 400).send(user);
        });
    }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log({ req });
            const users = yield user_services_1.UserService.getAll();
            res.status(users.success ? 201 : 400).send(users);
        });
    }
    // getOrderByIdUser
    static getOrderByIdUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield user_services_1.UserService.getOrderByIdUser(+req.params.id);
            res.status(orders.success ? 201 : 400).send(orders);
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield user_services_1.UserService.deleteById(+req.params.id);
            res.status(deleted.success ? 200 : 404).send(deleted);
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const login = yield user_services_1.UserService.login(req.body);
            res.status(login.success ? 200 : 404).send(login);
        });
    }
}
exports.UserControllers = UserControllers;
