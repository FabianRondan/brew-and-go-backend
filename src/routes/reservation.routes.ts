import { Router } from 'express';
import { create, myReservations, listAll, updateStatus } from '../controllers/reservation.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate, create);
router.get('/me', authenticate, myReservations);
router.get('/', authenticate, authorize('ADMIN', 'EMPLEADO'), listAll);
router.patch('/:id/status', authenticate, authorize('ADMIN', 'EMPLEADO'), updateStatus);

export default router;