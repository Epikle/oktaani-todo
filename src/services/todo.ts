import axios, { GenericAbortSignal } from 'axios';
import { nanoid } from 'nanoid';
import { ZodTypeAny } from 'zod';

import * as types from '../utils/types';
import env from '../utils/env';

const api = axios.create({
  baseURL: env.API_URL,
});

export const getSharedLogs = async (colId: string): Promise<types.Log[]> => {
  const { data } = await api.get<unknown>(`/log/${colId}`);
  const validLogs = types.arrayOfLogsSchema.parse(data);
  return validLogs;
};

export const getSharedCollection = async (colId: string): Promise<types.SharedCollectionData> => {
  const { data } = await api.get<unknown>(`/share/${colId}`);
  const validCollection = types.sharedCollectionDataSchema.parse(data);
  return validCollection;
};

export const createSharedCollection = async (
  collectionData: types.SharedCollectionData,
  signal: GenericAbortSignal,
): Promise<void> => {
  await api.post('/share', collectionData, { signal });
};

export const updateSharedCollection = async (collectionData: types.SharedCollectionData): Promise<void> => {
  await api.put(`/share/${collectionData.col.id}`, collectionData);
};

export const deleteSharedCollection = async (colId: string, signal?: GenericAbortSignal): Promise<void> => {
  await api.delete(`/share/${colId}`, { signal });
};

export const saveToLocalStorage = <T>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocalStorage = <T>(key: string, schema: ZodTypeAny): T => {
  const data = localStorage.getItem(key) || 'null';
  const parsedData = JSON.parse(data) as unknown;
  const validData = schema.parse(parsedData);
  return validData;
};

export const createCollectionEntry = (entry: types.CollectionEntry): types.Collection => {
  const newCollection = {
    id: nanoid(),
    ...entry,
  };
  const validCollection = types.collectionSchema.parse(newCollection);
  return validCollection;
};

export const createItemEntry = (entry: types.ItemEntry): types.Item => {
  const newItem = {
    id: nanoid(),
    ...entry,
  };
  const validItem = types.itemSchema.parse(newItem);
  return validItem;
};

export const createNoteEntry = (entry: types.NoteEntry): types.Note => {
  const newNote = {
    id: nanoid(),
    ...entry,
  };
  const validNote = types.noteSchema.parse(newNote);
  return validNote;
};
