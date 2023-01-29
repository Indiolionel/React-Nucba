import { OrderService } from "../services/order.services";
import { Request, Response } from 'express';


export class OrderControllers {

    constructor () {}

    public static async create (req: Request, res: Response) {
        const created = await OrderService.create(req.body);

		res.status(created.success ? 201 : 400).send(created);
    }

    public static async getById(req: Request, res: Response) {
        const user = await OrderService.getById(+req.params.id);

        res.status(user.success ? 201 : 400).send(user);
    }

    public static async getAll(req: Request, res: Response) {
        const users = await OrderService.getAll();

		res.status(users.success ? 201 : 400).send(users);
    }

    public static async delete(req: Request, res: Response) {
        
        const deleted = await OrderService.deleteById(+req.params.id)

        res.status(deleted.success ? 200 : 404).send(deleted);
    }
    

}