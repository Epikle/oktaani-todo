import { create } from 'zustand';

export type StatusSlice = {
  isError: boolean;
  errorMessage: string | null;
  actions: {
    setError: (message: string) => void;
    resetError: () => void;
  };
};

const useStatusStore = create<StatusSlice>((set) => ({
  isError: false,
  errorMessage: null,
  actions: {
    setError: (message) => set({ isError: true, errorMessage: message }),
    resetError: () => set({ isError: false, errorMessage: null }),
  },
}));

export default useStatusStore;
