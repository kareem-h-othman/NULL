import { Request, Response, NextFunction } from "express";

export const validateBookingInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({
      message: "sessionId is required",
    });
  }

  next();
};