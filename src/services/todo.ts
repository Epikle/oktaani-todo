import axios from 'axios';
import { nanoid } from 'nanoid';

import type {
  TCollection,
  TItem,
  TItemEntry,
  TNewCollectionEntry,
} from '../types';
import { isValidCollections } from '../utils/utils';

const LS_NAME = 'oktaani-todo';
const BASE_URL = import.meta.env.VITE_API_URL;

const getSharedCollectionData = async (id: string) => {
  try {
    const { data } = await axios.get<TCollection>(`${BASE_URL}/share/${id}`);
    return data;
  } catch (error) {
    throw new Error('Fetch failed.');
  }
};

export const saveCollectionsToLS = (collections: TCollection[]) => {
  try {
    localStorage.setItem(LS_NAME, JSON.stringify(collections));
  } catch (error) {
    // TODO: error handling
    // eslint-disable-next-line no-console
    console.error('save to ls:', error);
  }
};

export const getTodosFromLS = async (): Promise<TCollection[] | []> => {
  try {
    const collections = localStorage.getItem(LS_NAME);
    if (!collections) return [];

    const parsedCollections = JSON.parse(collections) as unknown;

    if (!isValidCollections(parsedCollections)) {
      throw new Error('localStorage data is not valid, using default values!');
    }

    const validatedCollections = parsedCollections as TCollection[];

    // eslint-disable-next-line no-restricted-syntax
    for await (const [index, collection] of validatedCollections.entries()) {
      if (collection.shared) {
        const data = await getSharedCollectionData(collection.id);
        validatedCollections[index] = data;
      }
    }

    return validatedCollections;
  } catch (error) {
    // TODO: error handling
    return [];
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
