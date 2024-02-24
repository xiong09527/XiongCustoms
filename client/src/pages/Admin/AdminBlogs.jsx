import React from "react";
import Admin from "./Admin";
import { GET_BLOGS } from "../../queries/blogQueries";
import { useQuery } from "@apollo/client";
import AdminBlogCard from "../../components/Admin/Blogs/AdminBlogCard";
import Spinner from "../../components/Spinner";

const AdminBlogs = () => {
  const { loading, error, data } = useQuery(GET_BLOGS);

  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <Admin>
      <>
        {loading && <Spinner />}

        {!loading && !error && (
          <div className="px-[10px] md:px-[20px] lg:px-[10%] flex flex-row flex-wrap items-center justify-center ">
            {data && data.blogs && data.blogs.length > 0 ? (
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
              <h1>No blog available</h1>
            )}
          </div>
        )}
      </>
    </Admin>
  );
};

export default AdminBlogs;
