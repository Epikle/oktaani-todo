import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';

import todoReducer from './todoSlice';
import selectedReducer from './selectedSlice';

// export const store = configureStore({
//   reducer: {
//     todo: todoReducer,
//     selected: selectedReducer,
//   },
// });

const rootReducer = combineReducers({
  todo: todoReducer,
  selected: selectedReducer,
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
