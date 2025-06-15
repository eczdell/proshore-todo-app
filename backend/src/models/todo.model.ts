import { Schema, model, Document } from 'mongoose';

export interface ITodo extends Document {
  name: string;
  shortDescription: string;
  dateTime: Date;
  done: boolean;
}

const todoSchema = new Schema<ITodo>({
  name: { type: String, required: true },
  shortDescription: { type: String, required: true },
  dateTime: { type: Date, required: true },
  done: { type: Boolean, default: false },
});

export default model<ITodo>('Todo', todoSchema); 