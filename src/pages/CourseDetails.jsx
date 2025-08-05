import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCourseStore from "@/store/AllCourse.store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Rating } from "react-simple-star-rating";
import { calculateChapterTime } from "@/utils/calculateTime";

const CourseDetails = () => {
  const { id } = useParams();
  const { allCourses, fetchAllCourses } = useCourseStore();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetchAllCourses();
  }, [fetchAllCourses]);

  useEffect(() => {
    const found = allCourses.find((c) => c._id === id);
    setCourse(found);
  }, [allCourses, id]);

  if (!course) return <div className="text-white p-10">Loading...</div>;

  const finalPrice = (
    course.coursePrice -
    (course.discount * course.coursePrice) / 100
  ).toFixed(2);

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-20 pt-20 text-left text-white flex flex-col lg:flex-row gap-10">
      {/* Left Section */}
      <div className="lg:w-2/3 space-y-6">
        {/* Title & Description */}
        <div>
          <h1 className="font-bold text-3xl text-gray-100">
            {course?.courseTitle}
          </h1>
          <p
            className="text-gray-300 pt-4 text-sm md:text-base leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: course?.courseDescription.slice(0, 200),
            }}
          ></p>
          {/* Ratings and Student Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
            <div className="flex items-center gap-1">
              <Rating
                readonly
                allowFraction
                size={20}
                initialValue={Number(course?.courseRatings?.[0]?.rating) || 0}
                SVGstyle={{ display: "inline-block" }}
              />
              <span className="text-yellow-400 font-medium">
                {(Number(course?.courseRatings?.[0]?.rating) || 0).toFixed(1)}
              </span>
            </div>
            <div>
              {course?.courseRatings?.length || 0}{" "}
              {course?.courseRatings?.length > 1 ? "ratings" : "rating"}
            </div>
            <div>
              {course?.enrolledStudents?.length || 0}{" "}
              {course?.enrolledStudents?.length > 1 ? "students" : "student"}
            </div>
          </div>

          {/* course structure  */}
          <div className="pt-8 text-gray-200">
            <h2>Course Structure</h2>
            <div className="pt-5">
              {course?.courseContent.map((chapter, ind) => (
                <Accordion key={ind} type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>{chapter?.chapterTitle}</AccordionTrigger>
                    <AccordionContent>
                      <p>{chapter?.chapterContent.length} lectuer - {calculateChapterTime(chapter)} </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          </div>
        </div>

        {/* accordions  */}
      </div>

      {/* Right Section - Price & Enrollment */}
      {/* <div className="lg:w-1/3 bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
        <h2 className="text-xl font-semibold text-white">Course Pricing</h2>
        <div className="text-lg text-gray-300">
          <p>Original Price: <span className="line-through">${course.coursePrice}</span></p>
          <p>Discount: <span className="text-green-400">{course.discount}%</span></p>
          <p className="text-2xl font-bold text-emerald-500">Now: ${finalPrice}</p>
        </div>
        <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold transition duration-200">
          Enroll Now
        </button>
      </div> */}
    </div>
  );
};

export default CourseDetails;
