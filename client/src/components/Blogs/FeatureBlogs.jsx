import React from "react";
import { Link } from "react-router-dom";

import BlogCart from "./BlogCart";
import { useQuery } from "@apollo/client";
import { GET_BLOGS } from "../../queries/blogQueries";

// FeatureBlogs component
const FeatureBlogs = () => {
  // Query to get all blogs
  const { loading, error, data } = useQuery(GET_BLOGS);

  // If the data is loading, display a loading message
  if (loading) return <h1 className="text-center items-center ">Loading...</h1>;

  // If there is an error, display an error message
  if (error)
    return (
      <h1 className="text-center items-center ">Error: {error.message}</h1>
    );

  return (
    <div className="px-[10px] md:px-[20px] lg:px-[10%] pb-10">
      {/* Header section for featured blogs */}
      <div className=" flex justify-between  items-center text-slate-700 hover:text-slate-900 font-semibold">
        <div className=" text-lg lg:text-xl uppercase font-bold text-primary my-8">
          {/* Images with feature blogs*/}
          <img src="/Line 1.png" className=" inline-block  h-1" /> Feature Blogs <img src="/Line 1.png" className=" inline-block  h-1" />
        </div>

        {/* Link to see all blogs */}
        <div>
          <Link to="/blogs ">See All </Link>
        </div>
      </div>
      {/* Grid to display the featured blogs */}
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data && data.blogs && data.blogs.length > 0 ? (
          
          //Map through the blogs and display the blog card 
          data.blogs
            .slice(0, 3)
            .map((b) => (
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
          // If there are no blogs, display a message
          <h1>No blog available</h1>
        )}
      </div>
    </div>
  );
};

export default FeatureBlogs;
