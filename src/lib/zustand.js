import { create } from 'zustand';

/**
 * @type {UseStore}
 */
export const useStore = create((set, get) => ({
  user: undefined,
  loading: true,
  setUser: (user) => {
    if (get().loading == true) {
      set({ user, loading: false });
    } else {
      set({ user });
    }
  },
  setLoading: (state) => set({ loading: state }),
}));
