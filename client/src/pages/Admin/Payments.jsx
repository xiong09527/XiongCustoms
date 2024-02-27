import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Admin from "./Admin";
import { useQuery } from "@apollo/client";
import { GET_PAYMENTS } from "../../queries/payment";

// Payments component
const Payments = () => {
  // State to store userData fetch from local storage
  const [userData, setUserData] = useState("");

  // Get userData from localStorage
  useEffect(() => {
    const userDataFromLocalStorage = localStorage.getItem("userData");
    if (userDataFromLocalStorage) {
      setUserData(JSON.parse(userDataFromLocalStorage));
    }
  }, []);

  // Query to get all payments
  const { loading, error, data } = useQuery(GET_PAYMENTS, {
    variables: { adminId: userData.id },
  });


  return (
    <Admin className="">
      <>
        {/* Condition rendering based if payments are found*/}
        {!data?.payments && <h1 className=" text-center">No Payments found</h1>}{" "}
        {
          <div className=" lg:mx-[20%] border">
            {/* Header displayed when payments are found */}
            {data?.payments && (
              <h1 className=" text-center my-3 text-lg font-semibold">
                All Payments
              </h1>
            )}
            {/* render each payment */}
            {data?.payments
              ?.slice()
              ?.reverse()
              ?.map((m) => (
                <Link
                  to={`/admin/payments/${m.id}`}
                  className={`${
                    m.seen === false ? "bg-gray-50" : "bg-white"
                  } hover:cursor-pointer hover:shadow-lg  hover:bg-slate-50  py-1 px-2 border-t  flex  items-center text-slate-800 `}
                  key={m.id}
                >
                  <h1 className=" w-[12vw]  line-clamp-1 ">{m.name}</h1>
                  <h1 className=" w-[15vw]  line-clamp-1 ">
                    $ {m.amount / 100}
                  </h1>
                  <h1 className=" flex-1  line-clamp-1 mr-3">{m.status}</h1>
                  <p className=" text-xs">
                    {(() => {
                      const date = new Date(m.createdAt);
                      const day = date.getDate();
                      const month = date.toLocaleString("default", {
                        month: "short",
                      });
                      const hour = date.getHours() % 12 || 12; // Convert to 12-hour format
                      const minute = String(date.getMinutes()).padStart(2, "0");
                      const period = date.getHours() >= 12 ? "PM" : "AM";

                      return `${day} ${month} ${hour}:${minute} ${period}`;
                    })()}
                  </p>
                </Link>
              ))}
          </div>
        }
      </>
    </Admin>
  );
};

export default Payments;
