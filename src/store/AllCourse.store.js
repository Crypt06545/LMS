import { dummyCourses } from "@/assets/assets";
import { create } from "zustand";

const useCourseStore  = create((set) => ({
  allCourses: [],
  fetchAllCourses: async () => {
    const courses = await Promise.resolve(dummyCourses);
    set({ allCourses: courses });
  },
}));

export default useCourseStore ;
