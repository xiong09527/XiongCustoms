import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import Admin from "./Admin";
import Spinner from "../../components/Spinner";
import { BiChevronLeft } from "react-icons/bi";
import { GET_PAYMENT } from "../../queries/payment";

const PaymentDetails = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userDataFromLocalStorage = localStorage.getItem("userData");
    if (userDataFromLocalStorage) {
      setUserData(JSON.parse(userDataFromLocalStorage));
    }
  }, []); // Update useEffect dependency array

  const { loading, error, data } = useQuery(GET_PAYMENT, {
     // Use userData?.id to avoid accessing id on null userData
    variables: { adminId: userData?.id, paymentId: id },
  });

  return (
    <Admin>
      <div className=" overflow-hidden p-5 lg:mx-[20%] border">
        <Link to="/admin/payments" className="">
          <div className=" bg-gray-50 px-1 py-1 inline-block  border rounded">
            <BiChevronLeft className="text-2xl  " />
          </div>
        </Link>
        <div className=" flex items-center justify-center">
          {loading && <Spinner />}
          {error && <p>Error: {error.payment}</p>}
        </div>

        {data && (
          <>
            <div
              key={data.payment.paymentId}
              className="border p-4 rounded-md shadow-md"
            >
              <p>
                <strong>Payment ID:</strong> {data.payment.paymentId}
              </p>
              <p>
                <strong>User ID:</strong> {data.payment.userId}
              </p>
              <p>
                <strong>Amount:</strong> {data.payment.amount}
              </p>
              <p>
                <strong>Status:</strong> {data.payment.status}
              </p>
              <p>
                <strong>Paid:</strong> {data.payment.paid / 100 ? "Yes" : "No"}
              </p>
              <p>
                <strong>Amount Captured:</strong>{" "}
                {data.payment.amount_captured / 100}
              </p>
              <p>
                <strong>City:</strong> {data.payment.city}
              </p>
              <p>
                <strong>Country:</strong> {data.payment.country}
              </p>
              <p>
                <strong>Line 1:</strong> {data.payment.line1}
              </p>
              <p>
                <strong>Post Code:</strong> {data.payment.postCode}
              </p>
              <p>
                <strong>Name:</strong> {data.payment.name}
              </p>
              <p>
                <strong>Email:</strong> {data.payment.email}
              </p>
              <p>
                <strong>Receipt URL:</strong>{" "}
                <a
                  className=" underline hover:text-slate-900 text-slate-600"
                  href={data.payment.receipt_url}
                  target="_blank"
                >
                  Click here to get recipt
                </a>
              </p>
            </div>
          </>
        )}
      </div>
    </Admin>
  );
};

export default PaymentDetails;
