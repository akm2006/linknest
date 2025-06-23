"use client";
import { React, useState } from "react";
import Image from "next/image";
import FloatingCard from "@/components/FloatingCard";
import { RiInstagramFill } from "react-icons/ri";
import { FaYoutube, FaSpotify } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const Generate = () => {
  const searchParams = useSearchParams();

  const [handle, sethandle] = useState(searchParams.get("handle") ?? "");
  const [pic, setpic] = useState("");
  const [links, setlinks] = useState([{ link: "", linktext: "" }]);
  const [desc, setdesc] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => {
    setIsOpen(false);
    sethandle("");
  };

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
    setlinks(links.concat([{ link: "", linktext: "" }]));
  };
  const formattedHandle = handle.trim().replace(/\s+/g, "_").replace(/[^a-zA-Z0-9-_]/g, "");
  const submitLinks = async () => {
    const payload = {
      handle: formattedHandle,
      pic: pic,
      links: links,
      desc: desc,
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
      const r = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/add`, requestOptions);
      const result = await r.json();
      if (result.success) {
        toast.success("Your Linknest has been created");
        setlinks([{ link: "", linktext: "" }]);
        setpic([]);

        setdesc([]);
        open();
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast("Error adding link");
      console.error("Failed to add link:", err);
    }
  };

  return (
<div className="bg-[#780016] min-h-screen max-w-screen px-4 sm:px-10 md:px-20 py-[12vh] sm:py-[18vh] md:py-[23vh]">
      <ToastContainer theme="dark" />
      <h1 className={`${inter.className} text-[#E9C0E9] text-4xl sm:text-5xl md:text-6xl mb-4 font-extrabold text-center sm:text-left`}>
  Create your LinkNest
</h1>

<div className="mt-4 px-4 sm:px-5 flex flex-col sm:flex-row justify-between">
  <div className="flex flex-col gap-10 sm:w-[50%] w-full">
    <div className="flex flex-col gap-6">
      <h1 className={`${inter.className} text-[#E9C0E9] text-xl sm:text-2xl font-bold`}>
        Step1: Claim your handle
      </h1>
      <div className="flex">
        <input
          onChange={(e) => sethandle(e.target.value)}
          value={handle}
          type="text"
          placeholder="Enter your handle"
          className="p-3 w-full bg-white focus:outline-purple-600 rounded-full max-w-full sm:max-w-[60%]"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h1 className={`${inter.className} text-[#E9C0E9] text-xl sm:text-2xl font-bold`}>
          Step2: Add your Links
        </h1>

        {links &&
          links.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-2">
              <input
                onChange={(e) => handleChange(index, "linktext", e.target.value)}
                value={item.linktext}
                type="text"
                placeholder="Enter link text"
                className="p-3 w-full sm:w-[30%] bg-white focus:outline-purple-600 rounded-full"
              />
              <input
                onChange={(e) => handleChange(index, "link", e.target.value)}
                value={item.link}
                type="text"
                placeholder="Enter your link"
                className="p-3 w-full sm:w-[50%] bg-white focus:outline-purple-600 rounded-full"
              />
            </div>
          ))}

        <button
          onClick={() => addLink()}
          className="bg-[#E9C0E9] hover:bg-[#be90be] hover:text-white w-full sm:w-[40%] md:w-[20%] mx-1 py-3 transition ease-in-out font-bold duration-300 text-black rounded-full shadow-lg"
        >
          Add Link +
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <h1 className={`${inter.className} text-[#E9C0E9] text-xl sm:text-2xl font-bold`}>
          Step3: Add picture & Description
        </h1>
        <input
          onChange={(e) => setpic(e.target.value)}
          value={pic}
          type="text"
          placeholder="Enter URL of your picture"
          className="p-3 w-full bg-white focus:outline-purple-600 rounded-full"
        />
        <input
          onChange={(e) => setdesc(e.target.value)}
          value={desc}
          type="text"
          placeholder="Enter description of your handle (Optional)"
          className="p-3 w-full bg-white focus:outline-purple-600 rounded-full"
        />
      </div>

      <button
        disabled={pic === "" || handle === "" || links[0].linktext === ""}
        onClick={submitLinks}
        className="disabled:bg-gray-400/50 disabled:text-black/30 disabled:cursor-not-allowed bg-[#E9C0E9] hover:bg-[#be90be] transition ease-in-out hover:text-white font-bold duration-300 text-black rounded-full px-6 sm:px-8 py-4 sm:py-5 shadow-lg w-full sm:w-auto"
      >
        Claim for free
      </button>
    </div>
  </div>

<div className="relative sm:w-[45%] w-full h-[50vh] text-amber-950 sm:h-[90vh] border-2 flex items-center justify-center bg-transparent [perspective:1000px]">
          <FloatingCard
            sensitivity={30}
  className="absolute z-0 h-[20%] w-[30%] bg-[url(/card/camera.webp)] bg-center bg-cover top-[10%] right-[5%]"/>
          
          <FloatingCard
            sensitivity={30}
  className="absolute z-20 w-[40%] h-[25%] bg-[url(/card/song2.webp)] bg-center bg-cover rounded-3xl shadow-2xl bottom-[30%] left-[10%]"
          />
          <FloatingCard
            sensitivity={30}
  className="absolute z-20 rounded-xl bottom-[30%] right-[15%]"
          >
            <div className="flex gap-[0.8vw] sm:gap-2">
                <button className="w-[3vw] h-[3vw] min-w-[36px] min-h-[36px] sm:w-10 sm:h-10 flex items-center justify-center bg-[#E9C0E9] rounded-full">
                  <FaSpotify className="w-[50%] h-[50%]" />
                </button>
                <button className="w-[3vw] h-[3vw] min-w-[36px] min-h-[36px] sm:w-10 sm:h-10 flex items-center justify-center bg-[#E9C0E9] rounded-full">
                  <FaYoutube className="w-[50%] h-[50%]" />
                </button>
                <button className="w-[3vw] h-[3vw] min-w-[36px] min-h-[36px] sm:w-10 sm:h-10 flex items-center justify-center bg-[#E9C0E9] rounded-full">
                  <RiInstagramFill className="w-[50%] h-[50%]" />
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
className="rounded-full object-cover w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"            />

            <div className="flex flex-col w-[100%] font-medium items-center gap-2 absolute top-[35%]">
      <button className="bg-[#E9C0E9] rounded-full text-[2.4vw] sm:text-xs md:text-sm w-[90%] py-[1vw] shadow-lg">
                Autum Collection
              </button>
              
      <button className="bg-[#E9C0E9] rounded-full text-[2.4vw] sm:text-xs md:text-sm w-[90%] py-[1vw] shadow-lg">
                Latest additions
              </button>
<button className="bg-[#E9C0E9] rounded-full text-[2.4vw] sm:text-xs md:text-sm w-[90%] py-[1vw] shadow-lg">                Podcast
              </button>
            </div>
          </FloatingCard>
        </div>
      </div>
      <Dialog open={isOpen} onClose={close} className="relative z-10">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-full max-w-md rounded-lg bg-black p-6 shadow-xl">
              <DialogTitle className="text-lg font-bold text-white">
                Linknest Created Successfully
              </DialogTitle>
              <p className="mt-2 text-sm font-semibold text-gray-200">
                You can view your Linknest at {process.env.NEXT_PUBLIC_HOST}/{formattedHandle}
              </p>
              <div className="mt-4 ">
                <button
                  onClick={close}
                  className="rounded-md  bg-gray-700 px-4 py-2 text-white hover:bg-gray-500 transition ease-in-out duration-300"
                >
                  Close
                </button>
                <button
                  onClick={() =>
                    window.open(`${process.env.NEXT_PUBLIC_HOST}/${formattedHandle}`, "_blank")
                  }
                  className="rounded-md w-[50%] bg-gray-200 px-4 py-2 text-black hover:bg-gray-400 m-4 font-bold transition ease-in-out duration-300 "
                >
                  Open Your Linknest
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Generate;
