import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetter from "../components/NewsLetter";

const About = () => {
  return (
    <>
      <div className="sm:text-2 xl text-xl text-center py-3">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className=" flex flex-col sm:flex-row items-center justify-between gap-7  ">
        <img
          className="w-full md:max-w-[450px] "
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col gap-y-5 text-base sm:text-lg font-light">
          <p>
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>
          <p>
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>
          <p className="font-bold">Our Mission</p>
          <p>
            Our mission at Forever is to empower customers with choice,
            convenience, and confidence. We're dedicated to providing a seamless
            shopping experience that exceeds expectations, from browsing and
            ordering to delivery and beyond.
          </p>
        </div>
      </div>
    <div>

    </div>

      <div className="sm:text-2 xl text-xl text-left mt-10">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3  mt-5 border  border-gray-400 mb-10">
        <div className=" p-12 border border-b sm:border-r-gray-400 flex flex-col gap-y-3 sm:justify-evenly ">
          <h3 className="font-bold">Quality Assurance:</h3>
          <p>
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </p>
        </div>
        <div className="p-12 border border-b  sm:border-r-gray-400 flex flex-col gap-y-3 sm:justify-evenly ">
          <h3 className="font-bold">Convenience:</h3>
          <p>
            With our user-friendly interface and hassle-free ordering process,
            shopping has never been easier.
          </p>
        </div>
        <div className="p-12 flex flex-col gap-y-3 sm:justify-evenly ">
          <h3 className="font-bold">Exceptional Customer Service:</h3>
          <p>
            Our team of dedicated professionals is here to assist you the way,
            ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>

      <NewsLetter />
    </>
  );
};

export default About;
