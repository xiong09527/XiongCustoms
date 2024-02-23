import React from "react";

function Spinner() {
  return (
    <div className=" absolute z-50  w-[100%] h-screen">
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
      </div>
    </div>
  );
}

export default Spinner;
