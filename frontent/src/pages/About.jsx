import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div className="px-4">
      {/* PAGE TITLE */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      {/* ABOUT SECTION */}
      <div className="my-10 flex flex-col md:flex-row gap-10 items-center">
        {/* IMAGE (FIXED SIZE) */}
        <img
          className="w-full md:w-[320px] lg:w-90 h-auto object-cover"
          src={assets.about_img}
          alt="About Us"
        />

        {/* TEXT */}
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online.
          </p>

          <p>
            We provide high-quality products from trusted brands and suppliers.
          </p>

          <b className="text-gray-800">Our Mission</b>

          <p>
            Our mission is to deliver a seamless shopping experience with
            quality, trust, and convenience.
          </p>
        </div>
      </div>

      {/* ================= WHY CHOOSE US ================= */}
      <div className="my-20">
        <div className="text-xl text-center mb-8">
          <Title text1={"WHY"} text2={"CHOOSE US"} />
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div className="border p-6 flex flex-col gap-3">
            <b>Quality Assurance</b>
            <p className="text-gray-600">
              We ensure high-quality products with strict checking.
            </p>
          </div>

          <div className="border p-6 flex flex-col gap-3">
            <b>Convenience</b>
            <p className="text-gray-600">
              Easy and smooth shopping experience anytime.
            </p>
          </div>

          <div className="border p-6 flex flex-col gap-3">
            <b>Customer Support</b>
            <p className>24/7 support for all your queries and issues.</p>
          </div>
        </div>
      </div>

      {/* ================= SUBSCRIBE ================= */}
      <NewsletterBox />
    </div>
  );
};

export default About;
