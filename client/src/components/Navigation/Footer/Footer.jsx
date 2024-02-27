import React from "react";
import FooterOverlay from "./FooterOverlay";

const Footer = () => {
  return (
    <>
    {/* Footer component */}
      <FooterOverlay />
      <div className="bg-black text-white pt-[100px] px-10 md:px-[10%]">
        <section className="flex flex-row flex-wrap justify-around items-start">
          <div className="flex flex-col items-center md:items-start max-w-[250px] m-5">
            <h1 className="text-2xl font-bold">About Us</h1>
            <p>
              We want to educate and inspire others about our rich history and traditions. As the older generations pass on, 
              we want to keep the culture alive for the younger generations.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start max-w-[250px] m-5">
            <h1 className="text-2xl font-bold">Contact</h1>
            <p className="text-sm">xiongnaolong@gmail.com</p>
            <p>000-000-0000</p>
          </div>

          <div className="flex flex-col items-center md:items-start max-w-[250px] m-5">
            <h1 className="text-2xl font-bold">Location</h1>
            <h1>Xiong Customs</h1>
            <p>Brooklyn Park, Minnesota</p>
            <p>United States</p>
          </div>
        </section>
      {/* Container for copyright */}
        <section className="text-center py-3">
          <hr className="my-2" />
          <p>
            copyright @2024 All rights reserved | Xeng Xiong
          </p>
        </section>
      </div>
    </>
  );
};

export default Footer;
