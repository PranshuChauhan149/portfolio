import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
  read: boolean;
}

const messageSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    trim: true,
    match: [/^[\w\.-]+@[\w\.-]+\.\w+$/, 'Please provide a valid email'],
  },
  subject: {
    type: String,
    required: [true, 'Please provide a subject'],
    trim: true,
    minlength: [3, 'Subject must be at least 3 characters'],
  },
  message: {
    type: String,
    required: [true, 'Please provide a message'],
    trim: true,
    minlength: [15, 'Message must be at least 15 characters'],
  },
  read: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Message || mongoose.model<IMessage>('Message', messageSchema);
