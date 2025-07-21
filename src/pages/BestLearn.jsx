import CourseCard from "@/components/CourseCard";
import React from "react";

const BestLearn = () => {
  return (
    <div>
      <div className="text-center text-gray-200">
        <h1 className=" font-medium text-[30px] md:text-4xl">Learn From The best</h1>
        <p className="w-full lg:w-[58%] md:w-[70%] mx-auto mt-2">
          Discover our top-rated courses across various categories. From coding
          and design to business and wellness, our courses are crafted to
          deliver results.
        </p>
      </div>

      {/* couse card  */}
      <CourseCard/>
    </div>
  );
};

export default BestLearn;
