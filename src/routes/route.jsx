import MainLayout from "@/layout/MainLayout";
import React from "react";
import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "@/pages/ErrorPage";
import Home from "@/pages/Home";
import CourseList from "@/pages/CourseList";
import CourseDetails from "@/pages/CourseDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/course-list",
        element: <CourseList />,
      },
      {
        path: "/course-list/:input",
        element: <CourseList />,
      },
      {
        path: "/course-details/:id",
        element: <CourseDetails />,
      },
    ],
  },
]);

export default router;
