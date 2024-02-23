import React, { useEffect, useState } from "react";
import BlogCart from "../components/Blogs/BlogCart";
import { useQuery } from "@apollo/client";
import { GET_BLOGS } from "../queries/blogQueries";

const BlogPage = () => {
  const { loading, error, data } = useQuery(GET_BLOGS);

  if (loading) return <h1 className=" text-center">Loading...</h1>;
  if (error) return <h1 className=" text-center">Error: {error.message}</h1>;

  return (
    <div className="px-[10px] md:px-[20px] lg:px-[10%] pb-10">
      <div className=" flex justify-between  items-center text-slate-700 hover:text-slate-900 font-semibold">
        <div className=" text-lg lg:text-xl uppercase font-bold text-primary my-8">
          <img src="/Line 1.png" className=" inline-block  h-1" /> Blogs
        </div>

        <div></div>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 2 lg:grid-cols-3 gap-5">
        {data && data.blogs && data.blogs.length > 0 ? (
          data.blogs.map((b) => (
            <BlogCart
              key={b.id}
              id={b.id}
              title={b.title}
              thumbnail={b.thumbnail}
              description={b.description}
              userId={b.userId}
              user={b.user}
              date={b.createdAt}
            />
          ))
        ) : (
          <h1>No blog available</h1>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
