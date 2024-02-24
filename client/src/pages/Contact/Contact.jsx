import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <div className=" bg-white px-[10px] md:px-[20px] lg:px-[10%]  ">
      <div className=" text-lg lg:text-xl uppercase font-bold text-primary  flex items-center justify-center">
        <div className="inline-block mt-8">
          <img src="/Line 1.png" className=" inline-block  h-1" />
          <span className="mx-2">Get in Touch With Me</span>
          <img src="/Line 1.png" className=" inline-block  h-1" />
        </div>
      </div>
      <div>
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
