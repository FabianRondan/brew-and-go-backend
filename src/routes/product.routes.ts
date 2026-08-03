import { Router } from 'express';
import { list, getOne, create, update, remove, createVariant } from '../controllers/product.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', list);
router.get('/:id', getOne);
router.post('/', authenticate, authorize('ADMIN'), create);
router.put('/:id', authenticate, authorize('ADMIN'), update);
router.delete('/:id', authenticate, authorize('ADMIN'), remove);
router.post('/:id/variants', authenticate, authorize('ADMIN'), createVariant);

export default router;