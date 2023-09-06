import { z } from 'zod';
import { allowedLanguages } from './languages';

const priorities = ['low', 'medium', 'high'] as const;
const types = ['todo', 'note'] as const;
const statsTypes = ['newCollection', 'deleteCollection', 'newItem', 'deleteItem', 'shareCollection'] as const;

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

export const collectionSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  color: z.string().length(7),
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
export const statsTypesEnum = z.enum(statsTypes);
export const arrayOfItemsSchema = z.union([z.array(itemSchema).nonempty(), z.null()]).default(null);
export const arrayOfNotesSchema = z.union([z.array(noteSchema).nonempty(), z.null()]).default(null);
export const arrayOfCollectionsSchema = z.union([z.array(collectionSchema).nonempty(), z.null()]).default(null);
export const arrayOfLogsSchema = z.array(logSchema);
export const sharedCollectionDataSchema = z.object({
  col: collectionSchema,
  items: arrayOfItemsSchema.nullable(),
  note: noteSchema.nullable(),
});

export type Item = z.infer<typeof itemSchema>;
export type ItemEntry = Pick<Item, 'colId' | 'message'>;
export type Note = z.infer<typeof noteSchema>;
export type NoteEntry = Pick<Note, 'colId' | 'message'>;
export type Collection = z.infer<typeof collectionSchema>;
export type CollectionEntry = Pick<Collection, 'title' | 'color'>;
export type CollectionType = z.infer<typeof TypeEnum>;
export type ItemPriority = z.infer<typeof PriorityEnum>;
export type Log = z.infer<typeof logSchema>;
export type Settings = z.infer<typeof settingsSchema>;
export type StatsTypes = z.infer<typeof statsTypesEnum>;
export type SharedCollectionData = {
  col: Collection;
  items: Item[] | null;
  note: Note | null;
};
