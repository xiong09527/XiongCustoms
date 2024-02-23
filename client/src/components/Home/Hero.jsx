import React from "react";
import xiongSymbol from "../../assets/Images/xiongSymbol.jpg";
import xiongXao from "../../assets/Images/xiongXao.jpg";

const Hero = () => {
  return (
    <div className="lg:h-[95vh] md:h-[80vh]   px-[10px]md:px-[20px]lg:px-[10%]    flex flex-col md:flex-row bg-white text-slate-800 pt-10s  md:pt-32s ">
      <div
        className=" relative order-2 pb-10 md:order-1 md:w-[45%] bg-white flex items-center"
        // style={{ backgroundImage: 'url("/xiongSymbol.png")' }}
      >
        <img
          className="z-10 opacity-25 md:hidden absolute h-32smb-10md:mb-0 h-full w-full object-cover "
          src="/HmongPattern.jpg"
          alt="Hmong Pattern"
        />
        <div className="z-20 flex flex-col items-start justify-center pl-[10px] md:pl-[20px] lg:pl-[10%] ">
          <h1 className=" texst text-2xl md:text-4xl font-semibold">
            Dive into the heritage of the Xiong Clan!
          </h1>
          <p className="my-5">
            As generation passes, the younger generation comes to take our place
            as we have taken our fathers place in the past. The youngsters have
            experienced the unique journey of growing up in the United States
            and becoming Americanized and adjusting to the American culture. We
            find ourselves at a crossroad where traditions and practices of our
            elders are slowly fading away, as fewer and fewer individuals take
            the time to study and learn them.
          </p>
          <p>
            Our culture heritage encompasses a myriad of traditions from wedding
            ceremonies, funeral rituals, and even the subtle thank-you rites to
            our man and woman shamans. These customs, passed down through
            generations, hold a profound significance in our community, serving
            as the pillars that uphold our identity and values.
          </p>
          <br></br>
          <p>
            As western civilization continues to influence our lives, there is a
            need to safeguard these traditions from being lost to time. By
            delving into the heritage of the Xiong Clan, one of the 18 clans of
            the Hmong people, we not only honor the legacy of our ancestors but
            also gain a deeper understand of who we are and where we come from.
          </p>
          <br></br>
          <p>
            Join us on this journey of exploration and rediscover as we
            celebrate the richness of our culture heritage and strive to
            preserve it for generations to come!!
          </p>

          <div className=" flex flex-row items-center justify-start w-full mt-10">
            <img
              className=" h-14 sh-full  object-cover "
              src={xiongXao}
              alt="hmong symbol"
            />
            <div className="  ml-2">
              <h1 className="">Nao Long Xiong</h1>
              <p className=" text-xs text-slate-600">
                Former Xiong Clan Leader
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" hidden lg:flexs order-1 md:order-2 md:block md:w-[55%] ">
        <img
          className=" h-32smb-10md:mb-0 h-full w-full object-cover "
          src={xiongSymbol}
          alt="Xiong Symbol"
        />
      </div>
    </div>
  );
};

export default Hero;
