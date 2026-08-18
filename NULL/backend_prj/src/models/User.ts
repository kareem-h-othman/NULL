import { Schema, model, Document } from 'mongoose';

export enum UserRole {
  MEMBER = 'Member',
  TRAINER = 'Trainer',
}

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
}

const userSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      enum: Object.values(UserRole), 
      default: UserRole.MEMBER 
    },
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);