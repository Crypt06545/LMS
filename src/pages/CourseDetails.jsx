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
import {
  AlertCircleIcon,
  BadgeCheckIcon,
  CheckIcon,
  SquarePlay,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import humanizeDuration from "humanize-duration";

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

          {/* Course Structure */}
          <div className="pt-8 text-gray-200">
            <h2 className="text-xl font-semibold text-white">
              Course Structure
            </h2>
            <div className="pt-4 space-y-4">
              {course?.courseContent.map((chapter, idx) => (
                <Accordion
                  key={chapter.chapterId}
                  type="single"
                  collapsible
                  className="border border-white/10 rounded-xl backdrop-blur bg-white/5"
                >
                  <AccordionItem value={`item-${idx}`}>
                    <AccordionTrigger className="px-4 cursor-pointer py-3 text-left text-white font-semibold hover:underline">
                      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                        <span className="truncate sm:max-w-[70%]">
                          {chapter.chapterTitle}
                        </span>
                        <span className="text-sm text-gray-400 font-normal whitespace-nowrap">
                          {chapter?.chapterContent.length} lectures –{" "}
                          {calculateChapterTime(chapter)}
                        </span>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="space-y-3 px-4 pb-4">
                      {chapter.chapterContent.map((lecture) => (
                        <div
                          key={lecture.lectureId}
                          className="flex justify-between items-start bg-white/5 border border-white/10 p-3 rounded-lg hover:shadow-md"
                        >
                          <div>
                            <div className="flex items-start gap-2">
                              <SquarePlay className="w-4 h-4 text-gray-400 shrink-0 mt-[3px]" />
                              <p className="text-sm md:text-base text-white font-medium leading-snug">
                                {lecture.lectureTitle}
                              </p>
                            </div>
                            <span className="text-xs text-gray-400">
                              Duration:{" "}
                              {humanizeDuration(
                                lecture?.lectureDuration * 60 * 1000,
                                { units: ["h", "m"] }
                              )}
                            </span>
                          </div>

                          {lecture.isPreviewFree && (
                            <Badge className="bg-green-500 text-gray-200 font-semibold">
                              Preview
                            </Badge>
                          )}
                        </div>
                      ))}
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
