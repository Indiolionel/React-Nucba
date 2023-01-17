import { UserService } from "../services/user.services";
import { Request, Response } from 'express';


export class UserControllers {

    constructor () {}

    public static async create (req: Request, res: Response) {
        const created = await UserService.create(req.body);

		res.status(created.success ? 201 : 400).send(created);
    }

    public static async getById(req: Request, res: Response) {

      

    }

    public static async getAll(req: Request, res: Response) {
        
    }

    public static async delete(req: Request, res: Response) {
        
        const deleted = await UserService.deleteById(+req.params.id)

        res.status(deleted.success ? 200 : 404).send(deleted);
    }
    

}