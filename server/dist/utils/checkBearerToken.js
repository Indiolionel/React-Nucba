"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBearerToken = void 0;
const checkBearerToken = (token) => {
    return token && token.startsWith('Bearer');
};
exports.checkBearerToken = checkBearerToken;
