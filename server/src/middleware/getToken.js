"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenFromRequest = void 0;
const jwt_services_1 = require("../services/jwt.services");
const checkBearerToken_1 = require("../utils/checkBearerToken");
const getTokenFromRequest = (req, res, next) => {
    const { headers } = req;
    const { authorization } = headers;
    try {
        const isBearer = (0, checkBearerToken_1.checkBearerToken)(authorization);
        if (!isBearer || !authorization) {
            console.log('El token es invalido');
            return res.status(403).send({ error: 'No existe token en el Bearer' });
        }
        // Bearer 
        const { 1: token } = authorization.split(' ');
        if (!token) {
            console.log('No existe token en el Bearer');
            // return { sucess: false, error: 'No existe token en el Bearer' };
            return res.status(403).send({ error: 'No existe token en el Bearer' });
        }
        // Bearer 1
        const payload = jwt_services_1.JWTservice.verify(token);
        const { id } = payload;
        console.log({ payload });
        req.user = id;
        next();
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.getTokenFromRequest = getTokenFromRequest;
