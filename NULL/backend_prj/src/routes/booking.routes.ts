import { Router } from "express";
import {
  createBooking,
  cancelBooking,
} from "../controllers/booking.controller";

import { authGuard } from "../middleware/auth";
import { roleGuard } from "../middleware/roles";
import { UserRole } from "../models/User";

import { validateBookingInput } from "../validators/booking.validator";

const router = Router();

router.post(
  "/",
  authGuard,
  roleGuard(UserRole.MEMBER),
  validateBookingInput,
  createBooking
);

router.patch(
  "/:id/cancel",
  authGuard,
  roleGuard(UserRole.MEMBER),
  cancelBooking
);

export default router;