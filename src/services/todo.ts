import axios from 'axios';
import { nanoid } from 'nanoid';

import env from '../utils/env';
import { Collection, Item, Log, arrayOfCollectionsSchema, arrayOfLogsSchema, collectionSchema } from '../utils/types';

const api = axios.create({
  baseURL: env.API_URL,
});

export const getSharedCollectionLogData = async (colId: string): Promise<Log[]> => {
  const { data } = await api.get<unknown>(`/log/${colId}`);
  const validLogs = arrayOfLogsSchema.parse(data);
  return validLogs;
};

export const getSharedCollectionData = async (colId: string): Promise<Collection> => {
  const { data } = await api.get<unknown>(`/share/${colId}`);
  const validCollection = collectionSchema.parse(data);
  return validCollection;
};

export const createSharedCollection = async (collection: Collection) => {
  await api.post<Collection>('/share', { ...collection, shared: true });
};

export const updateSharedCollection = async (collection: Collection) => {
  await api.put<Collection>(`/share/${collection.id}`, collection);
};

export const deleteSharedCollection = async (colId: string) => {
  await api.delete(`/share/${colId}`);
};

export const saveCollectionsToLS = (collections: Collection[]) => {
  localStorage.setItem(env.LS_NAME_TODOS, JSON.stringify(collections));
};

export const getTodosFromLS = (): Collection[] => {
  const data = localStorage.getItem(env.LS_NAME_TODOS) || '';
  const validCollections = arrayOfCollectionsSchema.parse(JSON.parse(data));
  return validCollections;
};

export const createCollectionEntry = (entry, type): Collection => ({
  shared: false,
  todos: [],
  note: '',
  created: Date(),
  id: nanoid(),
  type,
  ...entry,
});

export const createItemEntry = (entry): Item => ({
  id: nanoid(),
  done: false,
  created: Date(),
  ...entry,
});
