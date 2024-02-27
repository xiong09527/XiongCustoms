import React, { useEffect, useState } from "react";
import { GET_MESSAGE } from "../../queries/messageQueries";
import { useMutation, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import Admin from "./Admin";
import Spinner from "../../components/Spinner";
import { BiChevronLeft } from "react-icons/bi";

// MessageDetails component
const MessageDetails = () => {
  // usParams hook to access the id
  const { id } = useParams();
  // State to store userData fetch from local storage
  const [userData, setUserData] = useState(null);

  // Get userData from localStorage
  useEffect(() => {
    const userDataFromLocalStorage = localStorage.getItem("userData");
    if (userDataFromLocalStorage) {
      setUserData(JSON.parse(userDataFromLocalStorage));
    }
  }, []); // Update useEffect dependency array

  // Query to get a message
  const { loading, error, data } = useQuery(GET_MESSAGE, {
    variables: { adminId: userData?.id, messageId: id }, // Use userData?.id to avoid accessing id on null userData
  });

  // Render the component wrapped with <Admin> Layout
  return (
    <Admin>
      <div className=" overflow-hidden p-5 lg:mx-[20%] border">
        {/* Link to go back to messages */}
        <Link to="/admin/messages" className="">
          <div className=" bg-gray-50 px-1 py-1 inline-block  border rounded">
            <BiChevronLeft className="text-2xl  " />
          </div>
        </Link>
        <div className=" flex items-center justify-center">
          {/* Display spinner while loading and error message on error */}
          {loading && <Spinner />}
          {error && <p>Error: {error.message}</p>}
        </div>

        {/* Display the message details */}
        {data && (
          <>
            <h1 className=" text-xl font-bold text-slate-900 ">
              Subject: {data?.message?.subject}
            </h1>
            <h3 className=" text-lg  text-slate-900">
              Name: {data?.message?.name}
            </h3>

            <h3 className=" text-lg  text-slate-900">
              Email:{" "}
              <a href={`mailto: ${data?.message?.email}`}>
                {" "}
                {data?.message?.email}
              </a>
            </h3>

            <p className="   text-slate-700">Message: {data?.message?.text}</p>
          </>
        )}
      </div>
    </Admin>
  );
};

export default MessageDetails;
