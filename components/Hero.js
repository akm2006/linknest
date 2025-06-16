import React from "react";
import { Inter } from 'next/font/google';
const Hero = () => {
  return (
    <div className=" bg-[#254F1A] pt-70 pb-40 px-20">
      <div className=" border-2 flex">
        <div className=" border-2 flex flex-col w-[55%] p-0  {inter.className}  ">
            <span className=" text-[5rem] leading-none font-extrabold text-[#D2E823] pb-5">
          Everything you are. In one,<br></br> simple link in bio.
          </span>
          <span className="text-xl text-white font-semibold pb-10">
            Join 70M+ people using Linktree for their link in bio. One link to
            help you share everything you create, curate and sell from your
            Instagram, TikTok, Twitter, YouTube and other social media profiles.
          </span>
          <div className="flex gap-3">
            <input type="text"
        placeholder="linktr.ee/"
         className="px-6 py-6 w-[40%] bg-white rounded-md"/>

         <button
              className=" bg-purple-300 hover:bg-gray-300
                         transition ease-in-out duration-300
                        rounded-full font-bold px-8 py-5 shadow-lg"
            >
              Claim your Linktree
            </button>
          </div>
        </div>

        <div className=" border-2"></div>
      </div>
    </div>
  );
};

export default Hero;
