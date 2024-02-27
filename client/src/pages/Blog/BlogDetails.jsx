import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GET_BLOG } from "../../queries/blogQueries";
import { useMutation, useQuery } from "@apollo/client";
import CommentCard from "./CommentCard";
import { MdRateReview } from "react-icons/md";
import { CREATE_COMMENT } from "../../mutations/commentMutations";


const BlogDetails = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get userData from localStorage
    const userDataFromLocalStorage = localStorage.getItem("userData");
    if (userDataFromLocalStorage) {
      const parsedUserData = JSON.parse(userDataFromLocalStorage);
      setUserData(parsedUserData);
    }
  }, []);

  const [comment, setComment] = useState("");

  const { loading, error, data } = useQuery(GET_BLOG, {
    variables: { blogId: id },
  });

  const [createComment] = useMutation(CREATE_COMMENT, {
    refetchQueries: [{ query: GET_BLOG, variables: { blogId: id } }],
  });

  // Function to handle form submission
  const commentSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      // Execute the mutation
      // console.log("trying");
      await createComment({
        variables: {
          comment: comment,
          blogId: id,
          userId: userData.id,
        },
      });

      // Reset the comment text after successful submission
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      // Handle error, show a message to the user, etc.
    }
  };

  if (loading) return <h1 className=" text-center">Loading...</h1>;
  if (error) return <p className=" text-center">Something went wrong</p>;

  return (
    <div className="bg-bgc min-h-screen w-full  p-4 border rounded shadow-sm lg:px-[20%]">
      <h2 className="text-2xl font-semibold mb-4">Details</h2>

      <div className="flex mt-5 ">
        {data && data.blog && (
          <img
            className="h-10 w-10 rounded-full mr-3"
            src={data.blog.user.avatar}
            alt=""
          />
        )}
        <div>
          <h1 className="text-sm font-bold text-secondary ">
            {data.blog.user.name}
          </h1>
          <p className="text-sm font-semibold text-primary ">
            {data.blog?.createdAt?.toLocaleString()}
          </p>
        </div>
      </div>

          {/* Blog Thumbnail */}
      <div>
        <div className="mb-5 flex items-center justify-center">
          {data && data.blog && (
            <img className="h-52 my-5" src={data.blog.thumbnail} alt="" />
          )}
        </div>

        {/* Blog Title and Description */}
        <h1 className="text-2xl lg:text-5xl font-semibold text-secondary mb-5">
          {data && data.blog ? data.blog.title : "Title not found"}
        </h1>
        <p>
          {data && data.blog ? data.blog.description.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}{index < data.blog.description.split('\n').length - 1 && <br />}
            </React.Fragment>
          )) : "Description not found"}
        </p>
      </div>

            {/* Comments */}
      <div className="flex flex-col bg-white shadow my-10 px-2 py-3  rounded mb-10">
        <form
          onSubmit={commentSubmitHandler}
          className=" border shadow rounded p-2 "
        >
          <label
            htmlFor="review"
            className=" hover:text-slate-700 text-start hover:underline my-5"
          >
            <span>
              <MdRateReview className="  inline-block" />
            </span>
            Create Comment
          </label>
          <textarea
            id="review"
            className="bg-blue-50 border outline-none w-full px-1 py-2 mt-2"
            type="text"
            placeholder="write comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <div className=" flex items-center">
            <button
              disabled={!userData}
              className=" uppercase rounded-sm bg-orange-500 hover:bg-orange-600 text-white  px-3 py-1 my-2"
            >
              submit
            </button>
          </div>
        </form>

        <div className="flex mt-5 items-center justify-between">
          <h1 className="mb-5">Comments</h1>
        </div>

        <div className=" flex flex-col ">
          {/* {product?.reviews?.map((r) => ( */}

          {data.blog.comments.map((c) => (
            <CommentCard
              key={c.id}
              comment={c.comment}
              avatar={c.user?.avatar}
              name={c.user?.name}
              date={c.createdAt}
              userId={c.userId}
              commentId={c.id}
              blogId={c.blogId}
            />
          ))}
        </div>
      </div>

      {/* Related Blog */}
    </div>
  );
};

export default BlogDetails;
