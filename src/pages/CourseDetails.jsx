import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCourseStore from "@/store/AllCourse.store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

  if (!course)
    return <div className="text-white p-10">Loading...</div>;

  const finalPrice = (
    course.coursePrice -
    (course.discount * course.coursePrice) / 100
  ).toFixed(2);

  return (
    <div className="container mx-auto px-4 md:px-8 pt-20 flex flex-col lg:flex-row gap-10 text-white">
      {/* Left Section */}
      <div className="w-full lg:w-2/3 flex flex-col gap-6">
        <div className="overflow-hidden rounded-xl">
          <img
            src={course.courseThumbnail}
            alt={course.courseTitle}
            className="w-full h-64 object-cover rounded-xl"
          />
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-2xl">
          <h2 className="text-2xl font-semibold mb-4">Course Description</h2>
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: course.courseDescription }}
          />
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-2xl">
          <h2 className="text-2xl font-semibold mb-4">Course Content</h2>
          <Accordion type="single" collapsible className="w-full">
            {course.courseContent.map((chapter, index) => (
              <AccordionItem
                key={chapter.chapterId}
                value={`item-${index}`}
                className="border-b border-white/10"
              >
                <AccordionTrigger className="text-lg text-left font-medium text-white py-3">
                  {chapter.chapterTitle}
                </AccordionTrigger>
                <AccordionContent className="space-y-3 mt-2">
                  {chapter.chapterContent.map((lecture) => (
                    <div
                      key={lecture.lectureId}
                      className="flex items-center justify-between text-sm text-gray-300 px-2"
                    >
                      <div className="flex gap-2 items-center">
                        <span>{lecture.lectureTitle}</span>
                        {lecture.isPreviewFree && (
                          <span className="text-emerald-400 text-xs">
                            (Preview)
                          </span>
                        )}
                      </div>
                      <span className="text-xs">{lecture.lectureDuration} min</span>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/3 space-y-6">
        

        <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-semibold">What You'll Learn</h3>
          <div
            className="prose prose-invert max-w-none text-sm text-gray-300"
            dangerouslySetInnerHTML={{ __html: course.courseDescription }}
          />
        </div>
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-2xl">
          <h2 className="text-xl font-semibold mb-2">Price</h2>
          <p className="text-3xl font-bold text-emerald-400">৳{finalPrice}</p>
          <p className="text-sm text-gray-400 line-through">৳{course.coursePrice}</p>
          <button className="mt-4 w-full text-white text-sm py-2 px-4 rounded-md transition duration-300 bg-transparent border border-gray-600 hover:border-white hover:text-white">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
