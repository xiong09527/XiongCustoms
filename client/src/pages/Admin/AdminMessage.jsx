import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Admin from "./Admin";
import { useMutation, useQuery } from "@apollo/client";
import { GET_MESSAGES } from "../../queries/messageQueries";
import { DELETE_MESSAGE } from "../../mutations/messageMutation";

// AdminMessage component
const AdminMessage = () => {
  // State to store the active option
  let [activeOption, setActiveOption] = useState("");
  // State to store userData fetch from local storage
  const [userData, setUserData] = useState("");

  // Get userData from localStorage
  useEffect(() => {
    const userDataFromLocalStorage = localStorage.getItem("userData");
    if (userDataFromLocalStorage) {
      setUserData(JSON.parse(userDataFromLocalStorage));
    }
  }, [userData.id]);

  // Query to get all messages
  const { loading, error, data } = useQuery(GET_MESSAGES, {
    variables: { adminId: userData.id },
  });

  // Mutation to delete a message
  const [deleteMessage] = useMutation(DELETE_MESSAGE, {
    refetchQueries: [
      { query: GET_MESSAGES, variables: { adminId: userData.id } },
    ],
    onError: (error) => {
      console.error("Error deleting user:", error);
    },
  });

  // Function to handle the delete message button click
  const deleteMessageHandler = async (id) => {
    deleteMessage({ variables: { messageId: id, adminId: userData.id } });
    setActiveOption(!activeOption);
  };

  return (
    <Admin className="">
      <>
      {/* Condition rendering based if messages are found*/}
        {!data?.messages && <h1 className=" text-center">No Message found</h1>}{" "}
        {
          <div className=" lg:mx-[20%] border">
            {/* Header for message section */}
            <h1 className=" text-center my-3 text-lg font-semibold">
              All Messages
            </h1>
            {/* render each message */}
            {data?.messages
              ?.slice()
              ?.reverse()
              ?.map((m) => (
                <div
                // Condition rendering based on if message is seen or not
                  className={`${
                    m.seen === false ? "bg-gray-50" : "bg-white"
                  } hover:cursor-pointer hover:shadow-lg  hover:bg-slate-50  py-1 px-2 border-t  flex  items-center text-slate-800 `}
                  key={m.id}
                >
                  {/* Link to message details page */}
                  <Link
                    className="flex  items-center flex-1 justify-between "
                    to={`/admin/message/${m.id}`}
                  >
                    {/* Message details */}
                    <h1 className=" w-[12vw]  line-clamp-1 ">{m.name}</h1>
                    <h1 className=" w-[15vw]  line-clamp-1 ">{m.subject}</h1>
                    <h1 className=" flex-1  line-clamp-1 mr-3">{m.text}</h1>
                    {/* Date of message */}
                    <p className=" text-xs">
                      {(() => {
                        const date = new Date(m.createdAt);
                        const year = date.getFullYear();
                        const day = date.getDate();
                        const month = date.toLocaleString("default", {
                          month: "short",
                        });
                        const hour = date.getHours() % 12 || 12; // Convert to 12-hour format
                        const minute = String(date.getMinutes()).padStart(
                          2,
                          "0"
                        );
                        const period = date.getHours() >= 12 ? "PM" : "AM";

                        return `${month} ${day} ${year} ${hour}:${minute} ${period}`;
                      })()}
                    </p>
                  </Link>
                  {/* dropdown menu */}
                  <button className=" hover:text-slate-black relative">
                    <BsThreeDotsVertical
                      onClick={() => setActiveOption(m.id)}
                      className="text-slate-800 hover:text-slate-black"
                    />
                    <div
                      className={` ${
                        activeOption === m.id ? "" : "hidden "
                      }bg-white  shadow-xl border border-slate-100  absolute right-1 z-[199]     `}
                    >
                      <div className=" flex justify-end">
                        <IoCloseOutline
                          onClick={() => setActiveOption("")}
                          className=" text-red-500"
                        />
                      </div>
                      <ul>
                        {/* Delete message */}
                        <li>
                          <button
                            onClick={() => deleteMessageHandler(m.id)}
                            className="text-sm hover:bg-red-500 px-2 py-1 hover:text-white"
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </button>
                </div>
              ))}
          </div>
        }
      </>
    </Admin>
  );
};

export default AdminMessage;
