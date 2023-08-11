import { create } from 'zustand';

export type StatusSlice = typeof initialStatusState & {
  actions: {
    setError: (message: string) => void;
    resetError: () => void;
  };
};

const initialStatusState = {
  isLoading: false,
  isError: false,
  errorMessage: '',
};

const useStatusStore = create<StatusSlice>((set) => ({
  ...initialStatusState,
  actions: {
    setError: (message) => set((state) => ({ ...state, isError: true, errorMessage: message })),
    resetError: () => set((state) => ({ ...state, isError: false })),
  },
}));

export default useStatusStore;
