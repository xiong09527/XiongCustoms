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
            <p>
            Nao Long Xiong's story is a compelling narrative of resilience, cultural preservation, and the quest for a better life amidst the backdrop of political 
            turmoil and war. Born on April 12, 1954, in Sam Thong, Xiang Khouang Province, Laos, to Nhia Koua Xiong and Blia Vue, Nao was the eldest of seven children.
             His formative years were significantly influenced by the Vietnam War, an event that not only impacted his homeland but also shaped his personal journey in 
             profound ways.
          </p>
          <br></br>
          <p>
          As the Vietnam War concluded in 1975, Nao, along with General Vang Pao and many Hmong allies, faced the harsh reality of persecution. Their collaboration 
          with the United States during the conflict made them targets of the Pathet Lao, the communist faction that took control of Laos. This dire situation forced 
          many Hmong into hiding within the dense jungles and rugged mountains of Laos to evade capture and persecution.
          </p>
          <br></br>
          <p>
          In a bold move for survival, on February 20, 1979, Nao embarked on a perilous journey across the Mekong River, arriving at a Thai refugee camp on February 28. 
          This transition marked a pivotal moment in his life, offering both a sanctuary and a space of uncertainty. It was within the confines of the refugee camp that
           Nao delved deep into the Hmong culture. He dedicated himself to learning the intricate customs of funeral rites, wedding ceremonies, hu plig 
           "spiritual callings", and the traditional expressions of gratitude known as “Ua Tsuag.” 
           This period was not just about survival but about reclaiming and understanding his cultural heritage amidst displacement.
          </p>
          <br></br>
          <p>
          Nao's journey took a transformative turn on September 3, 1986, when he migrated to the United States. This move was fraught with uncertainty, as it involved 
          stepping into an entirely new world without the familiarity of language, culture, or community. However, this leap also represented a beacon of hope—a chance 
          for a new beginning for Nao and his family. It was an opportunity to build a life in a land of possibilities while preserving the rich tapestry of Hmong culture 
          and traditions.
          </p>
          <br></br>
          <p>
          Nao Long Xiong's story is a testament to the strength and resilience of the human spirit. It highlights the challenges of navigating displacement and the 
          mportance of cultural preservation in the face of adversity. His journey from the mountains of Laos to the refugee camps of Thailand, and ultimately to 
          the United States, embodies the experiences of many Hmong individuals and families. It is a narrative of survival, cultural identity, and the unyielding 
          hope for a better future.
          </p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
