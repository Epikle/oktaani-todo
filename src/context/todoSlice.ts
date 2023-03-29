import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

import type {
  TCollection,
  TItemEntry,
  TNewCollectionEntry,
  TSelectedEntry,
} from '../types';
import type { RootState } from './store';
import {
  createCollectionEntry,
  createItemEntry,
  deleteSharedCollection,
  getSharedCollectionData,
  saveCollectionsToLS,
  updateSharedCollection,
} from '../services/todo';

const initialState: TCollection[] | [] = [];

export const deleteCollectionById = createAsyncThunk(
  'todo/deleteCollection',
  async ({ id, shared }: { id: string; shared: boolean }) => {
    if (shared) await deleteSharedCollection(id);
    return id;
  },
);

export const updateSharedCollectionById = createAsyncThunk(
  'todo/updateSharedCollectionById',
  async (id: string) => {
    // TODO: REMOVE DELAY, ONLY DEVELOPMENT
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    const sharedCollectionData = await getSharedCollectionData(id);

    return sharedCollectionData;
  },
);

export const createCollectionItem = createAsyncThunk(
  'todo/createCollectionItem',
  async (
    {
      id,
      newItemEntry,
    }: {
      id: string;
      newItemEntry: TItemEntry;
    },
    thunkAPI,
  ) => {
    const state = thunkAPI.getState() as RootState;
    const selectedCollection = state.todo.find((col) => col.id === id);
    const createdItem = createItemEntry(newItemEntry);

    if (selectedCollection && selectedCollection.shared) {
      const newCollection = { ...selectedCollection };
      newCollection.todos = [createdItem, ...selectedCollection.todos];
      await updateSharedCollection(newCollection);
    }

    return { id, createdItem };
  },
);

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    initTodoState: (state, action: PayloadAction<TCollection[] | []>) => {
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
    createCollection: (state, action: PayloadAction<TNewCollectionEntry>) => {
      const createdEntry = createCollectionEntry(action.payload);
      saveCollectionsToLS([createdEntry, ...state]);

      return [createdEntry, ...state];
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
  extraReducers: (builder) => {
    builder.addCase(updateSharedCollectionById.fulfilled, (state, action) => {
      const collection = state.find((col) => col.id === action.payload.id);

      if (collection) {
        Object.assign(collection, action.payload);
        saveCollectionsToLS(state);
      }

      return state;
    });

    builder.addCase(createCollectionItem.fulfilled, (state, action) => {
      const { id, createdItem } = action.payload;
      const selectedCollection = state.find(
        (collection) => collection.id === id,
      );

      if (!selectedCollection) return state;

      selectedCollection.todos = [createdItem, ...selectedCollection.todos];
      saveCollectionsToLS(state);

      return state;
    });

    builder.addCase(deleteCollectionById.fulfilled, (state, action) => {
      const filteredCollectionList = state.filter(
        (collection) => collection.id !== action.payload,
      );

      saveCollectionsToLS([...filteredCollectionList]);

      return [...filteredCollectionList];
    });
  },
});

export const {
  initTodoState,
  changeOrder,
  createCollection,
  toggleItemDone,
  editCollection,
  removeDoneItems,
  createSharedCollection,
} = todoSlice.actions;

export default todoSlice.reducer;
