import React from "react";

import hmongCloth from '../assets/Images/hmongCloth.jpg';
import LongXiong from '../assets/Images/Long.jpg';


const About = () => {
  return (
    <div className="">
      <div className="pt-10 lg:mx-[15%]">
        <div>
          <div className="h-30 w-30">
            <img
              className=" h-[55vh] w-full object-cover "
              src={hmongCloth}
              alt="Hmong Cloth"
            />
          </div>

          <div className=" flex justify-between items-center ">
            <div className="bg-white shadow-lg p-1 h-20 lg:h-32 w-20 lg:w-32 rounded-lg -mt-28 ml-5 ">
              <img
                className=" h-full w-full object-cover rounded-lg"
                src={LongXiong}
                alt="LongXiong"
              />
            </div>

          </div>
          <div className=" ml-5">
            <h1 className=" text-pbl font-bold text-2xl  my-2">Nao Long Xiong</h1>

            <p className=" text-xl">Hmong Xiong Elder</p>

            <p className=" text-tbl mt-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
          tempor incididunt ut labore et dolore magna aliqua. Nisl nunc mi ipsum 
          faucibus vitae aliquet. Arcu bibendum at varius vel pharetra vel turpis. 
          Ipsum nunc aliquet bibendum enim facilisis gravida neque convallis a. 
          Ac orci phasellus egestas tellus. Nunc mi ipsum faucibus vitae aliquet. 
          Ultrices eros in cursus turpis massa tincidunt dui. Ultrices eros in cursus 
          turpis massa. Eget lorem dolor sed viverra ipsum nunc. Ullamcorper morbi 
          tincidunt ornare massa eget egestas purus. Risus viverra adipiscing at in. 
          Purus sit amet luctus venenatis lectus magna fringilla urna porttitor. 
          Adipiscing elit ut aliquam purus sit amet luctus. Nunc eget lorem dolor 
          sed viverra ipsum nunc aliquet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
