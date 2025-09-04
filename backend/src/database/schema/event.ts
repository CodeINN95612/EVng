import { Schema, model, Document } from 'mongoose';

interface IEvent extends Document {
  name: string;
  description: string;
  date: Date;
  address: string;
  mapsUrl: string;
  state: 'created' | 'published' | 'cancelled' | 'completed';
  images:
    | {
        storage: 'local';
        path: string;
        filename: string;
        mimetype: string;
        size: number;
      }[]
    | null;
  createdBy: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    address: { type: String, required: true },
    mapsUrl: { type: String, required: true },
    images: [
      {
        storage: { type: String, enum: ['local'] },
        path: { type: String },
        filename: { type: String },
        mimetype: { type: String },
        size: { type: Number },
      },
    ],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
    strict: true,
  },
);

const Event = model<IEvent>('Event', eventSchema);

export { Event, IEvent };
