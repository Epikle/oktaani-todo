import { create } from 'zustand';

export type Selected = typeof initialSelectedState;
export type SelectedEntry = Omit<Selected, 'edit' | 'selected' | 'hasDone'>;
export type SelectedSlice = typeof initialSelectedState & {
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
};

const useSelectedStore = create<SelectedSlice>((set) => ({
  ...initialSelectedState,
  actions: {
    setSelectedCollection: (collection) => set((state) => ({ ...state, ...collection, selected: true })),
    resetSelection: () => set(initialSelectedState),
  },
}));

export default useSelectedStore;
