import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { DELETE_BLOG } from "../../../mutations/blogMutation";
import { GET_BLOGS } from "../../../queries/blogQueries";
import { useMutation, useQuery } from "@apollo/client";

const AdminBlogCard = ({ id, title, thumbnail, description, date, user }) => {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    // Get userData from localStorage
    const userDataFromLocalStorage = localStorage.getItem("userData");
    if (userDataFromLocalStorage) {
      // Parse the JSON string and set it to the state
      const parsedUserData = JSON.parse(userDataFromLocalStorage);
      setUserData(parsedUserData);
    }
  }, []);

  const [deleteBlog] = useMutation(DELETE_BLOG, {
    refetchQueries: [{ query: GET_BLOGS }],
    onError: (error) => {
      console.error("Error deleting user:", error);
      // Handle the error, display a message to the user, or perform other actions
    },
  });

  const { loading, error, data } = useQuery(GET_BLOGS);

  const deleteBlogHandler = (id) => {
    deleteBlog({ variables: { blogId: id, adminId: userData.id } });
  };
  if (loading) {
    return (
      <h1
        className=" text-center
    "
      >
        Loading...
      </h1>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden m-3 w-full md:w-80 ">
      <div className="group border-b h-52 md:h-64  bg-green-300 overflow-hidden relative ">
        {/* button */}
        <div
          className={`z-40 hidden group-hover:flex absolute top-1 right-1 bg-slate-800 bg-opacity-90 px-2 py-1 rounded-lg `}
        >
          <button onClick={() => deleteBlogHandler(id)}>
            <MdDelete className="text-white hover:text-red-400" />
          </button>
        </div>
        <img
          className="h-full w-full hover:scale-105 duration-100 cursor-pointer"
          src={`${thumbnail}`}
          alt=""
        />
      </div>
      <div className="p-2 flex flex-col  justify-betweens justify-between ">
        <p className="text-white bg-btn1 w-fit px-3 rounded-full my-1"></p>
        <Link
          to={`/blogs/${id}`}
          className="text-lg h-[60px]  font-bold text-tertiary line-clamp-2 hover:underline "
        >
          {title}
        </Link>
        <p className="text-primary line-clamp-2">{description}</p>
        <div className="flex mt-5">
          <img
            className="h-8 w-8 rounded-full mr-3"
            src={`${user?.avatar}`}
            alt=""
          />
          <div>
            <h1 className="text-sm font-bold text-secondary ">{user?.name}</h1>
            <p className="text-sm font-semibold text-primary ">{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogCard;
