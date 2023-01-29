"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const buy_routes_1 = __importDefault(require("./routes/buy.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.prisma = new client_1.PrismaClient();
const server = (0, express_1.default)();
const port = process.env.PORT;
server.use(express_1.default.json());
server.use((0, cors_1.default)());
server.use('/user', user_routes_1.default);
server.use('/order', order_routes_1.default);
server.use('/buy', buy_routes_1.default);
server.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
});
