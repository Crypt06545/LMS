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
import {
  calculateChapterTime,
  calculateCourseDuration,
  calculateNoOfLectures,
} from "@/utils/calculateTime";
import { BookOpenText, CalendarClock, Clock, SquarePlay } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import humanizeDuration from "humanize-duration";
import { Button } from "@/components/ui/button";

const CourseDetails = () => {
  const { id } = useParams();
  const { allCourses, fetchAllCourses } = useCourseStore();
  const [course, setCourse] = useState(null);
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);

  useEffect(() => {
    fetchAllCourses();
  }, [fetchAllCourses]);

  useEffect(() => {
    const found = allCourses.find((c) => c._id === id);
    setCourse(found);
  }, [allCourses, id]);

  if (!course) return <div className="text-white p-10">Loading...</div>;

  const finalPrice = (
    course?.coursePrice -
    (course?.discount * course?.coursePrice) / 100
  ).toFixed(2);

  return (
    <div className="container mx-auto ">
      <div className="px-4 md:px-8 lg:px-20 pt-20 text-left text-gray-200 flex flex-col lg:flex-row gap-10">
        {/* left side  */}

        <div className="p-4 flex flex-col gap-4 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl shadow-md max-w-md self-start">
          {/* Image */}
          <div className="rounded-lg overflow-hidden h-52 mb-4">
            <img
              src={course?.courseThumbnail}
              alt={course?.courseTitle}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-gray-100 line-clamp-2">
            {course?.courseTitle}
          </h2>

          {/* Price info */}
          <p className="font-bold text-emerald-400 text-2xl">
            ৳{" "}
            {finalPrice}
            <span className="ml-2 text-sm line-through text-gray-500">
              ৳{course?.coursePrice}
            </span>
            <span className="ml-2 text-sm text-red-500 font-semibold">
              {course?.discount}% off
            </span>
          </p>

          {/* Course Duration & Lessons */}
          <div className="flex items-center gap-6 text-gray-300 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{calculateCourseDuration(course)}</span>
            </div>
            <div className="h-5 w-px bg-gray-400/40"></div>
            <div className="flex items-center gap-2">
              <BookOpenText className="w-5 h-5" />
              <span>{calculateNoOfLectures(course)} Lessons</span>
            </div>
          </div>

          {/* Enroll Button */}
          <button
            onClick={() => {
              /* Your enroll logic here */
            }}
            className={`mt-6 w-full text-white text-sm py-3 rounded-md transition duration-300 
      ${
        isAlreadyEnrolled
          ? "bg-gray-600 cursor-not-allowed"
          : "bg-transparent border border-gray-600 hover:border-white hover:text-white"
      }`}
            disabled={isAlreadyEnrolled}
          >
            {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
          </button>
        </div>

        {/* right Section */}
        <div className="lg:w-2/3 space-y-6">
          {/* Title & Description */}
          <div>
            <h1 className="font-bold text-3xl text-gray-100">
              {course?.courseTitle}
            </h1>
            <p
              className="text-gray-300 pt-4 text-sm md:text-base leading-relaxed space-y-4 [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_li]:mb-2 [&_strong]:text-white [&_strong]:font-semibold [&_a]:text-emerald-400 [&_a]:underline"
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
              {/* accordions  */}
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
        </div>
      </div>

      {/* Course details */}
      <div className="py-20 px-4 md:px-8 lg:px-20">
        <h3 className="text-xl md:text-2xl text-white font-bold mb-4 border-b border-white/10 pb-2">
          Course Details
        </h3>
        <h1 className="font-bold text-3xl text-gray-100">
          {course?.courseTitle}
        </h1>

        <p
          className="text-gray-300 mt-2 text-sm md:text-base leading-relaxed space-y-4 [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_li]:mb-2 [&_strong]:text-white [&_strong]:font-semibold [&_a]:text-emerald-400 [&_a]:underline"
          dangerouslySetInnerHTML={{
            __html: course?.courseDescription,
          }}
        ></p>
      </div>
    </div>
  );
};

export default CourseDetails;
