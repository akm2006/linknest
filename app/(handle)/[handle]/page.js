import Link from "next/link";
import clientPromise from "@/lib/mongodb";
import Image from "next/image";
export default async function Page({ params }) {
  const client = await clientPromise;
  const db = client.db("linknest");
  const collection = db.collection("links");
  const { handle } = await params;
  const data = await collection.findOne({ handle: handle });

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute  inset-0 bg-center bg-cover blur-md scale-110"
        style={{ backgroundImage: `url(${data.pic})` }}
      ></div>

      <div className="relative z-10 min-h-screen w-full text-amber-50 flex flex-col pb-10 px-10 items-center bg-black/40">
        <Link className="m-10 bg-white/80 rounded-full p-4" href="/">
          <Image
            alt="an image of a vector"
            src={"/logo.png"}
            width={150}
            height={100}
            className="object-contain"
          />
        </Link>

        <div className="flex flex-col items-center gap-2  mb-4 ">
          <img
            src={data.pic}
            width={150}
            height={150}
            alt="Picture of the user"
            className=" rounded-full border-6 border-black/20 h-35 w-35"
          />
          <span className=" font-bold text-xl">@{data.handle}</span>
          <span className="text-center max-w-xs">{data.desc || ""}</span>
        </div>
        <div className="flex flex-col gap-4">
          {data.links.map((data, index) => {
            return (
              <Link key={index} href={data.link} target="_blank">
<div className="bg-white/70 font-bold text-black w-[90vw] md:w-90 text-center py-5 rounded-md">
                  {data.linktext}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
