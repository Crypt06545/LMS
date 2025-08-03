import React from "react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Rating } from "react-simple-star-rating";

const CourseCard = ({ course }) => {
  return (
    <Card
      key={course?._id}
      className="p-4 h-full flex flex-col gap-1 justify-between bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl shadow-md hover:shadow-xl hover:border-gray-400 transition-all duration-300"
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
      <CardContent className="flex-1 px-1 text-sm text-gray-400">
        <div className="flex items-center gap-2 mb-2">
          <Rating
            readonly
            allowFraction
            size={20}
            initialValue={Number(course?.courseRatings?.[0]?.rating) || 0}
            SVGstyle={{ display: "inline-block" }}
          />
          <span className="text-sm text-yellow-400 font-medium">
            {(Number(course?.courseRatings?.[0]?.rating) || 0).toFixed(1)}
          </span>
        </div>

        <p className="font-bold text-emerald-400 text-lg">
          {(
            course?.coursePrice -
            (course?.discount * course?.coursePrice) / 100
          ).toFixed(2)}
          ৳
          <span className="ml-2 text-sm line-through text-gray-500">
            {course?.coursePrice}৳
          </span>
        </p>
      </CardContent>

      {/* Button */}
      <CardFooter className="p-1 mt-auto">
        <button className=" text-white text-sm py-2 px-4 cursor-pointer rounded-md transition duration-300 bg-transparent border border-gray-600 hover:border-white hover:text-white ">
          Enroll Now
        </button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
