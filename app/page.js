"use client";

import FindFlatmate from "../components/FindFlatmate";
import ListProperty from "../components/ListProperty";
import Image from "next/image";
import CustomerCard from "../components/CustomerCard";
import homePage1 from "../public/homepage1.png";
import homePage3 from "../public/homepage3.png";
import desktopHomepage1 from "../public/desktop-homepage1.png"
import desktopHomepage2 from "../public/desktop-homepage2.png"
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { RxMagnifyingGlass } from "react-icons/rx";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { subscribeEmailAlert } from "@/lib/helperFunction";
import { useResavationAppProvider } from "@/context/useResavationAppProvider";

export default function Home() {
  const [listProperty, setListProperty] = useState(false);
  const [findFlatmate, setFindFlatmate] = useState(true);
  const [isFindActive, setIsFindActive] = useState(true);
  const [isListActive, setIsListActive] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(false);
  const { currentUserInfo } = useResavationAppProvider()
  const router = useRouter()
  // const userToken = typeof window !== "undefined" ? window.localStorage.getItem("loggedIn_User") : false;
  // // const token = JSON.parse(userToken)
  useEffect(() => {
    const userToken = window.localStorage.getItem("loggedIn_User");
    setUser(!!userToken);
  }, []);

  // console.log(subscribeEmail);
  // const handleSubmitSubscriberEmail = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const url =
  //       "https://resavation-service.onrender.com/api/v1/email-listing";

  // const user = false; // fetch logged in user/
  return (
    <main className="overflow-hidden pb-10 pt-4">
      {/* overview starts */}
      <div className="flex flex-col justify-center items-center md:space-x-12 py-2  pt-20 bg-white">
        <div className="flex flex-col py-2 lg:pl-10 text-center">
          <h1 className="font-regular font-bold text-4xl p-2">
            Find Compatible <span className="text-[#074CE5]">Flatmates</span>
          </h1>
          <p className="text-gray-600 p-2 text-sm md:text-base text-center">
            Say goodbye to stress of searching for the perfect flatmate
            {/* <br />
            we are here to help you find your perfect flatmate effortlessly */}
          </p>
          <div className="">
            {!currentUserInfo && (
              <div className="flex justify-center items-center text-center py-4 px-2">
                <Link
                  href="/login"
                  className="text-white font-normal text-sm md:text-lg bg-blue-600 text-center p-4 rounded-sm w-32"
                >
                  Join Now
                </Link>
              </div>
            )}
            {/* {user && (
              <div 
                onKeyUpCapture={(e) => {
                  if(e.key === 'Enter'){
                    router.push(`/search?location=${search}`)
                    setSearch('')
                  }else return
                }}
                className="flex justify-center items-center text-center py-4 px-2">
                <input
                  placeholder="Enter your preferred location"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="block w-full border rounded-sm border-gray-200 bg-white py-2.5 pl-5 pr-12 text-sm shadow-lg font-medium focus:border-black focus:outline-none focus:ring-0"
                />
                  <button 
                    onClick={() => {
                      router.push(`/search?location=${search}`)
                      setSearch('')
                    }}
                    className="bg-blue-600 text-white p-3 flex justify-center items-center">
                    <span>
                      <RxMagnifyingGlass />
                    </span>
                  </button>
              </div>
            )} */}
          </div>
        </div>

      {/* mobile-homepage-photo */}
        <div className="flex md:hidden flex-col md:flex-row space-x-2 lg:space-x-0 lg:w-full justify-center items-center">
            <Image
              src={desktopHomepage2}
              alt="iphone"
              priority
              width={300}
              height={300}
              className="px-1 rounded md:w-[70%] lg:w-[60%]"
            />
        </div>
        {/* mobile-homepage-photo */}


        {/* carousel starts */}
        <div id="default-carousel" className="sm:hidden  relative w-full" data-carousel="slide">    
          <div className="relative h-56 overflow-hidden rounded-lg md:h-96"> 
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
                <Image priority src={desktopHomepage2} className="md:w-[70%] md:h-full absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="hompage-pic-1" />
            </div>
            
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
                <Image priority src={desktopHomepage1} className="md:w-[70%] md:h-full absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="homepage-pic-2" />
            </div>
          </div>
        </div>
        {/* carousel ends */}

        <div className="flex sm:hidden md:flex space-x-2 text-center lg:w-full justify-center items-center">
            <Image
              src={desktopHomepage2}
              alt="hompage"
              priority
              className="px-1 rounded md:w-[70%] md:h-full flex text-center justify-center items-center"
            />
        </div>

      </div>
      {/* overview ends */}

      <br />
      {/* Features starts */}
      <div id="features" className="py-6 bg-white">
        <h2 className="font-regular font-bold text-2xl md:text-4xl capitalize text-center pt-4 pb-6">
          How it works
        </h2>
        <div className="">
          <div className="flex flex-row justify-center items-center text-center space-x-6 md:space-x-12 lg:space-x-24 p-4">
            <p
              onClick={() => {
                setFindFlatmate(true);
                setListProperty(false);
                setIsFindActive(true);
                setIsListActive(false);
              }}
              className={`text-lg cursor-pointer relative pb-2 ${
                isFindActive ? "font-bold font-regular" : "font-light"
              }`}
            >
              Find a flatmate
              {isFindActive && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 bg-blue-600 h-3 w-3 rounded-full"></span>
              )}
            </p>

            <p
              onClick={() => {
                setFindFlatmate(false);
                setListProperty(true);
                setIsFindActive(false);
                setIsListActive(true);
              }}
              className={`text-lg cursor-pointer relative pb-2 ${
                isListActive ? "font-bold font-regular" : "font-light"
              }`}
            >
              List your property
              {isListActive && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 bg-blue-600 h-3 w-3 rounded-full"></span>
              )}
            </p>
          </div>

          {findFlatmate && <FindFlatmate />}
          {listProperty && <ListProperty />}
        </div>
      </div>
      {/* Features ends */}

      {/* Reviews starts */}
      <div id="" className="bg-[#f5f5f5] p-8 text-center">
        <h2 className="font-regular font-bold text-3xl pt-2 pb-4">
          Meet Some Happy Customers
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center px-4 space-x-4">
          <span><CustomerCard  /></span>
          <span className="hidden md:block"><CustomerCard  /></span>
          <span className="hidden md:block"><CustomerCard  /></span>
        </div>
      </div>
      {/* Reviews ends */}

      {/* contact starts */}
      <div id="#contact" className="bg-white text-center p-4">
        <h2 className="font-regular font-bold text-2xl py-2">
          Get Updates & More
        </h2>
        <p className="text-gray-600 pb-4">
          Join our mailing list to get latest updates & offers
        </p>
        <div className="py-4">
          <form >
            <input
              required
              value={subscribeEmail}
              onChange={(e) => setSubscribeEmail(e.target.value)}
            
              placeholder="Enter your email"
              className="border border-gray-300 placeholder:pl-4 p-4 rounded w-[60%]"
            />
            <button
              type="submit"
              className="bg-blue-600 p-4 text-white rounded"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      {/* contact ends */}
    </main>
  );
}
