import { nanoid } from 'nanoid';

import type {
  TCollection,
  TItem,
  TItemEntry,
  TNewCollectionEntry,
} from '../types';

const LS_NAME = 'oktaani-todo';

export const getTodosFromLS = () => {
  const collections = localStorage.getItem(LS_NAME) || '[]';
  const parsedCollections: TCollection[] | [] = JSON.parse(collections);
  return parsedCollections;
};

export const saveCollectionsToLS = (collections: TCollection[]) => {
  localStorage.setItem(LS_NAME, JSON.stringify(collections));
};

export const createCollectionEntry = (entry: TNewCollectionEntry) => {
  const createdCollection: TCollection = {
    shared: false,
    todos: [],
    created: Date(),
    ...entry,
  };

  return createdCollection;
};

export const createItemEntry = (entry: TItemEntry) => {
  const createdCollection: TItem = {
    id: nanoid(),
    done: false,
    created: Date(),
    ...entry,
  };

  return createdCollection;
};
