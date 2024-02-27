
import Hero from "../components/Home/Hero";
import RegisterForm from "../components/Home/RegisterForm";
import FeatureBlogs from "../components/Blogs/FeatureBlogs";
import Contact from "./Contact/Contact";

// HomePage component
const HomePage = () => {
  return (
    <div className=" ">
      <Hero />
      <RegisterForm />
      <FeatureBlogs />
      <Contact />
    </div>
  );
};

export default HomePage;
