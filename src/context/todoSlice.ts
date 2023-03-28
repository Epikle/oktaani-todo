import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

import type {
  TCollection,
  TItemEntry,
  TNewCollectionEntry,
  TSelectedEntry,
} from '../types';
import {
  createCollectionEntry,
  createItemEntry,
  saveCollectionsToLS,
} from '../services/todo';

const initialState: TCollection[] | [] = [];

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    changeOrder: (
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>,
    ) => {
      const { dragIndex, hoverIndex } = action.payload;

      const movingCollection = state[dragIndex];
      state.splice(dragIndex, 1);
      state.splice(hoverIndex, 0, movingCollection);

      saveCollectionsToLS(state);

      return state;
    },
    initTodos: (_state, action: PayloadAction<TCollection[] | []>) => {
      if (action.payload.length === 0) {
        const createdEntry = [
          createCollectionEntry({
            title: '✨ First Collection ✨',
            color: '#7b68ee',
            id: nanoid(),
          }),
        ];

        saveCollectionsToLS(createdEntry);

        return createdEntry;
      }

      saveCollectionsToLS(action.payload);

      return [...action.payload];
    },
    createCollection: (state, action: PayloadAction<TNewCollectionEntry>) => {
      const createdEntry = createCollectionEntry(action.payload);

      saveCollectionsToLS([createdEntry, ...state]);

      return [createdEntry, ...state];
    },
    deleteCollection: (state, action: PayloadAction<{ id: string }>) => {
      const filteredCollectionList = state.filter(
        (collection) => collection.id !== action.payload.id,
      );

      saveCollectionsToLS([...filteredCollectionList]);

      return [...filteredCollectionList];
    },
    createItem: (
      state,
      action: PayloadAction<{ id: string; item: TItemEntry }>,
    ) => {
      const { id, item } = action.payload;

      const selectedCollection = state.find(
        (collection) => collection.id === id,
      );

      if (!selectedCollection) return state;

      const createdItem = createItemEntry(item);
      selectedCollection.todos = [createdItem, ...selectedCollection.todos];
      saveCollectionsToLS(state);

      return state;
    },
    toggleItemDone: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;

      const toggleItem = state
        .map((collection) => collection.todos)
        .flat()
        .find((item) => item.id === id);

      if (!toggleItem) return state;

      toggleItem.done = !toggleItem.done;

      saveCollectionsToLS(state);

      return state;
    },
    editCollection: (state, action: PayloadAction<TSelectedEntry>) => {
      const collection = state.find((col) => col.id === action.payload.id);

      if (collection) {
        Object.assign(collection, action.payload);
        saveCollectionsToLS(state);
      }

      return state;
    },
    updateSharedCollectionToState: (
      state,
      action: PayloadAction<Partial<TCollection>>,
    ) => {
      const collection = state.find((col) => col.id === action.payload.id);

      if (collection) {
        Object.assign(collection, action.payload);
        saveCollectionsToLS(state);
      }

      return state;
    },
    createSharedCollection: (state, action: PayloadAction<TCollection>) => {
      const collection = state.find((col) => col.id === action.payload.id);

      if (collection) return state;

      saveCollectionsToLS([action.payload, ...state]);
      return [action.payload, ...state];
    },
    removeDoneItems: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;

      const removeItem = state.find((collection) => collection.id === id);
      if (!removeItem) return state;

      removeItem.todos = [...removeItem.todos.filter((item) => !item.done)];
      saveCollectionsToLS(state);

      return state;
    },
  },
});

export const {
  changeOrder,
  initTodos,
  createCollection,
  deleteCollection,
  createItem,
  toggleItemDone,
  editCollection,
  removeDoneItems,
  updateSharedCollectionToState,
  createSharedCollection,
} = todoSlice.actions;

export default todoSlice.reducer;
