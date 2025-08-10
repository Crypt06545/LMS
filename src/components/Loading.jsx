import React from "react";
import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Loader className="text-gray-200 animate-spin w-12 h-12" />
    </div>
  );
};

export default Loading;
