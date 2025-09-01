import { Schema, model, Document } from 'mongoose';
import { IRefreshToken, RefreshToken } from './refreshToken';

interface IUser extends Document {
  username: string;
  email: string;
  passwordHash: string;
  salt: string;
  createdAt: Date;
  updatedAt: Date;
  refreshTokens: IRefreshToken[];
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
      minlength: 6,
    },
    salt: {
      type: String,
      required: true,
    },
    refreshTokens: [RefreshToken.schema],
  },
  {
    timestamps: true,
    strict: true,
  },
);

export const User = model<IUser>('User', userSchema);
export type { IUser };
