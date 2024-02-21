import React from "react";
import xiongSymbol from '../../assets/Images/xiongSymbol.jpg';



const Hero = () => {
  return (
    <div className="lg:h-[95vh] md:h-[80vh]   px-[10px]md:px-[20px]lg:px-[10%]    flex flex-col md:flex-row bg-white text-slate-800 pt-10s  md:pt-32s ">
      <div
        className=" relative order-2 pb-10 md:order-1 md:w-[45%] bg-white flex items-center"
        // style={{ backgroundImage: 'url("/xiongSymbol.png")' }}
      >
        <img
          className="z-10 opacity-25 md:hidden absolute h-32smb-10md:mb-0 h-full w-full object-cover "
          src="/us-blog-banner.png"
          alt="service"
        />
        <div className="z-20 flex flex-col items-start justify-center pl-[10px] md:pl-[20px] lg:pl-[10%] ">
          <h1 className=" texst text-2xl md:text-4xl font-semibold">
            Dive into the heritage of the Xiong Clan!
          </h1>
          <p className="my-5">
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

          <div className=" flex flex-row items-center justify-start w-full">
            <img
              className=" h-14 sh-full  object-cover "
              src={xiongSymbol}
              alt="hmong symbol"
            />
            <div className="  ml-2">
              <h1 className="">Nao Long Xiong</h1>
              <p className=" text-xs text-slate-600">Xiong Clan Leader</p>
            </div>
          </div>
        </div>
      </div>
      <div className=" hidden lg:flexs order-1 md:order-2 md:block md:w-[55%] ">
        <img
          className=" h-32smb-10md:mb-0 h-full w-full object-cover "
          src={xiongSymbol}
          alt="service"
        />
      </div>
    </div>
  );
};

export default Hero;
