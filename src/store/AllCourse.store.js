import { dummyCourses } from "@/assets/assets";
import { create } from "zustand";

const useCourseStore = create((set) => ({
  allCourses: [],
  fetchAllCourses: async () => {
    const courses = await Promise.resolve(dummyCourses);
    set({ allCourses: courses });
  },
}));

export const useUserStore = create((set) => ({
  user: null,
  token: null,
  setUser: (userDate) => set({ user: userDate }),
  setToken: (userToken) => set({ token: userToken }),
}));

export default useCourseStore;
