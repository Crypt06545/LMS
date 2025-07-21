import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { dummyCourses } from "@/assets/assets";
const CourseCard = ({ course }) => {
  const [allCourses, setAllCourses] = useState([]);
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };
  return (
    <div>
      <Card>
        <div>
          <img src="" alt="" />
        </div>
        <CardContent>
          {/* <p>{course.CourseThumbnail}</p> */}
          {console.log(allCourses)}
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseCard;
