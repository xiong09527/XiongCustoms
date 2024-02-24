import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Admin = ({ children }) => {
    // State to keep track  of active navigation
  const [navIndex, setIndex] = useState("/admin/users;");
  const navigate = useNavigate();

  // Function to handle navigation clicks
  const navClickHandler = (id) => {
    setIndex(id);
    navigate(id);
  };


  return (
  <div>
      {/* Navigation menu */}
      <div className=" flex items-center justify-center py-3">
        <ul className=" grid grid-cols-4 md:grid-cols-5 rounded border  ">
          <li
            onClick={() => navClickHandler("/admin/create-blog")}
            className={`${
              navIndex === "/admin/create-blog"
                ? " bg-orange-500  text-white"
                : ""
            } px-2 py-1 border border-r text-center hover:bg-orange-500 hover:text-white cursor-pointer`}
          >
            Create
          </li>
          <li
            onClick={() => navClickHandler("/admin/blogs")}
            className={` 
            ${navIndex === "/admin/blogs" ? " bg-orange-500  text-white" : ""} 
            px-2 py-1 border border-r text-center hover:bg-orange-500 hover:text-white cursor-pointer`}
          >
            Blogs
          </li>
          <li
            onClick={() => navClickHandler("/admin/messages")}
            className={` 
            ${
              navIndex === "/admin/messages" ? " bg-orange-500  text-white" : ""
            } 
            px-2 py-1 border border-r text-center hover:bg-orange-500 hover:text-white cursor-pointer`}
          >
            Messages
          </li>
          <li
            onClick={() => navClickHandler("/admin/users")}
            className={`
            ${navIndex === "/admin/users" ? " bg-orange-500  text-white" : ""} 
            px-2 py-1 border border- text-center hover:bg-orange-500 hover:text-white cursor-pointer`}
          >
            Users
          </li>
        </ul>
      </div>
      {children}
    </div>
  );
};

export default Admin;
