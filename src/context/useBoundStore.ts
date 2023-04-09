import { create } from 'zustand';

import createSelectedSlice, { type SelectedSlice } from './createSelectedSlice';
import createSettingsSlice, { type SettingsSlice } from './createSettingsSlice';
import createTodoSlice, { type TodoSlice } from './createTodoSlice';

const useBoundStore = create<SelectedSlice & SettingsSlice & TodoSlice>((...a) => ({
  ...createSelectedSlice(...a),
  ...createSettingsSlice(...a),
  ...createTodoSlice(...a),
}));

export default useBoundStore;
