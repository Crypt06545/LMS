import CourseCard from "@/components/CourseCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useCourseStore from "@/store/AllCourse.store";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CourseList = () => {
  const [input, setInput] = useState("");
  const { allCourses, fetchAllCourses } = useCourseStore();
  const [filteredCourse, setFilteredCourse] = useState([]);
  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice();
      input
        ? setFilteredCourse(
            tempCourses.filter((item) =>
              item.courseTitle.toLowerCase().includes(input.toLocaleLowerCase())
            )
          )
        : setFilteredCourse(tempCourses);
    }
  }, [allCourses, input]);
  const onSearchHandler = (e) => {
    e.preventDefault();
    // console.log("Searching for:", input);
    // your search logic here
  };
  useEffect(() => {
    fetchAllCourses();
  }, [fetchAllCourses]);

  return (
    <div className="container mx-auto text-gray-200 px-4 sm:px-8 min-h-screen">
      {/* Title + Breadcrumb + Search */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        {/* Left: Heading + Breadcrumb */}
        <div>
          <h1 className="text-2xl font-medium mb-2 lg:mb-3">Course List</h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link
                  to="/"
                  className="text-sm font-medium text-gray-200 hover:text-gray-400"
                >
                  Home
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-gray-300">
                  Course List
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Right: Search bar */}
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <form onSubmit={onSearchHandler}>
            <Input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Search for course..."
              className="pl-10 pr-24 py-6 text-gray-200 bg-transparent border border-gray-600"
            />
            <Button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-4 text-sm bg-transparent border border-gray-600 hover:border-white hover:text-white cursor-pointer py-2 rounded-md transition"
            >
              Search
            </Button>
          </form>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
        {filteredCourse.length > 0 ? (
          filteredCourse.map((course) => (
            <CourseCard key={course?._id} course={course} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-200">
            No course found.
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
