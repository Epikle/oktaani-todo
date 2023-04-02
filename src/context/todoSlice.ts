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

export const editCollection = createAsyncThunk(
  'todo/editCollection',
  async (entry: TSelectedEntry, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const collection = state.todo.find((col) => col.id === entry.id);

    if (collection && entry.shared) {
      const newCollection = { ...collection, ...entry };
      await updateSharedCollection(newCollection);
    }

    if (collection && collection.shared && !entry.shared) {
      await deleteSharedCollection(collection.id);
    }

    return entry;
  },
);

export const toggleItemDone = createAsyncThunk(
  'todo/toggleItemDone',
  async ({ id, colId }: { id: string; colId: string }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const selectedCollection = state.todo.find((col) => col.id === colId);

    if (!selectedCollection || !selectedCollection.shared) return id;
    const collectionCopy: TCollection = JSON.parse(
      JSON.stringify(selectedCollection),
    );

    const toggleItem = collectionCopy.todos
      .flat()
      .find((item) => item.id === id);

    if (!toggleItem) return id;

    toggleItem.done = !toggleItem.done;

    await updateSharedCollection(collectionCopy);

    return id;
  },
);

export const removeDoneItems = createAsyncThunk(
  'todo/removeDoneItems',
  async (id: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const selectedCollection = state.todo.find((col) => col.id === id);
    if (!selectedCollection || !selectedCollection.shared) return id;
    const collectionCopy: TCollection = JSON.parse(
      JSON.stringify(selectedCollection),
    );
    collectionCopy.todos = [
      ...collectionCopy.todos.filter((item) => !item.done),
    ];
    await updateSharedCollection(collectionCopy);

    return id;
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
    createSharedCollection: (state, action: PayloadAction<TCollection>) => {
      const collection = state.find((col) => col.id === action.payload.id);

      if (collection) return state;

      saveCollectionsToLS([action.payload, ...state]);
      return [action.payload, ...state];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeDoneItems.fulfilled, (state, action) => {
      const id = action.payload;

      const removeItem = state.find((collection) => collection.id === id);
      if (!removeItem) return state;

      removeItem.todos = [...removeItem.todos.filter((item) => !item.done)];
      saveCollectionsToLS(state);

      return state;
    });

    builder.addCase(toggleItemDone.fulfilled, (state, action) => {
      const id = action.payload;

      const toggleItem = state
        .map((col) => col.todos)
        .flat()
        .find((item) => item.id === id);

      if (!toggleItem) return state;

      toggleItem.done = !toggleItem.done;

      saveCollectionsToLS(state);

      return state;
    });

    builder.addCase(editCollection.fulfilled, (state, action) => {
      const collection = state.find((col) => col.id === action.payload.id);

      if (collection) {
        Object.assign(collection, action.payload);
        saveCollectionsToLS(state);
      }

      return state;
    });

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
  createSharedCollection,
} = todoSlice.actions;

export default todoSlice.reducer;
