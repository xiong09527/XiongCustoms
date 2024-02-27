import React from "react";

// Blog preview component
const BlogPreview = ({ formData, bannerImage }) => {
  // Get user data from localStorage
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

  // Function to add paragraph breaks
  const renderDescription = (description) => {
    // Split by double newline to identify paragraphs
    const paragraphs = description.split('\n\n');
    return paragraphs.map((paragraph, idx) => (
      // Wrap individual paragraphs in <p> tag
      <p key={idx} style={{ textIndent: '2em', textAlign: 'justify', marginBottom: '1em' }}>
        {paragraph.split('\n').map((line, lineIdx) => (
          <React.Fragment key={lineIdx}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>
    ));
  };
  
  // Render the component
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
            {/* Display the current date and time as blog post time */}
            {formData ? new Date().toLocaleString() : "/"}
          </p>
        </div>
      </div>

      <div>
        <div className=" mb-5 flex items-center justify-center">
          {/* Display the banner image */}
          <img className="  h-52 my-5  " src={bannerImage} alt="" />
        </div>

        <h1 className="text-2xl lg:text-5xl font-semibold text-secondary mb-5">
        {formData.title || "Title not found"}
      </h1>
      {/* Render description with paragraph breaks */}
      <div className="description-container">
         {/* Using <pre> to preserve formatting if not using renderDescription function */}
        <pre>{formData.description}</pre>
      </div>
    </div>

      {/* Related Blog */}
    </div>
  );
};

export default BlogPreview;
