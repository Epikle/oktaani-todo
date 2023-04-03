import axios from 'axios';
import { nanoid } from 'nanoid';

import type { TCollection, TItem, TItemEntry, TNewCollectionEntry } from '../types';
import { isValidCollections } from '../utils/utils';

const LS_NAME = import.meta.env.VITE_LS_NAME_TODOS;
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getSharedCollectionData = async (id: string) => {
  const { data } = await api.get<TCollection>(`/share/${id}`);
  return data;
};

export const createSharedCollection = async (collection: TCollection) => {
  await api.post('/share', { ...collection, shared: true });
};

export const updateSharedCollection = async (collection: TCollection) => {
  await api.put(`/share/${collection.id}`, collection);
};

export const deleteSharedCollection = async (id: string) => {
  await api.delete(`/share/${id}`);
};

export const saveCollectionsToLS = (collections: TCollection[]) => {
  localStorage.setItem(LS_NAME, JSON.stringify(collections));
};

export const getTodosFromLS = () => {
  const collections = localStorage.getItem(LS_NAME);
  if (!collections) return [];

  const parsedCollections = JSON.parse(collections) as unknown;

  if (!isValidCollections(parsedCollections)) {
    throw new Error('localStorage data is not valid, using default values!');
  }

  return parsedCollections as TCollection[];
};

export const createCollectionEntry = (entry: TNewCollectionEntry): TCollection => ({
  shared: false,
  todos: [],
  created: Date(),
  ...entry,
});

export const createItemEntry = (entry: TItemEntry): TItem => ({
  id: nanoid(),
  done: false,
  created: Date(),
  ...entry,
});
