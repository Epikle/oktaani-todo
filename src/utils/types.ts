import { z } from 'zod';
import { allowedLanguages } from './languages';

const priorities = ['low', 'medium', 'high'] as const;
export const itemSchema = z.object({
  colId: z.string().min(1),
  id: z.string().min(1),
  message: z.string().min(1),
  status: z.boolean().default(false),
  priority: z.enum(priorities).default('low'),
  createdAt: z.string().datetime().default(new Date().toISOString()),
});

export const noteSchema = z.object({
  colId: z.string().min(1),
  id: z.string().min(1),
  message: z.string().min(1),
  createdAt: z.string().datetime().default(new Date().toISOString()),
});

const types = ['todo', 'note'] as const;
export const collectionSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  color: z.string().min(7),
  shared: z.boolean().default(false),
  type: z.optional(z.enum(types)),
  createdAt: z.string().datetime().default(new Date().toISOString()),
});

export const logSchema = z.object({
  colId: z.string().min(1),
  id: z.string().min(1),
  message: z.string().min(1),
  createdAt: z.string().datetime().default(new Date().toISOString()),
});

export const settingsSchema = z.object({
  languageName: z.enum(allowedLanguages).default('en-us'),
  darkMode: z.boolean().default(false),
  sort: z.boolean().default(false),
  help: z.boolean().default(false),
});

export const PriorityEnum = z.enum(priorities);
export const TypeEnum = z.enum(types);

export const arrayOfItemsSchema = z.array(itemSchema);
export const arrayOfNotesSchema = z.array(noteSchema);
export const arrayOfCollectionsSchema = z.array(collectionSchema);
export const arrayOfLogsSchema = z.array(logSchema);

export type Item = z.infer<typeof itemSchema>;
export type ItemEntry = Pick<Item, 'colId' | 'message'>;
export type Note = z.infer<typeof noteSchema>;
export type Collection = z.infer<typeof collectionSchema>;
export type CollectionEntry = Pick<Collection, 'title' | 'color'>;
export type CollectionType = z.infer<typeof TypeEnum>;
export type ItemPriority = z.infer<typeof PriorityEnum>;
export type Log = z.infer<typeof logSchema>;
export type Settings = z.infer<typeof settingsSchema>;
