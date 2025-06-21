import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import Image from "next/image";
export default async function Page({ params }) {

    const client = await clientPromise ;
    const db = client.db("linknest") 
    const collection = db.collection("links")
     const { handle } = await params
    const item = await collection.findOne({handle : handle})
 

    const item2 = {
  "_id": {
    "$oid": "685545fdc4d13e7f355e1650"
  },
  "handle": "akm2006",
  "pic": "https://avatars.githubusercontent.com/u/163711757?v=4",
  "links": [
    {
      "link": "https://www.instagram.com/aakash_eth",
      "linktext": "Instagram"
    },
    {
      "link": "https://github.com/akm2006",
      "linktext": "Github"
    },
    {
      "link": "https://www.facebook.com/aakash.mandal.3133",
      "linktext": "Facebook"
    }
  ]
}
  return <div className="min-h-screen text-amber-50 bg-purple-400 flex flex-col pb-10 items-center">
    <Link
    className="mb-15 mt-10 bg-amber-50 p-2"
    href="/">
            <Image
              alt="an image of a vector"
              src={"/logo.png"}
              width={120}
              height={100}
              className="object-contain"
            />
          </Link>

    <div className="flex flex-col items-center gap-2  mb-4 ">
        <img
      src= {item.pic}
      width={150}
      height={150}
      alt="Picture of the user"
      className=" rounded-full"
    /> <span className=" font-bold text-xl">
        @{item.handle}
    </span >
    <span className="text-center max-w-xs">
        {item.desc}
    </span>
    </div>
    <div className="flex flex-col gap-4">
        {item.links.map((item, index)=>{
            return <Link key={index} href= {item.link} target="_blank"><div className="bg-white font-bold text-black min-w-90 text-center py-5 rounded-md" >
                {item.linktext}
            </div></Link>
        })}
    </div>

  </div>
}