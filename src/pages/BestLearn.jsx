import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

const BestLearn = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/course-list");
  };
  return (
    <div>
      <div className="text-center text-gray-200">
        <h1 className=" font-medium text-[30px] md:text-4xl">
          Learn From The best
        </h1>
        <p className="w-full lg:w-[58%] md:w-[70%] mx-auto mt-2">
          Discover our top-rated courses across various categories. From coding
          and design to business and wellness, our courses are crafted to
          deliver results.
        </p>
      </div>

      {/* couse card  */}
      <CourseCard />
      <div className="flex justify-center items-center mt-7">
        <Button
          onClick={handleClick}
          className={
            " text-white text-sm py-2 px-4 cursor-pointer rounded-md transition duration-300 bg-transparent border border-gray-600 hover:border-white hover:text-white "
          }
        >
          Show All Courses
        </Button>
      </div>
    </div>
  );
};

export default BestLearn;
