import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../../mutations/userMutation";
import { useMutation } from "@apollo/client";

// Login component
const Login = () => {
  // Use the useNavigate hook to redirect the user
  const navigate = useNavigate();

  // State to store form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Function to handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [loginUser] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      // Extract the user data from the response
      const { id, name, email, avatar, admin, token } = data.loginUser;

      // Store the user data in the local storage
      localStorage.setItem(
        "userData",
        JSON.stringify({ id, name, email, avatar, admin, token })
      );
      console.log("User registered successfully!");
    },
    onError: (error) => {
      console.error("Error registering user:", error);
      // Handle the error, display a message to the user, or perform other actions
    },
  });

  // Function to handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic form validation
    const { email, password } = formData;

    // Check if the email and password are provided
    if (!email || !password) {
      console.log(alert("required field"));
      return;
    }

    try {
        // Pass variables object with name, email, password, and avatar
      await loginUser({
        variables: { email, password }, 
      });

      // Reset form state
      setFormData({ email: "", password: "" });

      // Redirect to home page
      navigate("/");
    } catch (error) {
      console.error("Error registering user:", error);
      // Handle the error, display a message to the user, or perform other actions
    }
  };

  // Render the login form
  return (
    <>
      <section className="bg-gray-50 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow darksss:border md:mt-0 sm:max-w-md xl:p-0  ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl darksss:text-white">
                Log in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  {/* Email input */}
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 darksss:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="outline-orange-500 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-oragnge-600 focus:border-oragnge-600 block w-full p-2.5 darksss:bg-gray-700 darksss:border-gray-600 darksss:placeholder-gray-400 darksss:text-white darksss:focus:ring-blue-500 darksss:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>

                {/* Password input */}
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 darksss:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    placeholder="Enter Your Password"
                    onChange={handleInputChange}
                    className="outline-orange-500 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-oragnge-600 focus:border-oragnge-600 block w-full p-2.5 darksss:bg-gray-700 darksss:border-gray-600 darksss:placeholder-gray-400 darksss:text-white darksss:focus:ring-blue-500 darksss:focus:border-blue-500"
                    required
                  />
                </div>
                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-oragnge-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center darksss:bg-oragnge-600 darksss:hover:bg-oragnge-700 darksss:focus:ring-oragnge-800"
                >
                  Login
                </button>
                {/* Link to register page */}
                <p className="text-sm font-light text-gray-500 darksss:text-gray-400">
                  Dont Have an account?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-orange-500 hover:underline darksss:text-oragnge-500"
                  >
                    Register here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
