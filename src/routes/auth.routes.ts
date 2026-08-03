import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { authenticate, AuthRequest } from '../middlewares/auth.middleware';
import { Response } from 'express';

const router = Router();

router.post('/register', register);
router.post('/login', login);

router.get('/me', authenticate, (req: AuthRequest, res: Response) => {
  res.json({ user: req.user });
});

export default router;