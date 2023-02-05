import { nanoid } from 'nanoid';

import type {
  TCollection,
  TItem,
  TItemEntry,
  TNewCollectionEntry,
} from '../types';
import { isValidCollections } from '../utils/utils';

const LS_NAME = 'oktaani-todo';

export const getTodosFromLS = (): [] | TCollection[] => {
  try {
    const collections = localStorage.getItem(LS_NAME);
    if (!collections) return [];

    const parsedCollections = JSON.parse(collections) as unknown;

    if (!isValidCollections(parsedCollections)) {
      throw new Error('localStorage data is not valid, using default values!');
    }

    return parsedCollections as TCollection[];
  } catch (error) {
    // TODO: error handling
    return [];
  }
};

export const saveCollectionsToLS = (collections: TCollection[]) => {
  try {
    localStorage.setItem(LS_NAME, JSON.stringify(collections));
  } catch (error) {
    // TODO: error handling
  }
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
