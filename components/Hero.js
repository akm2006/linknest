import React from "react";

import Image from "next/image";
import FloatingCard from "./FloatingCard";
import { RiInstagramFill } from "react-icons/ri";
import { FaYoutube, FaSpotify, FaInstagram } from 'react-icons/fa';
const Hero = () => {
  return (
    <div className=" h-[200vh] bg-[#254F1A] pt-70 pb-40 px-20">
      <div className=" flex justify-between">
        <div className="  flex flex-col w-[55%] p-0  {inter.className}  ">
          <span className=" text-[5rem] leading-none font-extrabold text-[#D2E823] pb-5">
            Everything you are. In one,<br></br> simple link in bio.
          </span>
          <span className="text-xl text-white font-semibold pb-10">
            Join 70M+ people using Linktree for their link in bio. One link to
            help you share everything you create, curate and sell from your
            Instagram, TikTok, Twitter, YouTube and other social media profiles.
          </span>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="linktr.ee/"
              className="px-6 py-6 w-[40%] bg-white rounded-md"
            />

            <button
              className=" bg-purple-300 rounded-full font-bold px-8 py-5 shadow-lg"
            >
              Claim your Linktree
            </button>
          </div>
        </div>

<div className="relative w-[45%] text-amber-950 flex items-center justify-center bg-transparent [perspective:1000px]">
  <FloatingCard
  sensitivity={30}
  className="absolute z-0 w-52 h-52 bg-[url(/card/disc.webp)] bg-center bg-cover rounded-full shadow-2xl -top-2 -right-0"

/>
<FloatingCard
  sensitivity={30}
  className="absolute z-20 w-52 h-52 bg-[url(/card/song.webp)] bg-center bg-cover rounded-xl shadow-2xl bottom-[15%] left-[10%]"
/>
<FloatingCard
  sensitivity={30}
  className="absolute z-20 rounded-xl bottom-[15%] right-[10%]"
>
  <div className="flex gap-2">
    <button className=" h-12 w-12 flex items-center justify-center bg-purple-300 rounded-full">
      <FaSpotify size={20} />
    </button>
    <button className=" h-12 w-12 flex items-center justify-center bg-purple-300 rounded-full">
      <FaYoutube size={20} />
    </button>
    <button className=" h-12 w-12 flex items-center justify-center bg-purple-300 rounded-full">
      <RiInstagramFill size={20} />
    </button>
  </div>

</FloatingCard>
  <FloatingCard
    sensitivity={40}
    className="absolute z-10 w-72 h-[36rem] bg-[url(/card/card1.webp)] bg-center bg-cover rounded-2xl p-5 shadow-2xl flex flex-col items-center"
  >
    <Image
      src="/card/user1.webp"
      width={100}
      height={100}
      alt="Profile"
      className="rounded-full"
    />

    <div className="flex flex-col gap-2 absolute top-[30%]">
      <button className="bg-purple-300 rounded-full text-xs px-20 py-4 shadow-lg">
        Latest Single
      </button>
      <button className="bg-purple-300 rounded-full text-xs px-15 py-4 shadow-lg">
        Bubble Gum Music Video
      </button>
      <button className="bg-purple-300 rounded-full text-xs px-20 py-4 shadow-lg">
        Listen on Spotify
      </button>
    </div>
  </FloatingCard>
</div>

      </div>
    </div>
  );
};

export default Hero;
