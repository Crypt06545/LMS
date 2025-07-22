import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import useCourseStore from "@/store/AllCourse.store";

const CourseCard = () => {
  const { allCourses, fetchAllCourses } = useCourseStore();
  useEffect(() => {
    fetchAllCourses();
  }, [fetchAllCourses]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-14 px-4">
      {allCourses.slice(0, 4).map((course) => (
        <Card
          key={course?._id}
          className="p-4 h-full flex flex-col gap-1 justify-between bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl shadow-md hover:shadow-xl hover:border-emerald-500 transition-all duration-300"
        >
          {/* Image */}
          <div className="rounded-lg overflow-hidden h-40 mb-4">
            <img
              src={course?.courseThumbnail}
              alt={course?.courseTitle}
              className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Title */}
          <CardTitle className="text-lg font-semibold text-gray-100 mb-2 line-clamp-2 min-h-[3.5rem]">
            {course?.courseTitle}
          </CardTitle>

          {/* Content */}
          <CardContent className="flex-1 text-sm text-gray-400">
            <p className="line-clamp-2 mb-3">
              Master the fundamentals in this hands-on course.
            </p>

            <p className="font-bold text-emerald-400 text-lg">
              $
              {(
                course?.coursePrice -
                (course?.discount * course?.coursePrice) / 100
              ).toFixed(2)}
              <span className="ml-2 text-sm line-through text-gray-500">
                ${course?.coursePrice}
              </span>
            </p>
          </CardContent>

          {/* Button */}
          <CardFooter className="mt-auto">
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm py-2 rounded-md transition duration-300">
              Enroll Now
            </button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CourseCard;
