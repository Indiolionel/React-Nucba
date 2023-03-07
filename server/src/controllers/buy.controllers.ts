import { BuyService } from "../services/buy.services";
import { Request, Response } from 'express';


export class BuyControllers {

    
    constructor () {}

    public static async create (req: Request, res: Response) {
        const created = await BuyService.create(req.body);

		res.status(created.success ? 201 : 400).send(created);
    }

    public static async getById(req: Request, res: Response) {
        const user = await BuyService.getById(+req.params.id);

        res.status(user.success ? 201 : 400).send(user);
    }

    public static async getAll(req: Request, res: Response) {
        const users = await BuyService.getAll();

		res.status(users.success ? 201 : 400).send(users);
    }

    public static async delete(req: Request, res: Response) {
        
        const deleted = await BuyService.deleteById(+req.params.id)

        res.status(deleted.success ? 200 : 404).send(deleted);
    }
    

}