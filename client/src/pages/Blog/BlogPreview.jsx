import React from "react";

const BlogPreview = ({ formData, bannerImage }) => {
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
  return (
    <div className="bg-bgc min-h-screen   w-full lg:mx-5 mt-5 lg:mt-0  p-4 border rounded shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Preview Blog </h2>

      <div className="flex mt-5">
        {formData && (
          <img
            className="h-10 w-10 rounded-full mr-3"
            src={userData?.avatar}
            alt=""
          />
        )}
        <div>
          <h1 className="text-sm font-bold text-secondary ">
            {/* Your Name */}
            {userData.name}
            {/* {formData ? formData.authorName : "/"} */}
          </h1>
          <p className="text-sm font-semibold text-primary ">
            {formData ? new Date().toLocaleString() : "/"}
          </p>
        </div>
      </div>

      <div>
        <div className=" mb-5 flex items-center justify-center">
          <img className="  h-52 my-5  " src={bannerImage} alt="" />
        </div>

        <h1 className=" text-2xl lg:text-5xl font-semibold text-secondary mb-5 ">
          {formData ? formData.title : "Title not found"}
        </h1>
        <p>{formData.description}</p>
      </div>

      {/* Related Blog */}
    </div>
  );
};

export default BlogPreview;
