import React from "react";
import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="absolute w-full h-full top-0 left-0 bg-black/50 flex flex-col items-center justify-center">
      <FaSpinner className="text-white w-8 h-8 animate-spin" />
    </div>
  );
};

export default Loading;
