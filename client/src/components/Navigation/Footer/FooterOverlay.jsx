
import { Link } from "react-router-dom";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

// FooterOverlay component
const FooterOverlay = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-blue-950 text-white w-[80%] min-h-[20vh] text-center py-5 rounded-xl translate-y-20 flex flex-col justify-center items-center ">
        <h1 className="text-2xl md:text-3xl font-bold my-3">
          Let's keep the culture alive!!
        </h1>
        <p>
        Donate And Help Make a Meaningful Impact!
        </p>
        {/* Path for the donate page */}
        <Link
          to="/donate"
          className="flex flex-row my-4  md:mt-5 justify-center items-center text-xl bg-orange-500 hover:bg-orange-600 rounded-lg hover:bg-primaryWhite text-white px-3 py-2  "
        >
          Donate <BsArrowRight className=" mx-2" />
        </Link>
      </div>
    </div>
  );
};

export default FooterOverlay;
