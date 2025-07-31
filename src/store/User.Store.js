import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  token: null,
  setUser: (userDate) => set({ user: userDate }),
  setToken: (userToken) => set({ token: userToken }),
}));
export default useUserStore;
