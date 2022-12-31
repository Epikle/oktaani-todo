import { nanoid } from 'nanoid';

import type {
  TCollection,
  TItem,
  TItemEntry,
  TNewCollectionEntry,
} from '../types';
import { isStorageAvailable } from '../utils/utils';

const LS_NAME = 'oktaani-todo';

export const getTodosFromLS = () => {
  if (!isStorageAvailable()) return [];
  const collections = localStorage.getItem(LS_NAME) || '[]';
  const parsedCollections: TCollection[] | [] = JSON.parse(collections);
  return parsedCollections;
};

export const saveCollectionsToLS = (collections: TCollection[]) => {
  if (!isStorageAvailable()) return;
  localStorage.setItem(LS_NAME, JSON.stringify(collections));
};

export const createCollectionEntry = (obj: TNewCollectionEntry) => {
  const createdCollection: TCollection = {
    id: nanoid(),
    shared: false,
    todos: [],
    created: Date(),
    ...obj,
  };

  return createdCollection;
};

export const createItemEntry = (item: TItemEntry) => {
  const createdCollection: TItem = {
    id: nanoid(),
    done: false,
    created: Date(),
    ...item,
  };

  return createdCollection;
};
