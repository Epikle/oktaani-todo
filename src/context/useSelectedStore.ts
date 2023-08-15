import { create } from 'zustand';
import { Collection } from '../utils/types';
import useTodoStore from './useTodoStore';

export type SelectedSlice = {
  selectedCollection: (Collection & { edit: boolean }) | null;
  actions: {
    setSelectedCollection: ({ id, edit }: { id: string; edit: boolean }) => void;
    resetSelection: () => void;
  };
};

const useSelectedStore = create<SelectedSlice>((set) => ({
  selectedCollection: null,
  actions: {
    setSelectedCollection: ({ id, edit }) => {
      const collection = useTodoStore.getState().collections?.find((c) => c.id === id);
      if (collection) {
        set({ selectedCollection: { ...collection, edit } });
      }
    },
    resetSelection: () => set({ selectedCollection: null }),
  },
}));

export default useSelectedStore;
