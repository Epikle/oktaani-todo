import { create } from 'zustand';

type SelectedState = typeof initialSelectedState;
type SelectedActions = {
  setSelectedCollection: (collection: Partial<SelectedState>) => void;
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

const useSelectedStore = create<SelectedState & SelectedActions>((set) => ({
  ...initialSelectedState,
  setSelectedCollection: (collection) => set((state) => ({ ...state, ...collection, selected: true })),
  resetSelection: () => set(initialSelectedState),
}));

export default useSelectedStore;
