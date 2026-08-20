import { Schema, model, Document, Types } from "mongoose";

export enum BookingStatus {
  BOOKED = "booked",
  CANCELLED = "cancelled",
}

export interface IBooking extends Document {
  session: Types.ObjectId;
  member: Types.ObjectId;
  status: BookingStatus;
}

const bookingSchema = new Schema<IBooking>(
  {
    session: {
      type: Schema.Types.ObjectId,
      ref: "ClassSession",
      required: true,
    },

    member: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(BookingStatus),
      default: BookingStatus.BOOKED,
      required: true,
    },
  },
  { timestamps: true }
);

export const Booking = model<IBooking>("Booking", bookingSchema);