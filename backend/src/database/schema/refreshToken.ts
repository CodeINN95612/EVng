import { Schema, model, Document } from 'mongoose';

interface IRefreshToken extends Document {
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

const refreshTokenSchema = new Schema<IRefreshToken>(
  {
    token: { type: String, required: true, index: true },
    expiresAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
);

const RefreshToken = model<IRefreshToken>('RefreshToken', refreshTokenSchema);

export { RefreshToken, IRefreshToken };
