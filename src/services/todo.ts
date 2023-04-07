import axios from 'axios';
import { nanoid } from 'nanoid';

import type { Collection, Item, ItemEntry, NewCollectionEntry } from '../context/useTodoStore';

const LS_NAME = import.meta.env.VITE_LS_NAME_TODOS;
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getSharedCollectionData = async (id: string) => {
  const { data } = await api.get<Collection>(`/share/${id}`);
  return data;
};

export const createSharedCollection = async (collection: Collection) => {
  await api.post('/share', { ...collection, shared: true });
};

export const updateSharedCollection = async (collection: Collection) => {
  await api.put(`/share/${collection.id}`, collection);
};

export const deleteSharedCollection = async (id: string) => {
  await api.delete(`/share/${id}`);
};

export const saveCollectionsToLS = (collections: Collection[]) => {
  localStorage.setItem(LS_NAME, JSON.stringify(collections));
};

export const getTodosFromLS = () => {
  const collections = localStorage.getItem(LS_NAME);
  return JSON.parse(collections || '[]') as unknown;
};

export const createCollectionEntry = (entry: NewCollectionEntry): Collection => ({
  shared: false,
  todos: [],
  created: Date(),
  ...entry,
});

export const createItemEntry = (entry: ItemEntry): Item => ({
  id: nanoid(),
  done: false,
  created: Date(),
  ...entry,
});
