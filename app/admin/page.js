"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import FloatingCard from "@/components/FloatingCard";
import Link from "next/link";
import Aurora from './Aurora';
import { RiDeleteBinFill } from "react-icons/ri";
import { FaSave } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
const AdminPage = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
const [isUploading, setIsUploading] = useState(false);
  const [editableHandle, setEditableHandle] = useState("");
  const [editableLinks, setEditableLinks] = useState([]);

  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      router.push("/sign-in");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/getLinknest?clerkId=${user.id}`);
        const json = await res.json();
        if (json.success && json.result) {
          setData(json.result);
          setEditableHandle(json.result.handle);
          setEditableLinks(json.result.links);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Failed to fetch:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, isLoaded]);

  const handleSaveChanges = async () => {
    const payload = {
      clerkId: user.id,
      handle: editableHandle.trim(),
      links: editableLinks,
      pic : data.pic
    };

    try {
      const res = await fetch("/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (result.success) {
        toast.success("Updated successfully!");
      } else {
        toast.error("Failed to update: " + result.message);
      }
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Error updating.");
    }
  };

  if (!isLoaded || loading) return <p className="text-white">Loading...</p>;

  if (error || !data) return <p className="text-red-500">Something went wrong or no Linknest found.</p>;

  return (
   <div className=" -z-20 bg-[#060010]"> <Aurora
  colorStops={["#3A29FF", "#63d689", "#743df5"]}
    blend={0.5}
  amplitude={0.7}
  speed={0.5}
/>
    <div className="text-black min-h-screen sm:flex-row flex-col flex justify-between max-w-screen px-4 sm:px-10 md:px-20 py-[15vh] sm:py-[16vh] md:py-[21vh]">
      <ToastContainer />
      <div className="sm:w-[60%] w-full backdrop-blur-md bg-white/30  flex flex-col items-center rounded-xl sm:p-6 p-2 shadow-lg">
      

        <h1 className="sm:text-[4rem] break-words text-[10vw] text-center leading-none font-black text-[#ecede6] pb-5">
          Your Linknest
        </h1>
          <img
            src={data.pic}
            width={150}
            height={150}
            alt="Picture of the user"
            className=" rounded-full border-black/20 h-25 w-25"
          />
     <label
  htmlFor="pic-upload"
  className="cursor-pointer mt-4 bg-white/80 text-black font-semibold px-4 py-2 rounded-full shadow-md hover:bg-white/60 transition flex items-center gap-2"
>
  {isUploading ? (
    <>
      Uploading...
      <svg
        className="animate-spin h-5 w-5 text-black"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg>
    </>
  ) : (
    "Change Profile Image"
  )}
</label>
<input
  id="pic-upload"
  type="file"
  accept="image/*"
  onChange={async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (result.success) {
        setData((prev) => ({ ...prev, pic: result.url }));
        toast.success("Image uploaded successfully!");
      } else {
        toast.info(result.message || "Image upload failed.");
      }
    } catch (err) {
      toast.error("Upload error.");
      console.error(err);
    } finally {
      setIsUploading(false);}
  }}
  className="hidden"
/>
        <div className="text-2xl w-full justify-center sm:flex-row flex-col items-center text-white m-3 flex">
          <label className="block m-2">Handle Name</label>
          <input
            type="text"
            value={editableHandle}
            onChange={(e) => setEditableHandle(e.target.value)}
            className="p-1 bg-black/40 rounded-md font-bold sm:text-left text-center text-white"
          />
          
        </div>

        <div className="flex flex-col gap-4 mt-5">
          <h1 className="text-3xl text-center font-bold text-white">Links</h1>
          {editableLinks.map((linkItem, index) => (
            <div key={index} className="flex gap-2 items-center p-3 rounded-2xl bg-white/20 ">
              <input
                type="text"
                value={linkItem.linktext}
                onChange={(e) => {
                  const updated = [...editableLinks];
                  updated[index].linktext = e.target.value;
                  setEditableLinks(updated);
                }}
                placeholder="Text"
                className="w-1/3 p-1 rounded font-bold bg-black/50 text-white"
              />
              <input
                type="text"
                value={linkItem.link}
                onChange={(e) => {
                  const updated = [...editableLinks];
                  updated[index].link = e.target.value;
                  setEditableLinks(updated);
                }}
                placeholder="URL"
                className="w-2/3 p-1 rounded bg-black/50 text-white"
              />
              <button
                onClick={() => {
                  const updated = editableLinks.filter((_, i) => i !== index);
                  setEditableLinks(updated);
                }}
                className="text-white cursor-pointer hover:bg-red-300 transition-all duration-300 ease-in-out bg-red-500 rounded-sm p-2"
              ><RiDeleteBinFill />
                
              </button>
            </div>
          ))}
          
        </div>
        <button
            onClick={() => setEditableLinks([...editableLinks, { linktext: "", link: "" }])}
            className="mt-3 bg-blue-600 hover:bg-blue-400 transition-all duration-300 ease-in-out text-white font-bold py-2 px-4 rounded"
          >
            + Add another link
          </button>

        <button
          onClick={handleSaveChanges}
          className="mt-8 bg-green-600 transition-all flex items-center gap-1 duration-300 ease-in-out hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
        >
         <FaSave /> Save Changes
        </button>
      </div> 
      


<h1 className=" sm:hidden block w-full text-center break-words leading-none font-black text-[#ecede6]
  text-[5vw] sm:text-[4vw] md:text-[3.5vw] lg:text-[3rem] xl:text-[3.5rem]  mt-[10vw] mb-[4vw]">
  Preview
</h1>  
      <div className="border-amber-200 relative sm:w-[45%] w-full h-[50vh] text-amber-950 sm:h-[90vh] flex items-center justify-center bg-transparent [perspective:1000px]">
<h1 className="absolute sm:block hidden top-0 w-full text-center break-words leading-none font-black text-[#ecede6]
  text-[5vw] sm:text-[4vw] md:text-[3.5vw] lg:text-[3rem] xl:text-[3.5rem]">
  Preview
</h1>        <FloatingCard
          sensitivity={30}
          className="absolute p-4 z-10 w-[50%] sm:w-[40%] h-[100%] sm:h-[32vw] rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center"
        >
          <img
            src={data.pic || "/card/card2.webp"}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover blur-sm scale-110 z-0"
          />
          
          

          <div className="relative z-10 min-h-full w-full text-amber-50 flex items-center flex-col ">
            <Link className="m-2 mb-4 bg-white/80 rounded-full p-2" href="/">
              <Image
                alt="an image of a vector"
                src={"/logo.png"}
                width={80}
                height={50}
                className="object-center"
              />
            </Link>

            <div className="flex flex-col items-center ">
              <img
                src={data.pic}
                width={150}
                height={150}
                alt="Picture of the user"
                className="rounded-full border-6 border-black/20 w-25 h-25"
              />
            </div>
            <div className="flex flex-col mt-5 w-[90%] gap-4">
          {data.links.map((data, index) => {
            return (
              <Link key={index} href={data.link} target="_blank">
                 <div className="bg-white/70 font-semibold text-black text-center py-1 rounded-md">
                  {data.linktext}
                </div>
              </Link>
            );
          })}
        </div>
          </div>
        </FloatingCard>
      </div>
    </div></div>
  );
};

export default AdminPage;
