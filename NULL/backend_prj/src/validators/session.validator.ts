import { Request, Response, NextFunction } from 'express';

export const validateSessionInput = (req: Request, res: Response, next: NextFunction) => {
  const { title, timeSlot, capacity } = req.body;
  if (!title || !timeSlot || capacity === undefined) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
if (!Number.isInteger(capacity) || capacity <= 0) {
    return res.status(400).json({ message: 'Capacity must be a positive integer' });
  }
 const slotDate = new Date(timeSlot);
if (isNaN(slotDate.getTime()) || slotDate <= new Date()) {
    return res.status(400).json({ message: 'Time slot must be a valid future date' });
  }
  next();
};