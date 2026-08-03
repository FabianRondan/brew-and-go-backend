import { Router } from 'express';
import { list, create } from '../controllers/table.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', list);
router.post('/', authenticate, authorize('ADMIN'), create);

export default router;