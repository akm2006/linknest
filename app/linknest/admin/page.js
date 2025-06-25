"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import FloatingCard from "@/components/FloatingCard";
import Link from "next/link";

const AdminPage = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
        alert("Updated successfully!");
      } else {
        alert("Failed to update: " + result.message);
      }
    } catch (err) {
      console.error("Update failed", err);
      alert("Error updating.");
    }
  };

  if (!isLoaded || loading) return <p className="text-white">Loading...</p>;

  if (error || !data) return <p className="text-red-500">Something went wrong or no Linknest found.</p>;

  return (
    <div className="text-black min-h-screen bg-gray-800 flex justify-between max-w-screen px-4 sm:px-10 md:px-20 py-[12vh] sm:py-[16vh] md:py-[21vh]">
      <div className="w-[60%] border-2 border-white rounded-2xl p-5">
        <h1 className="sm:text-[5rem] break-words text-[10vw] text-center leading-none font-black text-[#ecede6] pb-5">
          Your Linknest
        </h1>

        <div className="text-2xl text-white mb-6">
          <label className="block mb-2">Handle Name:</label>
          <input
            type="text"
            value={editableHandle}
            onChange={(e) => setEditableHandle(e.target.value)}
            className="w-full p-2 rounded-md text-white"
          />
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <h1 className="text-2xl text-white">Links</h1>
          {editableLinks.map((linkItem, index) => (
            <div key={index} className="flex gap-2 items-cente ">
              <input
                type="text"
                value={linkItem.linktext}
                onChange={(e) => {
                  const updated = [...editableLinks];
                  updated[index].linktext = e.target.value;
                  setEditableLinks(updated);
                }}
                placeholder="Text"
                className="w-1/3 p-2 rounded text-white"
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
                className="w-2/3 p-2 rounded text-white"
              />
              <button
                onClick={() => {
                  const updated = editableLinks.filter((_, i) => i !== index);
                  setEditableLinks(updated);
                }}
                className="text-red-400 text-xs"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => setEditableLinks([...editableLinks, { linktext: "", link: "" }])}
            className="mt-4 text-sm text-blue-300"
          >
            + Add another link
          </button>
        </div>

        <button
          onClick={handleSaveChanges}
          className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Save Changes
        </button>
      </div>

      <div className="relative sm:w-[45%] w-full h-[50vh] text-amber-950 sm:mt-0 mt-[10vw] sm:h-[90vh] border-0 flex items-center justify-center bg-transparent [perspective:1000px]">
        <FloatingCard
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
          </div>
        </FloatingCard>
      </div>
    </div>
  );
};

export default AdminPage;
