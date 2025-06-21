'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
const pathname = usePathname()
const showNavbar = ["/" ,"/generate"].includes(pathname)
useEffect(() => {
  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const scrollDifference = Math.abs(currentScrollY - lastScrollY);

    if (scrollDifference > 100) {
      if (currentScrollY > lastScrollY) {
       
        setIsVisible(false);
      } else {
        
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
if (!showNavbar) return null;
  return (
    
      <nav
        className={`w-[90vw] h-23 top-12 left-1/2 transform justify-between items-center -translate-x-1/2 rounded-full fixed z-50 flex bg-white
        transition-transform duration-200 ease-in-out will-change-transform
        ${isVisible ? 'translate-y-0' : '-translate-y-[calc(100%+3rem)]'}
        `}
      >
        <div className="flex mx-15">
          <Link href="/">
            <Image
              alt="an image of a vector"
              src={"/logo.png"}
              width={120}
              height={100}
              className="object-contain"
            />
          </Link>

          <ul className="flex mx-14 gap-8 font-medium">
            <Link href="/"><li>Products</li></Link>
            <Link href="/"><li>Templates</li></Link>
            <Link href="/"><li>Marketplace</li></Link>
            <Link href="/"><li>Learn</li></Link>
            <Link href="/"><li>Pricing</li></Link>
          </ul>
        </div>
        <div className="flex gap-3 font-bold mx-6">
          <Link href="/">
            <button className="bg-gray-200 hover:bg-gray-300 transition ease-in-out duration-300 rounded-xl font-bold px-8 py-5 shadow-lg">
              Log in
            </button>
          </Link>
          <Link href="/">
            <button className="bg-gray-800 hover:bg-gray-700 transition ease-in-out duration-300 text-white rounded-full px-8 py-5 shadow-lg">
              Sign up free
            </button>
          </Link>
        </div>
      </nav>
   
  );
};

export default Navbar;
