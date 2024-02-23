import React, { useEffect, useState } from "react";
import { MdEmail, MdLocationOn, MdNearMe } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { SEND_MESSAGE } from "../../mutations/messageMutation";
import { useMutation } from "@apollo/client";

const ContactForm = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    text: "",
  });

  useEffect(() => {
    const userDataFromLocalStorage = localStorage.getItem("userData");
    if (userDataFromLocalStorage) {
      setUserData(JSON.parse(userDataFromLocalStorage));
    }
  }, [navigate, formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onCompleted: (data) => {
      // Extract the user data from the response
      const { name, email, subject, text, userId } = data.sendMessage;

      setFormData({
        name: "",
        email: "",
        subject: "",
      });
      navigate("/thanks");
    },
    onError: (error) => {
      console.error("Error registering user:", error);
      // Handle the error, display a message to the user, or perform other actions
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, subject, text } = formData;

    if (userData) {
      try {
        await sendMessage({
          variables: {
            name,
            email,
            subject,
            text,
            userId: String(userData.id),
          }, // Pass variables object with name, email, password, and avatar
        });
      } catch (error) {
        console.error("Error registering user:", error);
        // Handle the error, display a message to the user, or perform other actions
      }
    }
    if (!userData) {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12   my-5 p-10 text-slate-900   rounded">
        {/* Address */}
        <div className="address col-span-5 md:ml-5 mb-10 lg:mb-0 lg:mt-10s md:mt-0  ">
          <div className="mb-5">
            <h1 className="text-2xl font-semibold text-slate-900 ">
              Get in Touch
            </h1>
            <p className="text-primary">
              Feel free to reach out if you have any questions!
            </p>
          </div>
          <div className="mb-2 flex  items-center ">
            <MdNearMe className="  lg:text-4xl text-2xl  text-green-500 mr-2" />
            <div className="flex flex-col  items-centers">
              <h1 className="text-xl font-semibold text-secondary ">Name</h1>
              <p className="text font-semibold text-primary">Xiong Customs</p>
            </div>
          </div>
          <div className="mb-2 flex flex-row items-center">
            <MdLocationOn className="lg:text-4xl text-2xl  text-red-500 mr-2" />
            <div className="flex flex-col  items-centers">
              <h1 className="text-xl font-semibold text-secondary ">Address</h1>
              <p className="text font-semibold text-primary">United State</p>
            </div>
          </div>
          <div className="mb-2 flex items-center ">
            <MdEmail className="lg:text-4xl text-2xl  mr-2  text-btn1" />
            <div className="flex flex-col  items-centers">
              <h1 className="text-xl font-semibold text-secondary ">Email</h1>
              <p className="text font-semibold text-primary">
                xiongkamen@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/*  */}
        <form onSubmit={handleSubmit} className=" col-span-7">
          <h1 className="text-2xl font-semibold text-secondary mb-2">
            Message Me{" "}
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 ">
            <div className="mb-4">
              <input
                className="w-full px-4 py-2 border rounded outline-none"
                type="text"
                placeholder="Name"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <input
                className="w-full px-4 py-2 border rounded outline-none"
                type="email"
                id="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <input
              className="w-full px-4 py-2 border rounded outline-none"
              type="text"
              placeholder="Subject"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              className="w-full px-4 py-2 border rounded outline-none h-32"
              id="text"
              placeholder="Message"
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <button
            className="px-4 py-2 bg-orange-500  hover:bg-orange-600 text-white rounded "
            type="submit"
          >
            SEND MESSAGE
          </button>
        </form>
      </div>

    </>
  );
};

export default ContactForm;
