import React from "react";
import { Link } from "react-router-dom";


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
    <div className="bg-white min-w-[260px]  shadow-lg rounded-lg overflow-hidden m-1 w-full pb-2 ">
      <div className="border-b h-52  bg-green-300 overflow-hidden ">
        <img
          className="h-full w-full object-cover"
          src={`${thumbnail}`}
          alt=""
        />
      </div>
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
        <p className="text-primary line-clamp-2 h-[50px] ">{description}</p>
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
