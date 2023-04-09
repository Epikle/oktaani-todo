import { StateCreator } from 'zustand';

import { type BoundStore } from './useBoundStore';

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

const createSelectedSlice: StateCreator<BoundStore, [], [], SelectedSlice> = (set) => ({
  ...initialSelectedState,
  setSelectedCollection: (collection) => set((state) => ({ ...state, ...collection, selected: true })),
  resetSelection: () => set(initialSelectedState),
});

export default createSelectedSlice;
