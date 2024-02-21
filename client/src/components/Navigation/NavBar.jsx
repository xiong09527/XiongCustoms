import { MdMenu, MdClose } from "react-icons/md";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Backdrop from "../Backdrop";
import xiongLogo from '../../assets/Images/xiongLogo.png';

// Navigation items and urls for routing
const navItem = [
  { name: "Home", id: 1, url: "/" },
  { name: "Blog", id: 4, url: "/blogs" },
  { name: "About", id: 5, url: "/about" },
];

// 
const NavBar = () => {
  // controls modal
  const [openModal, setOpenModal] = useState(false);
  // Keeps track of the active nav item
  const [activeIndex, setActiveIndex] = useState(1);
  // State to hold user data
  const [userData, setUserData] = useState(null); 
  // Hook for navigation
  const navigate = useNavigate();
  
  // Function to handle nav items
  const handleClick = (index) => {
    setActiveIndex(index);
  };

  // Handle Nav Toggle
  const [showNav, setShowNav] = useState(false);

  // Handle toggle for mobile nav
  const NavToggleHandler = () => {
    setShowNav(!showNav);
  };

  // Handle backdrop
  const backdropHandler = () => {
    setShowNav(false);
  };

  // Handle scroll if user scrolls pass a certain point
  const [hasScrolled, setHasScrolled] = useState(false);

  // Hook for adding event listener to window
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // const navigate = useNavigate();

  // Get userData from localStorage
  useEffect(() => {
    // Get userData from localStorage
    const userDataFromLocalStorage = localStorage.getItem("userData");
    if (userDataFromLocalStorage) {
      // Parse the JSON string and set it to the state
      const parsedUserData = JSON.parse(userDataFromLocalStorage);
      setUserData(parsedUserData);
    }
  }, [navigate]);

  // Logout handler
  const logoutHandler = () => {
    localStorage.removeItem("userData");
    setUserData("");
    navigate("/");
  };

  // Render the NavBar component
  return (
    <div
      className={`${
        hasScrolled ? "sticky top-0 bg-white opacity-95" : "block"
      } is -top-24 z-50`}
    >
      <div className=" w-full  z-30  px-[10px] md:px-[20px] lg:px-[10%]  bg-BlueLight ">
        <div className=" flex flex-row justify-between h-20 items-center pl-2">
          <div className="flex flex-row  items-center ">
            <div className="md:hidden">
              {!showNav && (
                <MdMenu
                  onClick={NavToggleHandler}
                  className="text-3xl text-Light font-bold cursor-pointer"
                />
              )}
            </div>

            <div className="text-xl font-bold md:px-0  text-[#1D2026]  mr-5 ml-5 md:ml-0">
              <Link to="/">
              <img
              className="h-32 w-32 md:h-48 md:w-48 object-cover"
              src={xiongLogo}
              alt="hmong symbol"
            />
              </Link>
            </div>
          </div>

          <div className="flex flex-row items-center">
            <ul
              className={`${
                !showNav ? "-translate-x-[110%]" : "translate-x-0"
              } md:translate-x-0 flex flex-col md:flex-row fixed md:relative top-0 px-5 pt-16 md:p-0 md:top-0 w-[70%] z-50 h-[100vh] justify-center2 md:justify-between items-start left-0 bg-white md:bg-inherit  text-slate-800 font-bold md:font-normal md:text-tertiary md:bg-none md:h-fit`}
            >
              {showNav && (
                <MdClose
                  onClick={NavToggleHandler}
                  className=" md:hidden text-red-400 z-50 text-2xl cursor-pointer absolute top-5 right-5"
                />
              )}

              {navItem.map((item) => (
                <li
                  key={item.id}
                  onClick={() => {
                    setShowNav(false);
                  }}
                  className={`px-2 py-2 md:py-0  cursor-pointer whitespace-nowrap`}
                >
                  <Link
                    to={item.url}
                    className={` md:hover:text-orange-500 text-lg font-semibold  border-[#FF7E1B]s transition-all duration-300  ${
                      activeIndex === item.id
                        ? " text-orange-500 transition-all duration-300  "
                        : "text-secondary"
                    }`}
                    onClick={() => handleClick(item.id)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              {userData?.admin && (
                <li
                  onClick={() => {
                    setShowNav(false);
                  }}
                  className={`px-2 py-2 md:py-0  cursor-pointer whitespace-nowrap`}
                >
                  <Link
                    to={"/admin"}
                    className={` md:hover:text-orange-500 text-lg font-semibold  border-[#FF7E1B]s transition-all duration-300  ${
                      activeIndex === 9
                        ? " text-orange-500 transition-all duration-300  "
                        : "text-secondary"
                    }`}
                    onClick={() => handleClick(9)}
                  >
                    Admin
                  </Link>
                </li>
              )}
            </ul>

            {/* Backdrop set up */}
            {showNav ? (
              <button onClick={backdropHandler}>
                <Backdrop />
              </button>
            ) : (
              ""
            )}
          </div>

          <div>
            <div>{/* <AuthButton /> */}</div>
            {!userData ? (
              <Link to="/register" className="flex flex-row items-center ">
                <button className=" whitespace-nowrap bg-orange-500s text-orange-500  border-orange-500 border  px-5 py-2  text-lg rounded">
                  Register
                </button>
              </Link>
            ) : (
              <button
                onClick={logoutHandler}
                className=" whitespace-nowrap bg-orange-500s text-orange-500  border-orange-500 border  px-5 py-2  text-lg rounded"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
      <hr className="mt-" />
    </div>
  );
};

export default NavBar;
