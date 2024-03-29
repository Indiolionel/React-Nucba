import { ProductService } from "../services/product.services";
import { Request, Response } from 'express';


export class ProductControllers {

    constructor () {}

    public static async create (req: Request, res: Response) {

        
        const created = await ProductService.create(req.body);

		res.status(created.success ? 201 : 400).send(created);
    }

    public static async updateById (req: Request, res: Response) {

        
        const created = await ProductService.updateById(+req.params.id,req.body);

		res.status(created.success ? 201 : 400).send(created);
    }

}