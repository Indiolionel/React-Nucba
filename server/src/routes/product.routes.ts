import { Router } from 'express';
import { ProductControllers } from '../controllers/product.controllers';


const router = Router();

router.post('/', ProductControllers.create);
// router.get('/',UserControllers.getAll);
// router.get('/:id', UserControllers.getById);
// router.get('/order/:id', UserControllers.getOrderByIdUser);
// router.patch('/:email', UserControllers.updateOne);
// router.delete('/:id', UserControllers.delete);

export default router;
