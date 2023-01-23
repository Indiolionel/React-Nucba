import { Router } from 'express';
import { OrderControllers } from '../controllers/order.controllers';


const router = Router();

router.post('/', OrderControllers.create);
router.get('/', OrderControllers.getAll);
router.get('/:id', OrderControllers.getById);
// router.put('/:id', AuthorsController.updateOne);
router.delete('/:id', OrderControllers.delete);

export default router;
