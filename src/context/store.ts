import { configureStore } from '@reduxjs/toolkit';

import todoReducer from './todoSlice';
import selectedReducer from './selectedSlice';

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    selected: selectedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
