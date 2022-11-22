import { nanoid } from 'nanoid';

import { TCollection, TNewCollectionEntry } from '../types';

const LS_NAME = 'oktaani-todo';

export const getTodosFromLS = () => {
  const collections = localStorage.getItem(LS_NAME) || '[]';
  const parsedCollections: TCollection[] | [] = JSON.parse(collections);
  return parsedCollections;
};

export const createCollectionEntry = (obj: TNewCollectionEntry) => {
  const createdCollection: TCollection = {
    id: nanoid(),
    shared: false,
    todos: [],
    ...obj,
  };

  return createdCollection;
};

export const saveCollectionsToLS = (collections: TCollection[]): void => {
  localStorage.setItem(LS_NAME, JSON.stringify(collections));
};