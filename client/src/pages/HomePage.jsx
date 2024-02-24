
import Hero from "../components/Home/Hero";
import RegisterForm from "../components/Home/RegisterForm";
import Contact from "./Contact/Contact";

const HomePage = () => {
  return (
    <div className=" ">
      <Hero />
      <RegisterForm />
      <Contact />
    </div>
  );
};

export default HomePage;
