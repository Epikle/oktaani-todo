import { nanoid } from 'nanoid';

import { TCollection, TNewCollectionEntry } from '../types';

export const getTodosFromLS = () => {
  const collections = localStorage.getItem('oktaani-todo') || '[]';
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
