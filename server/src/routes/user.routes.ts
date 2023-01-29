import { Router } from 'express';
import { UserControllers } from '../controllers/user.controllers';
import { getTokenFromRequest } from '../middleware/getToken';


const router = Router();

router.post('/', UserControllers.create);
// @ts-ignore
router.get('/',getTokenFromRequest, UserControllers.getAll);
router.post('/login',UserControllers.login)
router.get('/:id', UserControllers.getById);
router.get('/order/:id', UserControllers.getOrderByIdUser);
// router.put('/:id', AuthorsController.updateOne);
router.delete('/:id', UserControllers.delete);

export default router;
