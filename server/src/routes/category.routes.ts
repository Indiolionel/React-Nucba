import { Router } from 'express';
import { CategoryControllers } from '../controllers/category.controllers';


const router = Router();

router.post('/', CategoryControllers.create);
router.get('/', CategoryControllers.getAll);
router.get('/:id', CategoryControllers.getById);
// router.get('/order/:id', CategoryControllers.getOrderByIdCategory);
// router.patch('/:email', CategoryControllers.updateOne);
// router.delete('/:id', CategoryControllers.delete);

export default router;
