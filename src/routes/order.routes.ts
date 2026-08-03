import { Router } from 'express';
import { create, myOrders, listAll, updateStatus } from '../controllers/order.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate, create);
router.get('/me', authenticate, myOrders);
router.get('/', authenticate, authorize('ADMIN', 'EMPLEADO'), listAll);
router.patch('/:id/status', authenticate, authorize('ADMIN', 'EMPLEADO'), updateStatus);

export default router;