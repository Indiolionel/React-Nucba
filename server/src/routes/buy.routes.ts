import { Router } from 'express';
import { BuyControllers } from '../controllers/buy.controllers';


const router = Router();

router.post('/', BuyControllers.create);
router.get('/', BuyControllers.getAll);
router.get('/:id', BuyControllers.getById);
// router.put('/:id', AuthorsController.updateOne);
router.delete('/:id', BuyControllers.delete);

export default router;
