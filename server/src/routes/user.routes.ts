import { Router } from 'express';
import { UserControllers } from '../controllers/user.controllers';


const router = Router();

router.post('/', UserControllers.create);
router.get('/', UserControllers.getAll);
router.get('/:id', UserControllers.getById);
// router.put('/:id', AuthorsController.updateOne);
router.delete('/:id', UserControllers.delete);

export default router;
