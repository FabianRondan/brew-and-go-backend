import { Router } from 'express';
import { list, create, remove } from '../controllers/category.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', list);
router.post('/', authenticate, authorize('ADMIN'), create);
router.delete('/:id', authenticate, authorize('ADMIN'), remove);

export default router;