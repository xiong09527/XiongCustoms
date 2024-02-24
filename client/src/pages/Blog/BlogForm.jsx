import React, { useEffect, useId, useState } from "react";
import BlogPreview from "./BlogPreview";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_BLOG } from "../../mutations/blogMutation";

const PostBlogForm = () => {
  const [loading, setLoading] = useState(false);
  const [bannerPreview, setbannerPreview] = useState("/banner.jpg");
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    bannerImage: "",
  });

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userDataFromLocalStorage = localStorage.getItem("userData");
    if (userDataFromLocalStorage) {
      setUserData(JSON.parse(userDataFromLocalStorage));
    }
  }, [navigate]);

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

    const newImage = data.secure_url; // Get the new image URL
    setbannerPreview(newImage);

    setFormData((prevFormData) => ({
      ...prevFormData,
      authorImage: newImage, // Append new image URL to images array
    }));

    setLoading(false);
    // toast.success("Upload success!");

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

  // ///////////////////////////
  const [createBlog] = useMutation(CREATE_BLOG, {
    onCompleted: (data) => {
      // Extract the user data from the response
      // const { id, title, description } = data.createBlog;
    },
    onError: (error) => {
      console.error("Error registering user:", error);
      // Handle the error, display a message to the user, or perform other actions
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { title, description } = formData;
    const userDataString = localStorage.getItem("userData");
    if (!userDataString) {
      console.error("userData is not available in localStorage");
      return;
    }
    const userData = JSON.parse(userDataString);
    if (!userData || !userData.id) {
      console.error("userData is invalid or missing required properties");
      return;
    }

    try {
      await createBlog({
        variables: {
          title,
          description,
          thumbnail: bannerPreview,
          userId: String(userData.id),
        }, // Pass variables object with name, email, password, and avatar
      });

      setFormData({
        title: "",
        description: "",
        bannerImage: "",
      });

      setbannerPreview("/assets/Images/banner.jpg");
    } catch (error) {
      console.error("Error registering user:", error);
      // Handle the error, display a message to the user, or perform other actions
    }
  };

  return (
    <div className="grid grid-cols-1 mx-5 lg:grid-cols-2 pt-3">
      <div className="p-4 shadow-lg  border rounded">
        <h2 className="text-2xl font-semibold mb-4">Post a Blog</h2>

        <form
          className="text-whites flex flex-col  justify-start justify-centers items-centersSS mt-10 "
          method="post"
          onChange={handleUploadChange}
          onSubmit={uloadImage}
        >
          <label htmlFor="authorImage  text-black">Blog Banner</label>
          <img className=" h-20 w-20" src={`${bannerPreview}`} alt="" />
          <p className="text-center border-slate-500 text-slate-800">
            <input id="authorImage" type="file" name="file" />
          </p>

          {imageSrc && (
            <div className=" h-32 w-40 ">
              <img
                className="h-[20vh]lg:w-[20vw] mt-5 w-full h-full object-cover "
                src={imageSrc}
              />
            </div>
          )}

          {imageSrc && !uploadData && (
            <div>
              {loading ? (
                <div>
                  <h1 className=" bg-orange-600 text-white w-fit px-2 py-1 rounded">
                    Loading..
                  </h1>{" "}
                </div>
              ) : (
                ""
              )}
              <button className="mt-5 bg-btn1  px-5 py-2 rounded-lg  font-semibold bg-orange-500 hover:bg-orange-600 mb-3">
                Upload Files
              </button>
            </div>
          )}
        </form>

        <form className="" onSubmit={(e) => e.preventDefault()}>
          <label className="block mb-2">
            Blog Title
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full border outline-orange-400 rounded py-2 px-3 mt-1"
            />
          </label>
          <label className="block mb-2">
            Description:
            <textarea
              type="text"
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full min-h-40 outline-orange-400 border rounded py-2 px-3 mt-1"
            />
          </label>
          <div className=" flex items-center justify-center">
            <button
              onClick={handleSubmit}
              className="mt-5 bg-orange-500 hover:bg-orange-700 text-white bg-btn1 px-5 py-2 rounded-lg font-semibold"
            >
              Upload Blog
            </button>
          </div>
        </form>
      </div>

      <BlogPreview
        formData={formData}
        bannerImage={bannerPreview}
        userData={userData}
      />
    </div>
  );
};

export default PostBlogForm;
