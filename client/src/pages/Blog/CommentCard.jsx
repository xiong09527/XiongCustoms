import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import { DELETE_COMMENT } from "../../mutations/commentMutations";
import { useMutation } from "@apollo/client";
import { GET_BLOG } from "../../queries/blogQueries";
function CommentCard({
  commentId,
  name,
  comment,
  avatar,
  date,
  userId,
  blogId,
}) {
  const [userData, setUserData] = useState([]);
  let [activeOption, setActiveOption] = useState("");
  console.log(commentId);
  useEffect(() => {
    // Get userData from localStorage
    const userDataFromLocalStorage = localStorage.getItem("userData");
    if (userDataFromLocalStorage) {
      const parsedUserData = JSON.parse(userDataFromLocalStorage);
      setUserData(parsedUserData);
    }
  }, []);

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    refetchQueries: [{ query: GET_BLOG, variables: { blogId } }],
    onError: (error) => {
      console.error("Error deleting comment:", error);
    },
  });

  const deleteCommentHandler = async (commentId) => {
    deleteComment({ variables: { userId: userData.id, commentId: commentId } });
    setActiveOption(!activeOption);
  };

  return (
    <div className="mb-3 border-bs border rounded p-2 shadow">
      <div className=" flex items-center ">
        <img
          className="h-10 rounded-full "
          src={avatar || "/avatar.png"}
          alt=""
        />
        <p className=" ml-3 text-lg font-semibold">{name}</p>
      </div>
      <div className="flex justify-between">
        <p>{comment}</p>
        <div className=" felx flex-col items-end justify-end">
          {userData.id === userId && (
            <div className="flex text-[#FF7A00] justify-end">
              <button className=" hover:text-slate-black relative">
                <BsThreeDotsVertical
                  onClick={() => setActiveOption(commentId)}
                  className="text-slate-800 hover:text-slate-black"
                />
                <div
                  className={` ${
                    activeOption === commentId ? "" : "hidden "
                  }bg-white  shadow-xl border border-slate-100  absolute right-1 z-[199]     `}
                >
                  <div className=" flex justify-end">
                    <IoCloseOutline
                      onClick={() => setActiveOption("")}
                      className=" text-red-500"
                    />
                  </div>
                  <ul>
                    <li>
                      <button
                        onClick={() => deleteCommentHandler(commentId)}
                        className="text-sm hover:bg-red-500 px-2 py-1 hover:text-white"
                      >
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
              </button>
            </div>
          )}
          <p> {(date && date) || "February, 22 2023"}</p>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
