import { Router } from 'express';
import { createSession, updateSession, deleteSession } from '../controllers/session.controller';
import { authGuard } from '../middleware/auth';
import { roleGuard } from '../middleware/roles';
import { UserRole } from '../models/User';
import { validateSessionInput } from '../validators/session.validator';

const router = Router();

router.post('/', authGuard, roleGuard(UserRole.TRAINER), validateSessionInput, createSession);
router.put('/:id', authGuard, roleGuard(UserRole.TRAINER), validateSessionInput, updateSession);
router.delete('/:id', authGuard, roleGuard(UserRole.TRAINER), deleteSession);

export default router;