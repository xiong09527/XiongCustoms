import React from "react";
import Admin from "./Admin";
import { GET_BLOGS } from "../../queries/blogQueries";
import { useQuery } from "@apollo/client";
import AdminBlogCard from "../../components/Admin/Blogs/AdminBlogCard";
import Spinner from "../../components/Spinner";

// AdminBlogs component
const AdminBlogs = () => {
  // Query to get all blogs
  // Destructure loading, error, and data from the useQuery hook
  const { loading, error, data } = useQuery(GET_BLOGS);
  // If there is a error, display an error message
  if (error) return <h1>Error: {error.message}</h1>;

  // Admin component
  return (
    <Admin>
      <>
        {/* If the data is loading, display a loading spinner */}
        {loading && <Spinner />}

        {/* If there is no loading and no error, display the blogs */}
        {!loading && !error && (
          <div className="px-[10px] md:px-[20px] lg:px-[10%] flex flex-row flex-wrap items-center justify-center ">
            {/* Map through the blogs and display the blog card */}
            {data && data.blogs && data.blogs.length > 0 ? (
              // Map through the blogs and display the blog card
              data.blogs.map((b) => (
                <AdminBlogCard
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
        )}
      </>
    </Admin>
  );
};

export default AdminBlogs;
