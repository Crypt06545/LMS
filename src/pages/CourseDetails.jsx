import React from "react";
import { useParams } from "react-router-dom";

const CourseDetails = () => {
  const {id} =useParams()
  return (
    <div className="container mx-auto px-8">
      This is Course Details page {id}
      {console.log(id)}
    </div>
  );
};

export default CourseDetails;
