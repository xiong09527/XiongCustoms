import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { REGISTER_USER } from "../../mutations/userMutation";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/avatar.png");
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  async function uloadImage(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "kamenxiong");

    setLoading(true);
    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dqgdpaicv/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    // Get the new image URL
    const newImage = data.secure_url; 
    setAvatarPreview(newImage);
    setAvatar(newImage);

    setFormData((prevFormData) => ({
      ...prevFormData,
      // Append new image URL to images array
      authorImage: newImage, 
    }));

    setLoading(false);
    // toast.success("Upload success!");
    console.log(alert("success"));
    setImageSrc("");
  }

  function handleUploadChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };
    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  const [registerUser] = useMutation(REGISTER_USER, {
    onCompleted: (data) => {
      // Extract the user data from the response
      const { id, name, email, avatar, admin, token } = data.registerUser;

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, email, password } = formData;

    if (!name || !email || !password) {
      console.log("Fill all the fields");
      return;
    }

    try {
      await registerUser({
        variables: { name, email, password, avatar: avatarPreview }, // Pass variables object with name, email, password, and avatar
      });

      // Reset form state
      setFormData({ name: "", email: "", password: "" });
      setAvatarPreview("/profile/avatar.jpg");
      setAvatar("");

      // Redirect to home page
      navigate("/blogs");
    } catch (error) {
      console.error("Error registering user:", error);
      // Handle the error, display a message to the user, or perform other actions
    }
  };

  return (
    <>
      <section className="bg-gray-50 pt-10">
        <div className="flex flex-col items-center justify-center px-6 py-8 md:min-h-screen lg:py-5">
          <div className="w-[95vw] md:w-[70vw] lg:w-[40vw] bg-white rounded-lg shadow md:mt-0 xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl  text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Create an account
              </h1>

              <form
                className="text-whites flex flex-col  justify-start sjustify-center items-centersSS mt-10 "
                method="post"
                onChange={handleUploadChange}
                onSubmit={uloadImage}
              >
                <div className=" flex flex-col items-center justify-center">
                  <label htmlFor="authorImage  text-black">User Profile</label>
                  <img className=" h-20 w-20" src={`${avatarPreview}`} alt="" />
                  <p className="text-center border-slate-500 text-slate-800">
                    <input id="authorImage" type="file" name="file" />
                  </p>

                  {imageSrc && (
                    <img
                      className="h-[20vh]  lg:w-[20vw] mt-5 "
                      src={imageSrc}
                    />
                  )}

                  {imageSrc && !uploadData && (
                    <div>
                      {loading ? (
                        <div>
                          <h1 className=" bg-orange-500  w-fit px-2 py-1 text-white rounded">
                            Loading..
                          </h1>{" "}
                        </div>
                      ) : (
                        ""
                      )}
                      <button className="mt-5 bg-btn1 bg-orange-500  w-fit text-white px-5 py-2 rounded-lg  font-semibold">
                        Upload Files
                      </button>
                    </div>
                  )}
                </div>
              </form>

              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                    placeholder="Enter your Name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-orange-500 hover:underline"
                  >
                    Login here
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

export default Register;
