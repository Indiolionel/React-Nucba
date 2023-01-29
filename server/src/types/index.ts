import { User } from "@prisma/client";
import { Request } from "express";


export interface CoreRequest extends Request {

    user: User| string
}