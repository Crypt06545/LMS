import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import useCourseStore from "@/store/AllCourse.store";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BestLearn = () => {
  const { allCourses, fetchAllCourses } = useCourseStore();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/course-list");
  };

  useEffect(() => {
    fetchAllCourses();
  }, [fetchAllCourses]);

  return (
    <div className="px-4">
      {/* Heading */}
      <div className="text-center text-gray-200">
        <h1 className="font-medium text-[30px] md:text-4xl">
          Learn From The Best
        </h1>
        <p className="w-full lg:w-[58%] md:w-[70%] mx-auto mt-2">
          Discover our top-rated courses across various categories. From coding
          and design to business and wellness, our courses are crafted to
          deliver results.
        </p>
      </div>

      {/* Course Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
        {allCourses.slice(0, 4).map((course) => (
          <CourseCard key={course?._id} course={course} />
        ))}
      </div>

      {/* Show All Courses Button */}
      <div className="flex justify-center items-center mt-7">
        <Button
          onClick={handleClick}
          className="text-white text-sm py-2 px-4 cursor-pointer rounded-md transition duration-300 bg-transparent border border-gray-600 hover:border-white hover:text-white"
        >
          Show All Courses
        </Button>
      </div>
    </div>
  );
};

export default BestLearn;
