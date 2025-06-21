"use client";
import {React , useState } from "react";
import Image from "next/image";
import FloatingCard from "@/components/FloatingCard";
import { RiInstagramFill } from "react-icons/ri";
import { FaYoutube, FaSpotify } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
const Generate = () => {
  const searchParams = useSearchParams()
  
const [handle, sethandle] = useState(searchParams.get("handle") ?? ""); 
 const [pic, setpic] = useState("")
 const [links, setlinks] = useState([{link: "" , linktext: ""}])
 const [desc, setdesc] = useState("")
 
 const handleChange = (index, field, value) => {
  setlinks((prevLinks) =>
    prevLinks.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    })
  );
};


  const addLink = () => {
    setlinks(links.concat([{link: "", linktext: ""}]))

  }
  const submitLinks = async () => {
  const payload = {
    handle: handle,
    pic: pic,
    links: links,
    desc: desc  
  };

  console.log("Submitting payload:", payload); 

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  try {
    const r = await fetch("http://localhost:3000/api/add", requestOptions);
    const result = await r.json();
    if(result.success)
    {
    toast.success(result.message);
    setlinks([])
    setpic([])
    sethandle([])
    setdesc([])
    }
    else{
      toast.error(result.message)
    }
  } catch (err) {
    toast("Error adding link");
    console.error("Failed to add link:", err);
  }
};


  return (
    <div className=" bg-[#780016] min-h-screen px-30 pt-40">
      <ToastContainer />
      <h1 className="{inter.className} text-[#E9C0E9] text-6xl mb-4 font-extrabold">
        Create your LinkNest
      </h1>
      <div className=" mt-4 px-5 flex justify-between">
        <div className="flex border-2 w-[50%] gap-10 flex-col">
          <div className=" flex flex-col gap-6">
            <h1 className="{inter.className} text-[#E9C0E9] text-2xl font-bold">
              Step1: Claim your handle
            </h1>
            <div className="flex">
              {" "}
              <input
                onChange = {e=>{sethandle(e.target.value)}}
                value = {handle}
                type="text"
                placeholder="Enter your handle"
                className="p-3 w-full bg-white focus:outline-purple-600 rounded-full "
              />
            </div>
            <div className=" flex flex-col gap-3">
              <h1 className="{inter.className} text-[#E9C0E9] text-2xl font-bold">
                Step2: Add your Links
              </h1>
              {links && links.map((item, index)=>
              {
                return <div key={index} className = "flex gap-2 w-fit">
              <input
                onChange={(e) => handleChange(index, "linktext", e.target.value)}
                value = {item.linktext}
                type="text"
                placeholder="Enter link text"
                className="p-3 w-full bg-white focus:outline-purple-600 rounded-full "
              />
              <input
                onChange={(e) => handleChange(index, "link", e.target.value)}
                value = {item.link}
                type="text"
                placeholder="Enter your link"
                className="p-3 w-full bg-white focus:outline-purple-600 rounded-full "
              />
              </div>

              })}
              <button
              onClick ={()=>addLink()}
              className=" bg-[#E9C0E9] hover:bg-[#be90be] w-30 transition ease-in-out font-bold duration-300 text-black rounded-full shadow-lg">
              Add Link
            </button>
            </div>
            <div className=" flex flex-col gap-3">
              <h1 className="{inter.className} text-[#E9C0E9] text-2xl font-bold">
                Step3: Add picture & Description
              </h1>
              <input
                onChange = {e=>{setpic(e.target.value)}}
                value = {pic}
                type="text"
                placeholder="Enter link to your picture"
                className="p-3 w-full bg-white focus:outline-purple-600 rounded-full "
              />
              <input
                onChange = {e=>{setdesc(e.target.value)}}
                value = {desc}
                type="text"
                placeholder="Enter description of your handle"
                className="p-3 w-full bg-white focus:outline-purple-600 rounded-full "
              />
            </div>
            <button disabled={pic == "" || handle== "" || links[0].linktext == ""} onClick={submitLinks}className=" disabled:bg-white bg-[#E9C0E9] hover:bg-[#be90be] transition ease-in-out font-bold duration-300 text-black rounded-full px-8 py-5 shadow-lg">
              Claim for free
            </button>
          </div>
        </div>
        <div className="relative w-[45%] text-amber-950 flex items-center justify-center bg-transparent [perspective:1000px]">
          <FloatingCard
            sensitivity={30}
            className="absolute z-0 w-52 h-32 bg-[url(/card/camera.webp)] bg-center bg-cover -top-2 right-5"
          />
          <FloatingCard
            sensitivity={30}
            className="absolute z-20 w-60 h-40 bg-[url(/card/song2.webp)] bg-center bg-cover rounded-xl shadow-2xl top-[40%] left-[5%]"
          />
          <FloatingCard
            sensitivity={30}
            className="absolute z-20 rounded-xl bottom-[15%] right-[15%]"
          >
            <div className="flex gap-2">
              <button className=" h-8 w-8 flex items-center justify-center bg-[#E9C0E9] rounded-full">
                <FaSpotify size={20} />
              </button>
              <button className=" h-8 w-8 flex items-center justify-center bg-[#E9C0E9] rounded-full">
                <FaYoutube size={20} />
              </button>
              <button className=" h-8 w-8 flex items-center justify-center bg-[#E9C0E9] rounded-full">
                <RiInstagramFill size={20} />
              </button>
            </div>
          </FloatingCard>
          <FloatingCard
            sensitivity={40}
            className="absolute z-10 w-60 h-120 bg-[url(/card/card2.webp)] bg-center bg-cover rounded-2xl p-5 shadow-2xl flex flex-col items-center"
          >
            <Image
              src="/card/user2.webp"
              width={80}
              height={80}
              alt="Profile"
              className="rounded-full"
            />

            <div className="flex flex-col items-center align-center gap-2 absolute top-[30%]">
              <button className="bg-[#E9C0E9] rounded-full text-xs w-[12rem] py-2 shadow-lg">
                Autum Collection
              </button>
              <button className="bg-[#E9C0E9] rounded-full text-xs w-[12rem] py-2 shadow-lg">
                Latest additions
              </button>
              <button className="bg-[#E9C0E9] rounded-full text-xs w-[12rem] py-2 shadow-lg">
                Podcast
              </button>
            </div>
          </FloatingCard>
        </div>
      </div>
    </div>
  );
};

export default Generate;
