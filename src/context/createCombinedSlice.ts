import { StateCreator } from 'zustand';

import createTodoSlice, { type NewCollectionEntry } from './createTodoSlice';
import createSelectedSlice from './createSelectedSlice';
import { createCollectionEntry } from '../services/todo';
import { type BoundStore } from './useBoundStore';

export type CombinedSlice = {
  createCollectionAndSelect: (entry: NewCollectionEntry) => void;
};
const createCombinedSlice: StateCreator<BoundStore, [], [], CombinedSlice> = (...args) => ({
  createCollectionAndSelect: (entry) => {
    const createdEntry = createCollectionEntry(entry, 'todo');
    const { id, title, color } = createdEntry;
    createTodoSlice(...args).createCollection(createdEntry);
    createSelectedSlice(...args).setSelectedCollection({ id, title, color });
  },
});

export default createCombinedSlice;
