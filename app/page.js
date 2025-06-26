"use client"
import Hero from "@/components/Hero";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
export default function Home() {
   const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) return;

    const checkLinknest = async () => {
      const res = await fetch(`/api/getLinknest?clerkId=${user.id}`);
      const data = await res.json();
      if (data.success && data.result) {
        router.replace("/admin");
      }
    };

    checkLinknest();
  }, [isLoaded, user]);
  return (
   
      <div >
      
      <Hero/>
       
    </div>
  )
}
