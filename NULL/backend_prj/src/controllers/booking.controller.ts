import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { Booking, BookingStatus } from "../models/Booking";
import { ClassSession } from "../models/ClassSession";

export const createBooking = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { sessionId } = req.body;
    const memberId = req.user!.userId;

    const session = await ClassSession.findById(sessionId);

    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    if (session.timeSlot <= new Date()) {
      return res.status(400).json({
        message: "Cannot book a session that has already started",
      });
    }

    const existingBooking = await Booking.findOne({
      session: sessionId,
      member: memberId,
      status: BookingStatus.BOOKED,
    });

    if (existingBooking) {
      return res.status(409).json({
        message: "You have already booked this session",
      });
    }

    const bookedCount = await Booking.countDocuments({
      session: sessionId,
      status: BookingStatus.BOOKED,
    });

    if (bookedCount >= session.capacity) {
      return res.status(409).json({
        message: "Session is full",
      });
    }

    const booking = await Booking.create({
      session: sessionId,
      member: memberId,
      status: BookingStatus.BOOKED,
    });

    return res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while creating booking",
      error,
    });
  }
};

export const cancelBooking = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (booking.member.toString() !== req.user!.userId) {
      return res.status(403).json({
        message: "You can only cancel your own bookings",
      });
    }

    if (booking.status === BookingStatus.CANCELLED) {
      return res.status(400).json({
        message: "Booking is already cancelled",
      });
    }

    booking.status = BookingStatus.CANCELLED;

    await booking.save();

    return res.status(200).json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while cancelling booking",
      error,
    });
  }
};