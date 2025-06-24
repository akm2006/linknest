"use client"
import React from "react";
import Link from "next/link";
import Image from "next/image";
import FloatingCard from "./FloatingCard";
import { RiInstagramFill } from "react-icons/ri";
import { FaYoutube, FaSpotify } from 'react-icons/fa';
import { useState } from "react";
import { useRouter } from "next/navigation";

const Hero = () => {
    
const router = useRouter()
const [text, settext] = useState("")
  const createNest = () =>
  {
    
    router.push(`/generate?handle=${text}`)
  }
  
  return (
    <div className=" min-h-[150vh] max-w-100vw bg-[#254F1A]  sm:px-20 px-4 ">
      <div className=" flex flex-col sm:flex-row justify-between">
        <div className="  flex flex-col sm:mt-70 mt-[40vw] sm:w-[52%] w-full {inter.className}  ">
          <span className=" sm:text-[5rem] break-words text-[10vw] leading-none font-black text-[#D2E823] pb-5">
            Everything you are. In one, simple link in bio.
          </span>
          <span className="text-lg text-white font-medium pb-10">
            Join people using Linknest for their link in bio. One link to
            help you share everything you create, curate and sell from your
            Instagram, TikTok, Twitter, YouTube and other social media profiles.
          </span>
          <div className="flex sm:flex-row items-center sm:w-[70%] flex-col">
            <input
              onChange={(e)=> settext(e.target.value)}
              type="text"
              placeholder="linknest/"
              className="px-4 w-full h-16 sm:flex-1 bg-white rounded-md"
            />
            
            
            <button
              onClick={createNest}
              value={text}
              className=" bg-purple-300 w-50 m-3 h-16 cursor-pointer rounded-full font-bold py-3 shadow-lg">
              Claim your Linknest
            </button>
            
            
          </div>
        </div>

<div className="relative sm:w-[45%] w-full h-[50vh] text-amber-950 sm:mt-50 mt-[10vw] sm:h-[90vh] border-0 flex items-center justify-center bg-transparent [perspective:1000px]">
  <FloatingCard
  sensitivity={30}
  className="absolute z-0 size-[33%] bg-[url(/card/disc.webp)] bg-center bg-cover rounded-full shadow-2xl top-[20%] right-[5%]"/>
<FloatingCard
  sensitivity={30}
  className="absolute z-20 w-[30%] h-[30%] bg-[url(/card/song.webp)] bg-center bg-cover rounded-3xl shadow-2xl bottom-[20%] left-[15%]"
/>
<FloatingCard
  sensitivity={30}
  className="absolute z-20 rounded-xl bottom-[20%] right-[15%]"
>
  <div className="flex gap-[0.8vw] sm:gap-2">
    <button className="w-[3vw] h-[3vw] min-w-[36px] min-h-[36px] sm:w-10 sm:h-10 flex items-center justify-center bg-purple-300 rounded-full">
      <FaSpotify className="w-[50%] h-[50%]" />
    </button>
    <button className="w-[3vw] h-[3vw] min-w-[36px] min-h-[36px] sm:w-10 sm:h-10 flex items-center justify-center bg-purple-300 rounded-full">
      <FaYoutube className="w-[50%] h-[50%]" />
    </button>
    <button className="w-[3vw] h-[3vw] min-w-[36px] min-h-[36px] sm:w-10 sm:h-10 flex items-center justify-center bg-purple-300 rounded-full">
      <RiInstagramFill className="w-[50%] h-[50%]" />
    </button>
  </div>
</FloatingCard>

  <FloatingCard
    sensitivity={30}
    className="absolute z-10 w-[45%] sm:w-[40%] h-[100%] sm:h-[35vw] bg-[url(/card/card1.webp)] bg-center bg-cover rounded-3xl p-[2vw] shadow-2xl flex flex-col items-center"
  >
    <Image
      src="/card/user1.webp"
      width={100}
      height={100}
      alt="Profile"
      className=" absolute top-[8%] rounded-full object-cover w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24%"
    />

    <div className="flex flex-col w-[100%] font-medium items-center gap-2 absolute top-[35%]">
      <button className="bg-purple-300 rounded-full text-[2.4vw] sm:text-xs md:text-sm w-[90%] py-[1vw] shadow-lg">
  Latest Single
</button>
      <button className="bg-purple-300 rounded-full text-[2.4vw] sm:text-xs md:text-sm w-[90%] py-[1vw] shadow-lg">
        Bubble Gum Music Video
      </button>
     <button className="bg-purple-300 rounded-full text-[2.4vw] sm:text-xs md:text-sm w-[90%] py-[1vw] shadow-lg">
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
