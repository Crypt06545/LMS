import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useEnrolledCoursesStore from "@/store/EnrolledCourses.store";
import { calculateCourseDuration } from "@/utils/calculateTime";
import { Line } from "rc-progress";

const MyEnrollment = () => {
  const { enrolledCourses, fetchEnrolledCourses } = useEnrolledCoursesStore();

  const [progressArray] = useState([
    { lectureCompleted: 2, totallectures: 4 },
    { lectureCompleted: 1, totallectures: 5 },
    { lectureCompleted: 3, totallectures: 6 },
    { lectureCompleted: 4, totallectures: 4 },
    { lectureCompleted: 0, totallectures: 3 },
    { lectureCompleted: 5, totallectures: 7 },
    { lectureCompleted: 6, totallectures: 8 },
    { lectureCompleted: 2, totallectures: 6 },
    { lectureCompleted: 4, totallectures: 10 },
    { lectureCompleted: 3, totallectures: 5 },
    { lectureCompleted: 7, totallectures: 7 },
    { lectureCompleted: 1, totallectures: 4 },
    { lectureCompleted: 0, totallectures: 2 },
    { lectureCompleted: 5, totallectures: 5 },
  ]);

  useEffect(() => {
    fetchEnrolledCourses();
  }, [fetchEnrolledCourses]);

  return (
    <div className="container mx-auto text-white px-6 md:px-10">
      <h1 className="text-center pb-5 text-2xl font-semibold pt-4">
        This is my enrollment page
      </h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-300">Course</TableHead>
            <TableHead className="text-gray-300">Duration</TableHead>
            <TableHead className="text-gray-300">Complete</TableHead>
            <TableHead className="text-right text-gray-300">Status</TableHead>
          </TableRow>
        </TableHeader>

        {enrolledCourses.length > 0 ? (
          <TableBody>
            {enrolledCourses.map((course, ind) => {
              // safe progress calculation
              const pItem = progressArray[ind];
              const progress =
                pItem && pItem.totallectures > 0
                  ? (pItem.lectureCompleted * 100) / pItem.totallectures
                  : 0;
              const progressRounded = Math.round(progress);

              return (
                <TableRow key={course._id ?? ind}>
                  <TableCell className="flex items-center gap-3">
                    <img
                      src={course?.courseThumbnail}
                      className="w-[100px] rounded"
                      alt={course?.courseTitle ?? "thumbnail"}
                    />
                    <div className="w-[140px]">
                      <Line
                        percent={progressRounded}
                        strokeWidth={4}
                        strokeColor="#10b981" // emerald-500
                        trailWidth={4}
                        trailColor="#e5e7eb" // gray-200
                      />
                      <div className="text-xs text-gray-300 mt-1">
                        {progressRounded}%
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>{calculateCourseDuration(course)}</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        ) : (
          <TableBody>
            <TableRow>
              <TableCell colSpan={4} className="text-center text-red-500 py-8">
                No Course Found
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>

      {console.log(enrolledCourses)}
    </div>
  );
};

export default MyEnrollment;
