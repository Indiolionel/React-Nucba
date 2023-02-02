import { CategoryService } from "../services/category.services";
import { Request, Response } from 'express';


export class CategoryControllers {

    constructor () {}

    public static async create (req: Request, res: Response) {

        
        const created = await CategoryService.create(req.body);

		res.status(created.success ? 201 : 400).send(created);
    }


    public static async getAll(req: Request, res: Response) {

        const category = await CategoryService.getAll();

		res.status(category.success ? 201 : 400).send(category);
    }

    public static async getById(req: Request, res: Response) {
        const category = await CategoryService.getById(+req.params.id);

        res.status(category.success ? 201 : 400).send(category);
    }
}