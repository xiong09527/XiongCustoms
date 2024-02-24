import Link from "next/link";
import React from "react";

const MessageCart = ({ name, subject, text, id }) => {
  return (
    <Link href={`/admin/message/${id}`}>
      <div className="bg-white m-5 p-2">
        <div className="flex  hover:underline cursor-pointer">
          <h1 className="font-bold text-slate-800">{name}</h1>
          <h1 className="ml-2">{subject}</h1>
        </div>
        <p className="leadin ">message: {text}</p>
      </div>
    </Link>
  );
};

export default MessageCart;
