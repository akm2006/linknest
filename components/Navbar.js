'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sling as Hamburger } from 'hamburger-react';
import {
  useUser,
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
const pathname = usePathname()
const showNavbar = ["/" ,"/generate", "/linknest/admin"].includes(pathname)
const [isOpen, setIsOpen] = useState(false);
const { user } = useUser();


  useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
    
  } else {
    document.body.style.overflow = "";
  
  }

  return () => {
    document.body.style.overflow = "";
    
  }
}, [isOpen]);
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
      <div>
      <nav
        className={`w-[90vw] sm:h-23 h-16 px-6 sm:top-12 top-6 left-1/2 transform justify-between items-center -translate-x-1/2 rounded-full fixed z-50 flex bg-white
        transition-transform duration-200 ease-in-out will-change-transform
        ${isVisible ? 'translate-y-0' : '-translate-y-[calc(100%+3rem)]'}
        `}
      >
        <div className="flex sm:mx-15 mx-0">
          <Link href="/">
            <Image
              alt="an image of a vector"
              src={"/logo.png"}
              width={120}
              height={100}
              className="object-contain sm:flex hidden"
            />
            <Image
              alt="an image of a vector"
              src={"/mlogo.png"}
              width={14}
              height={14}
              className="object-contain sm:hidden flex"
            />
          </Link>

          <ul className="sm:flex hidden mx-14 gap-8 font-medium">
            <Link href="/"><li>Products</li></Link>
            <Link href="/"><li>Templates</li></Link>
            <Link href="/"><li>Marketplace</li></Link>
            <Link href="/"><li>Learn</li></Link>
            <Link href="/"><li>Pricing</li></Link>
          </ul>
        </div>
        <div className="flex items-center gap-3 sm:text-base text-xs sm:font-bold font-medium sm:mx-6">
      

      <SignedOut>
 
    <SignInButton mode="modal">
      <button className="bg-gray-200 hover:bg-gray-300 transition ease-in-out duration-300 rounded-xl sm:px-8 sm:py-5 px-4 py-3 shadow-lg">
        Log in
      </button>
    </SignInButton>

    <SignUpButton mode="modal">
      <button className="bg-gray-800 hover:bg-gray-700 transition ease-in-out duration-300 text-white rounded-full sm:px-8 sm:py-5 px-4 py-3 shadow-lg">
        Sign up free
      </button>
    </SignUpButton>
  </SignedOut>
  <SignedIn>
    
    <UserButton />
    <p> {user?.username} </p>
    
  </SignedIn>

         <div className={`block ${isOpen? "bg-[#d2e823]":"bg-transparent"} rounded-full  sm:hidden`}>
          <Hamburger toggled={isOpen} toggle={setIsOpen} size={20} /></div>


        </div>
      </nav>
       <div className={`bg-white fixed z-2 h-screen w-screen pt-[40%] sm:hidden scroll-0 flex transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
        }`}> 

         
          <ul className=" flex flex-col mx-2 w-full font-bold font-mono text-lg">
            <Link href="/" ><li className="w-full h-15 border-b-2 border-gray-200 p-3">Products</li></Link>
            <Link href="/"><li className="w-full h-15 border-b-2 border-gray-200 p-3">Templates</li></Link>
            <Link href="/"><li className="w-full h-15 border-b-2 border-gray-200 p-3">Marketplace</li></Link>
            <Link href="/"><li className="w-full h-15 border-b-2 border-gray-200 p-3">Learn</li></Link>
            <Link href="/"><li className="w-full h-15 border-b-2 border-gray-200 p-3">Pricing</li></Link>
          </ul>

       </div>
      </div>
   
  );
};

export default Navbar;
