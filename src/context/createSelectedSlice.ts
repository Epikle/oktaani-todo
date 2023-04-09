import { StateCreator } from 'zustand';

import { type SettingsSlice } from './createSettingsSlice';
import { type TodoSlice } from './createTodoSlice';

export type Selected = typeof initialSelectedState;
export type SelectedEntry = Omit<Selected, 'edit' | 'selected' | 'hasDone'>;
export type SelectedSlice = typeof initialSelectedState & {
  setSelectedCollection: (collection: Partial<Selected>) => void;
  resetSelection: () => void;
};

const initialSelectedState = {
  id: '',
  title: '',
  color: '',
  edit: false,
  shared: false,
  selected: false,
  hasDone: false,
};

const createSelectedSlice: StateCreator<SelectedSlice & SettingsSlice & TodoSlice, [], [], SelectedSlice> = (set) => ({
  ...initialSelectedState,
  setSelectedCollection: (collection) => set((state) => ({ ...state, ...collection, selected: true })),
  resetSelection: () => set(initialSelectedState),
});

export default createSelectedSlice;
