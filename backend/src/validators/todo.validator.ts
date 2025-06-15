import { z } from 'zod';

export const createTodoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  shortDescription: z.string().min(1, 'Short Description is required'),
  dateTime: z.string().datetime({ message: 'Invalid date and time' }),
  done: z.boolean().optional(),
});

export const updateTodoSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  shortDescription: z.string().min(1, 'Short Description is required').optional(),
  dateTime: z.string().datetime({ message: 'Invalid date and time' }).optional(),
  done: z.boolean().optional(),
}); 