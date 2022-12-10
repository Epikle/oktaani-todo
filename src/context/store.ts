import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';

import todoReducer from './todoSlice';
import selectedReducer from './selectedSlice';
import settingsReducer from './settingsSlice';
import languageReducer from './languageSlice';

const rootReducer = combineReducers({
  todo: todoReducer,
  selected: selectedReducer,
  settings: settingsReducer,
  language: languageReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
