import axios from 'axios';
import { nanoid } from 'nanoid';
import { ZodTypeAny } from 'zod';

import env from '../utils/env';
import {
  Collection,
  CollectionEntry,
  Item,
  ItemEntry,
  Log,
  Note,
  NoteEntry,
  arrayOfLogsSchema,
  collectionSchema,
  itemSchema,
  noteSchema,
} from '../utils/types';

const api = axios.create({
  baseURL: env.API_URL,
});

export const getSharedLogs = async (colId: string): Promise<Log[]> => {
  const { data } = await api.get<unknown>(`/log/${colId}`);
  const validLogs = arrayOfLogsSchema.parse(data);
  return validLogs;
};

export const getSharedCollection = async (colId: string): Promise<Collection> => {
  const { data } = await api.get<unknown>(`/share/${colId}`);
  const validCollection = collectionSchema.parse(data);
  return validCollection;
};

export const createSharedCollection = async (collection: Collection): Promise<void> => {
  await api.post<Collection>('/share', { ...collection, shared: true });
};

export const updateSharedCollection = async (collection: Collection): Promise<void> => {
  await api.put<Collection>(`/share/${collection.id}`, collection);
};

export const deleteSharedCollection = async (colId: string): Promise<void> => {
  await api.delete(`/share/${colId}`);
};

export const saveToLocalStorage = <T>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocalStorage = <T>(key: string, schema: ZodTypeAny): T => {
  const data = localStorage.getItem(key) || '';
  const parsedData = JSON.parse(data) as unknown;
  const validData = schema.parse(parsedData);
  return validData;
};

export const createCollectionEntry = (entry: CollectionEntry): Collection => {
  const newCollection = {
    id: nanoid(),
    ...entry,
  };
  const validCollection = collectionSchema.parse(newCollection);
  return validCollection;
};

export const createItemEntry = (entry: ItemEntry): Item => {
  const newItem = {
    id: nanoid(),
    ...entry,
  };
  const validItem = itemSchema.parse(newItem);
  return validItem;
};

export const createNoteEntry = (entry: NoteEntry): Note => {
  const newNote = {
    id: nanoid(),
    ...entry,
  };
  const validNote = noteSchema.parse(newNote);
  return validNote;
};
