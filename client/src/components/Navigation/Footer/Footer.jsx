import React from "react";
import FooterOverlay from "./FooterOverlay";

const Footer = () => {
  return (
    <>
      <FooterOverlay />
      <div className="footer">
        <section className="bg-black  text-white pt-[100px] md:pt-25 px-10 md:p-[10%] flex flex-row flex-wrap justify-center items-center [&>*]:flex [&>*]:flex-col [&>*]:justify-center [&>*]:items-center [&>*]:md:items-start  ">
          <div className="max-w-[250px] m-5">
            <h1 className="text-2xl font-bold">About Us</h1>
            <p className="text-center md:text-start">
              We want to education and inspire others about our rich history and traditions. As the older generations pass on, 
              we want to keep the culture alive for the younger generations.
            </p>
          </div>

          <div className="max-w-[250px]">
            <h1 className="text-2xl font-bold">Contact</h1>
            <p className=" text-sm">xiongkamen@gmail.com</p>
            <p>763-000-000</p>
          </div>
          <div className="max-w-[250px] m-5">
            <h1 className="text-2xl font-bold">Location</h1>
            <h1>Minnesota</h1>
            <p>Brooklyn Park,</p>
            <p className=" text-center  lg:text-start">
              Xiong Customs
            </p>
          </div>
        </section>

        <section className=" px-10 md:px-[10%] text-white bg-black text-center">
          <hr />
          <p className="py-3">
            copyright @2024 All right reserved | Xeng Xiong
          </p>
        </section>
      </div>
    </>
  );
};

export default Footer;
