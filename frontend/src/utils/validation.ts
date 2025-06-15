import { z } from 'zod';

export const todoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  shortDescription: z.string().min(1, 'Short Description is required'),
  dateTime: z.string().min(1, 'Date & Time is required'),
}); 