import React from "react";
import { Link } from "react-router-dom";

// Component to display the blog card in the blog page
const BlogCart = ({
  date,
  user,
  id,
  title,
  thumbnail,
  description,
  userId,
}) => {
  return (
    // Card container
    <div className="bg-white min-w-[260px]  shadow-lg rounded-lg overflow-hidden m-1 w-full pb-2 ">

      {/* Image Container */}
      <div className="border-b h-52  bg-green-300 overflow-hidden ">

        {/* Image */}
        <img
          className="h-full w-full object-cover"
          src={`${thumbnail}`}
          alt=""
        />
      </div>

      {/* Content Container */}
      <div className="p-2 flex flex-col  justify-betweens justify-between ">
        <p className="text-white bg-btn1 w-fit px-3 rounded-full my-1">
          {/* {category} */}
        </p>
        <Link
          to={`/blogs/${id}`}
          className="text-lg h-[60px] font-bold text-tertiary line-clamp-2 hover:underline "
        >
          {title}
        </Link> 

         {/* Blog description */}
        <p className="text-primary line-clamp-2 h-[50px] ">
          {description.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}{index < description.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>

        {/* Author details */}
        <div className="flex mt-5">
          <img
            className="h-8 w-8 rounded-full mr-3"
            src={`${user?.avatar}`}
            alt=""
          />
          <div>
            <h1 className="text-sm font-bold text-secondary ">{user?.name}</h1>
            <p className="text-sm font-semibold text-slate-700 ">{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCart;
