import { create } from 'zustand';

export const useStore = create((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (state) => set({ loading: state }),
}));
