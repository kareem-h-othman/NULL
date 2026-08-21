
// export default router;

import { Router } from 'express';
import { register, login, logout } from '../controllers/auth.controller';

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [fullName, email, password]
 *             properties:
 *               fullName: { type: string }
 *               email: { type: string }
 *               password: { type: string }
 *               role: { type: string, enum: [Member, Trainer] }
 *     responses:
 *       201: { description: User registered successfully }
 *       400: { description: Missing fields or user already exists }
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in and receive a JWT via httpOnly cookie
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200: { description: Login successful, token set as httpOnly cookie }
 *       400: { description: Invalid credentials }
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Log out and clear the auth cookie
 *     tags: [Auth]
 *     responses:
 *       200: { description: Logged out successfully }
 */
router.post('/logout', logout);

export default router;