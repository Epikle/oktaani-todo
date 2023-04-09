import { create } from 'zustand';

import { type TodoTypes } from './useTodoStore';

export type Selected = typeof initialSelectedState;
export type SelectedEntry = Omit<Selected, 'edit' | 'selected' | 'hasDone'>;
export type SelectedSlice = Selected & {
  actions: {
    setSelectedCollection: (collection: Partial<Selected>) => void;
    resetSelection: () => void;
  };
};

const initialSelectedState = {
  id: '',
  title: '',
  color: '',
  edit: false,
  shared: false,
  selected: false,
  hasDone: false,
  type: 'unset' as TodoTypes,
};

const useSelectedStore = create<SelectedSlice>((set) => ({
  ...initialSelectedState,
  actions: {
    setSelectedCollection: (collection) => set((state) => ({ ...state, ...collection, selected: true })),
    resetSelection: () => set(initialSelectedState),
  },
}));

export default useSelectedStore;
