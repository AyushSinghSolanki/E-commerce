import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  return (
    <div>
      {/* PAGE TITLE */}
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      {/* CONTACT INFO CONTAINER */}
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        {/* Left Side: Contact Image */}
        <img
          className="w-full md:max-w-120"
          src={assets.contact_img}
          alt="Contact Us"
        />

        {/* Right Side: Store Info & Careers */}
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            54709 Willms Station <br /> Suite 350, Washington, USA
          </p>
          <p className="text-gray-500">
            Tel: (415) 555-0132 <br /> Email: admin@forever.com
          </p>

          <p className="font-semibold text-xl text-gray-600">
            Careers at Forever
          </p>
          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>

          {/* Explore Jobs Button with Styling */}
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 rounded-sm active:bg-gray-800">
            Explore Jobs
          </button>

        </div>
      </div>
          <NewsletterBox />
    </div>
  );
};

export default Contact;
