import React, { useEffect, useState } from "react";

// State for storing user data for name, email, and password
const RegisterForm = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  }); // State to hold user data

  // State for storing avatar preview
  const [avatarPreview, setAvatarPreview] = useState("/avatar.png");

  // Hook to handle form input changes
  useEffect(() => {
    // Get userData from localStorage
    const userDataFromLocalStorage = localStorage.getItem("userData");
    if (userDataFromLocalStorage) {
      // Parse the JSON string and set it to the state
      const parsedUserData = JSON.parse(userDataFromLocalStorage);
      setUserData(parsedUserData);
    }
  }, []);

  // Render the form
  return (
    <div className="   px-[10px] md:px-[20px] lg:px-[10%]    ">
      {/* {userData ? ( */}
      <div className="bg-white flex items-center justify-center border rounded-lg py-8 px-10  md:flex-row  shadow-lg">
        <h1 className=" lg:text-2xl font-bold text-orange-500">
          Thank you so much for stopping by!
        </h1>
      </div>
    </div>
  );
};

export default RegisterForm;
