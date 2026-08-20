import { Router } from 'express';
import { createSession, updateSession, deleteSession } from '../controllers/session.controller';
import { authGuard } from '../middleware/auth';
import { roleGuard } from '../middleware/roles';
import { UserRole } from '../models/User';
import { validateSessionInput } from '../validators/session.validator';

//Person 3 adustment 

import { getSessions } from "../controllers/session.controller";
//------

const router = Router();


//Person 3 adustment 

router.get("/", getSessions);

//------
router.post('/', authGuard, roleGuard(UserRole.TRAINER), validateSessionInput, createSession);
router.put('/:id', authGuard, roleGuard(UserRole.TRAINER), validateSessionInput, updateSession);
router.delete('/:id', authGuard, roleGuard(UserRole.TRAINER), deleteSession);

export default router;