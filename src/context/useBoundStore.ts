import { create } from 'zustand';

import createSelectedSlice, { type SelectedSlice } from './createSelectedSlice';
import createSettingsSlice, { type SettingsSlice } from './createSettingsSlice';
import createTodoSlice, { type TodoSlice } from './createTodoSlice';
import createCombinedSlice, { type CombinedSlice } from './createCombinedSlice';

export type BoundStore = SelectedSlice & SettingsSlice & TodoSlice & CombinedSlice;
export type BoundStoreSections = {
  selected: SelectedSlice;
  settings: SettingsSlice;
  todo: TodoSlice;
  combined: CombinedSlice;
};

const useBoundStore = create<BoundStore>((...args) => ({
  ...createSelectedSlice(...args),
  ...createSettingsSlice(...args),
  ...createTodoSlice(...args),
  ...createCombinedSlice(...args),
}));

export default useBoundStore;
