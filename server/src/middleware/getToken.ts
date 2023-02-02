import { NextFunction, Request, Response } from "express";
import { JWTservice } from "../services/jwt.services";
import { checkBearerToken } from "../utils/checkBearerToken";
import { CoreRequest } from "../types";

export const getTokenFromRequest = (req: CoreRequest, res: Response, next:
    NextFunction) => {
    const { headers } = req;
    const { authorization } = headers

    try {
        const isBearer = checkBearerToken(authorization)

        if (!isBearer || !authorization) {
          return  res.status(403).send({error:'No existe token en el Bearer'});        }

        // Bearer 
        const { 1: token } = authorization.split(' ')

        if (!token) {
            return res.status(403).send({error:'No existe token en el Bearer'});
        }

        
        // Bearer 1

        const payload = JWTservice.verify(token)
        const {id} = payload

        req.user = id

        next()

    } catch (error) {
        console.log(error)
        next(error)
    }


}