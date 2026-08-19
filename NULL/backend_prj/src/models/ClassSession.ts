import { Schema, model, Document, Types } from 'mongoose';

export interface IClassSession extends Document {
  title: string;
  trainer: Types.ObjectId;
  timeSlot: Date;
  capacity: number;
}

const classSessionSchema = new Schema<IClassSession>(
  {
    title: { type: String, required: true, trim: true },
    trainer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    timeSlot: { type: Date, required: true },
    capacity: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);

export const ClassSession = model<IClassSession>('ClassSession', classSessionSchema);