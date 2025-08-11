import { dummyCourses } from "@/assets/assets";
import { create } from "zustand";

const useEnrolledCoursesStore = create((set) => ({
  enrolledCourses: [],
  fetchEnrolledCourses: async () => {
    const course = await Promise.resolve(dummyCourses);
    set({ enrolledCourses: course });
  },
}));
export default useEnrolledCoursesStore;
