import { z } from 'zod';

export const itemSchema = z.object({
  colId: z.string().min(1),
  id: z.string().min(1),
  text: z.string().min(1),
  done: z.boolean().default(false),
  priority: z.enum(['low', 'medium', 'high']).default('low'),
  created: z.date().default(new Date()),
});

const prioritySchema = itemSchema.shape.priority;

export const noteSchema = z.object({
  colId: z.string().min(1),
  id: z.string().min(1),
  text: z.string().min(1),
  created: z.date().default(new Date()),
});

export const collectionSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  color: z.string().min(7),
  shared: z.boolean().default(false),
  type: z.optional(z.enum(['todo', 'note'])),
  created: z.date().default(new Date()),
});

export type Item = z.infer<typeof itemSchema>;
export type Note = z.infer<typeof noteSchema>;
export type Collection = z.infer<typeof collectionSchema>;
export type ItemPriority = z.infer<typeof prioritySchema>;
