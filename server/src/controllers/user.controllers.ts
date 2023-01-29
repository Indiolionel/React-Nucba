import { UserService } from "../services/user.services";
import { Request, Response } from 'express';


export class UserControllers {

    constructor () {}

    public static async create (req: Request, res: Response) {

        
        
        const created = await UserService.create(req.body);

		res.status(created.success ? 201 : 400).send(created);
    }

    public static async getById(req: Request, res: Response) {
        const user = await UserService.getById(+req.params.id);

        res.status(user.success ? 201 : 400).send(user);
    }

    public static async getAll(req: Request, res: Response) {
        console.log({req})
        const users = await UserService.getAll();

		res.status(users.success ? 201 : 400).send(users);
    }

    // getOrderByIdUser

    public static async getOrderByIdUser(req: Request, res: Response) {
        const orders = await UserService.getOrderByIdUser(+req.params.id);

        res.status(orders.success ? 201 : 400).send(orders);
    }

    public static async delete(req: Request, res: Response) {
        
        const deleted = await UserService.deleteById(+req.params.id)

        res.status(deleted.success ? 200 : 404).send(deleted);
    }
    
    public static async login(req: Request, res: Response) {
        
        const login = await UserService.login(req.body)

        res.status(login.success ? 200 : 404).send(login);
    }

}