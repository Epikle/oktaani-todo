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

// eslint-disable-next-line no-promise-executor-return
const delay = (t: number) => new Promise((resolve) => setTimeout(resolve, t));

export const getSharedCollectionData = async (id: string) => {
  try {
    // TODO: delay only for development, remove
    await delay(2000);
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
  }
};

export const getTodosFromLS = () => {
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
