import { z } from 'zod';

export const itemSchema = z.object({
  colId: z.string().min(1),
  id: z.string().min(1),
  message: z.string().min(1),
  status: z.boolean().default(false),
  priority: z.enum(['low', 'medium', 'high']).default('low'),
  createdAt: z.date().default(new Date()),
});

export const noteSchema = z.object({
  colId: z.string().min(1),
  id: z.string().min(1),
  message: z.string().min(1),
  createdAt: z.date().default(new Date()),
});

export const collectionSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  color: z.string().min(7),
  shared: z.boolean().default(false),
  type: z.optional(z.enum(['todo', 'note'])),
  createdAt: z.date().default(new Date()),
});

export const logSchema = z.object({
  colId: z.string().min(1),
  id: z.string().min(1),
  message: z.string().min(1),
  createdAt: z.date().default(new Date()),
});

const prioritySchema = itemSchema.shape.priority;

export const arrayOfItemsSchema = z.array(itemSchema);
export const arrayOfNotesSchema = z.array(noteSchema);
export const arrayOfCollectionsSchema = z.array(collectionSchema);
export const arrayOfLogsSchema = z.array(logSchema);

export type Item = z.infer<typeof itemSchema>;
export type Note = z.infer<typeof noteSchema>;
export type Collection = z.infer<typeof collectionSchema>;
export type ItemPriority = z.infer<typeof prioritySchema>;
export type Log = z.infer<typeof logSchema>;
