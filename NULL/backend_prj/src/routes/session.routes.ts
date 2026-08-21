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
  
/**
 * @swagger
 * /api/sessions:
 *   get:
 *     summary: Browse sessions with search & filtering
 *     tags: [Sessions]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema: { type: string }
 *       - in: query
 *         name: trainer
 *         schema: { type: string }
 *       - in: query
 *         name: date
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: minAvailable
 *         schema: { type: integer }
 *     responses:
 *       200: { description: List of sessions with remaining spots }
 */

router.get("/", getSessions);


//------


/**
 * @swagger
 * /api/sessions:
 *   post:
 *     summary: Create a session (Trainer only)
 *     tags: [Sessions]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, timeSlot, capacity]
 *             properties:
 *               title: { type: string }
 *               timeSlot: { type: string, format: date-time }
 *               capacity: { type: integer }
 *     responses:
 *       201: { description: Session created }
 *       400: { description: Validation error }
 *       403: { description: Forbidden, not a Trainer }
 */


router.post('/', authGuard, roleGuard(UserRole.TRAINER), validateSessionInput, createSession);


/**
 * @swagger
 * /api/sessions/{id}:
 *   put:
 *     summary: Update a session (owner Trainer only)
 *     tags: [Sessions]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Session updated }
 *       403: { description: Not your session }
 *       404: { description: Session not found }
 */

router.put('/:id', authGuard, roleGuard(UserRole.TRAINER), validateSessionInput, updateSession);

/**
 * @swagger
 * /api/sessions/{id}:
 *   delete:
 *     summary: Delete a session (owner Trainer only, blocked if active bookings exist)
 *     tags: [Sessions]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Session deleted }
 *       403: { description: Not your session }
 *       404: { description: Session not found }
 *       409: { description: Active bookings exist }
 */

router.delete('/:id', authGuard, roleGuard(UserRole.TRAINER), deleteSession);

export default router;