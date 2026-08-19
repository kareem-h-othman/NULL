import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { ClassSession } from '../models/ClassSession';
import { Booking } from '../models/Booking';

export const createSession = async (req: AuthRequest, res: Response) => {
  try {
    const { title, timeSlot, capacity } = req.body;
    const session = await ClassSession.create({
      title,
      timeSlot,
      capacity,
      trainer: req.user!.userId,
    });

    return res.status(201).json({ message: 'Session created', session });
  } 
  catch (error) {
    return res.status(500).json({ message: 'Server error creating session', error });
  }
};

export const updateSession = async (req: AuthRequest, res: Response) => {
  try {
    const session = await ClassSession.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    if (session.trainer.toString() !== req.user!.userId) {
      return res.status(403).json({ message: 'Forbidden: not your session' });
    }

    const { title, timeSlot, capacity } = req.body;
    if (title) session.title = title;
    if (timeSlot) session.timeSlot = timeSlot;
    if (capacity) session.capacity = capacity;

    await session.save();
    return res.status(200).json({ message: 'Session updated', session });
  } 
  catch (error) {
    return res.status(500).json({ message: 'Server error updating session', error });
  }
};

export const deleteSession = async (req: AuthRequest, res: Response) => {
  try {
    const session = await ClassSession.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    if (session.trainer.toString() !== req.user!.userId) {
      return res.status(403).json({ message: 'Forbidden: not your session' });
    }

    const activeBookings = await Booking.countDocuments({
      session: session._id,     
      status: 'booked',         
    });
    if (activeBookings > 0) {
      return res.status(409).json({ message: 'Cannot delete session with active bookings' });
    }
    await ClassSession.findByIdAndDelete(session._id);
    return res.status(200).json({ message: 'Session deleted' });
  } 
  catch (error) {
    return res.status(500).json({ message: 'Server error deleting session', error });
  }
};