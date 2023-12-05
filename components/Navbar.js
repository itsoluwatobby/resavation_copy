"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { BsCameraVideo, BsArrowLeftShort } from "react-icons/bs";
import {  MdKeyboardArrowDown } from "react-icons/md";
import { RxMagnifyingGlass } from "react-icons/rx";
import {BsBell} from 'react-icons/bs'
import { useRouter } from 'next/navigation'

import { useResavationAppProvider } from "@/context/useResavationAppProvider";
import { useLogout } from "../hooks/useLogout";

export default function Navbar({ setShowMenu, setShowSettings }) {
  const userLogout = useLogout()
  const [showInput, setShowInput] = useState(false)
  const router = useRouter()
  const pathname = usePathname();
  const { userId } = useParams();
  const [toggleNavbar, setToggleNavbar] = useState(false);
  const { guestUserInfo, currentUserInfo, isChatPageOpened, setIsChatPageOpened } = useResavationAppProvider();
  const excludePath = `/chat_page`;
  const apartmentPagePath = ["/roommate_profile_details", "/apartment_details_page", "/search"];
  const homeRoute = '/'
  const removeNotificationBell = ['/login', 'signUp', '/verification_code', '/set_new_password', '/reset_success', '/forgotPassword', '/email_success']
  
  const handleSearch = (e) => {
   e.preventDefault()
   setShowInput(false)
   router.push('/search')
  }

  const handleLogout = async() => {
    await userLogout()
  }
  

  useEffect(() => {
    if (isChatPageOpened?.isOpen) setToggleNavbar(true);
    else setToggleNavbar(false);
  }, [isChatPageOpened?.isOpen]);

  return pathname !== excludePath ? (
    <>
      {/* mobile view starts */}
      <div
        className={`w-full flex md:hidden bg-white flex-row ${currentUserInfo && 'justify-around'}  items-center px-2  py-3 ${
          apartmentPagePath.includes(pathname)
            ? "justify-between sm:p-3"
            : "md:hidden justify-around"
        }`}
      >
        <button
          className={`${
            apartmentPagePath.includes(pathname) ? "sm:hidden" : "mobile:block"
          } ${pathname === "/search" ? "hidden" : "block"}`}
          onClick={() => setShowMenu(true)}
        >
          <Image
            src="./menu.svg"
            alt="menu"
            width={35}
            height={70}
            className="w-[35px] h-[70px]"
          />
        </button>
        <Link href="/" className={`${showInput ? 'hidden' : 'flex'} flex-row items-center space-x-2 text-xl md:text-2xl font-regular font-medium ${!currentUserInfo && 'pl-[20%]'}`}>
          <Image src="./logo.svg" alt="logo" width={30} height={50} className='w-[30px] h-[50px]' />
          <div>Resavation</div>
        </Link>
        {showInput && <div className="flex justify-center items-center">
          <input type="text" className={`${showInput ? 'block' : 'hidden'} border rounded border-gray-200 bg-white text-sm font-medium focus:border-black focus:outline-none focus:ring-0`} />
          <Link href={'/search'} className={`${removeNotificationBell?.includes(pathname) ? 'hidden' : 'flex'} ${pathname === '/' && !currentUserInfo?.firstName ? 'hidden' : 'block'} ${pathname === '/search' ? 'hidden' : 'block'}`}>
            <RxMagnifyingGlass size={20}/>
          </Link>
      </div>}
      {currentUserInfo && <div className="flex justify-center items-center space-x-2">
                    <div className={`${removeNotificationBell?.includes(pathname) ? 'hidden' : 'flex'} ${pathname === '/' && !currentUserInfo?.firstName ? 'hidden' : 'flex'} ${pathname === '/search' ? 'hidden' : 'flex'} justify-center items-center overflow-scroll w-full`}>
                      <Link href={'/search'}>
                        <button className={`${showInput && 'hidden'}`}>
                            <RxMagnifyingGlass size={20}/>
                        </button>
                      </Link>
                    </div>

                    <Link href={currentUserInfo?.firstName ? `/chat_page` : ''}
                     className={`${removeNotificationBell?.includes(pathname) ? 'hidden' : 'flex'} ${pathname === '/' && !currentUserInfo?.firstName ? 'hidden' : 'flex'} justify-center items-center w-full`}>
                        <button className="relative">
                            <BsBell size={20} />
                            <span
                              className={`absolute right-0 -top-1.5 w-4 h-4 ${currentUserInfo?.notification > 0 ? 'block' : 'hidden'} font-medium rounded-full text-[10px] bg-blue-800 text-white grid place-content-center p-0.5`}
                            >{currentUserInfo?.notification}</span>
                        </button>
                    </Link>

                    <button onClick={() => setShowSettings(true)}>
                        <Image
                            src={currentUserInfo?.imageUrl ? currentUserInfo?.imageUrl : `/dummy-profile.png`}
                            width={60}
                            height={40}
                            className='rounded-full h-[40px] w-[60px]'
                            alt='profile'
                        />
                    </button>
                </div>}
        {/* <div
          className={`${
            apartmentPagePath.includes(pathname)
              ? "sm:flex sm:items-center sm:gap-4 md:hidden sm:text-sm sm:font-medium mobile:hidden"
              : "hidden"
          }`}
        >
          <Link href={"/"}>Home</Link>
          <p className="flex items-center gap-0 cursor-pointer hover:opacity-95">
            <span>Company</span>
            <MdKeyboardArrowDown />
          </p>
          <p className="flex items-center gap-0 cursor-pointer hover:opacity-95">
            <span>Legal</span>
            <MdKeyboardArrowDown />
          </p>
        </div>
        <button>
          <Image
            src="./people.svg"
            alt="menu"
            width={30}
            height={50}
            className="w-[30px] h-[50px]"
          />
        </button> */}
      </div>
      {/* mobile view ends */}

      {/* desktop view starts */}
      <div className="w-full bg-white z-50 hidden md:flex flex-row justify-around items-center px-16 pt-2 pb-4">
                <Link href="/" className="flex flex-row items-center space-x-2 text-xl md:text-2xl font-regular font-medium">
                    <Image src="./logo.svg" alt="logo" width={30} height={50} className='w-[30px] h-[50px]' />
                    <div>Resavation</div>
                </Link>
                <div className='flex justify-center items-center space-x-6 capitalize text-lg'>
                    <p className=''>
                        <Link href="/" alt="home">Home</Link>
                    </p>
                    <button className='flex flex-row justify-between items-center space-x-2' id="dropdown1Button" data-dropdown-toggle="dropdown1" data-dropdown-trigger="hover">
                        <p>Company</p>
                        <Image src="./arrowDown.svg" alt="arrowDown" width={10} height={10} className="w-[10px] h-[10px]" />
                        <div id="dropdown1" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown1Button">
                                <li>
                                    <Link href="/about-us" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        About Us
                                    </Link>
                                    <Link href="/about-us" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        Our Team
                                    </Link>
                                    <Link href="/about-us" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        Blog
                                    </Link>
                                    
                                </li>
                            </ul>
                        </div>
                    </button>
                    <button className='flex flex-row justify-between items-center space-x-2' id="dropdown2Button" data-dropdown-toggle="dropdown2" data-dropdown-trigger="hover">
                        <p>Legal</p>
                        <Image src="./arrowDown.svg" alt="arrowDown" width={10} height={10} className="w-[10px] h-[10px]" />
                        <div id="dropdown2" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown2Button">
                                <li>
                                    <Link href="/about-us" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        Terms of use
                                    </Link>
                                    <Link href="/about-us" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        Privacy Policy
                                    </Link>
                                </li>
                            </ul>
                        </div> 
                    </button>
                </div>

                {showInput && <div className="flex justify-center items-center">
                    <input type="text" className={`${showInput ? 'block' : 'hidden'} border rounded border-gray-200 bg-white text-sm font-medium focus:border-black focus:outline-none focus:ring-0`} />
                    <Link href={'/search'} className={`${removeNotificationBell?.includes(pathname) ? 'hidden' : 'flex'} ${pathname === '/' && !currentUserInfo?.firstName ? 'hidden' : 'block'} ${pathname === '/search' ? 'hidden' : 'block'}`}>
                      <RxMagnifyingGlass size={20}/>
                    </Link>
                </div>}
                {currentUserInfo && <div className="flex justify-center items-center space-x-2">
                    <div className={`${removeNotificationBell?.includes(pathname) ? 'hidden' : 'flex'} ${pathname === '/' && !currentUserInfo?.firstName ? 'hidden' : 'flex'} ${pathname === '/search' ? 'hidden' : 'block'} justify-center items-center`}>
                      <Link href={'/search'}>
                        <button className={`${showInput && 'hidden'}`}>
                          <RxMagnifyingGlass size={25}/>
                        </button>
                      </Link>
                    </div>

                    <Link href={currentUserInfo?.firstName ? `/chat_page` : ''}
                     className={`${removeNotificationBell?.includes(pathname) ? 'hidden' : 'flex'} ${pathname === '/' && !currentUserInfo?.firstName ? 'hidden' : 'flex'} justify-center items-center w-full`}>
                        <button className="relative cursor-pointer">
                            <BsBell size={25} />
                            <span
                              className={`absolute -right-1 -top-1 w-5 h-5 ${currentUserInfo?.notification > 0 ? 'block' : 'hidden'} font-medium rounded-full text-[10px] bg-blue-800 text-white grid place-content-center p-0.5`}
                            >{currentUserInfo?.notification}</span>
                        </button>
                    </Link>

                    <button id="dropdownButton" data-dropdown-toggle="dropdown" data-dropdown-trigger="hover">
                        <img
                            src={currentUserInfo?.imageUrl ? currentUserInfo?.imageUrl : `/dummy-profile.png`}
                            loading="lazy"
                            className='rounded-full h-[40px] w-[80px]'
                            alt='profile'
                        />
                        <div id="dropdown" className="z-50 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-60 dark:bg-gray-700">
                            <ul className="py-4 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownButton">
                                <li>
                                    <span className="p-4 pb-10">
                                        <h3 className="font-bold">
                                            Stephen Adeyemo
                                        </h3>
                                        <p className="font-light pb-2">
                                            adeyemodedapo@gmail.com
                                        </p>
                                        <Link href={`/profile`} className="text-xs font-regular underline">View Profile</Link>
                                    </span>


                                    <Link href="/post_your_request" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        Post your request
                                    </Link>
                                    <Link href="/my-listings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        My Listings
                                    </Link>
                                    <Link href="/profile-preference" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        Profile Preference
                                    </Link>
                                    <Link href="/roommate_request" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        Find Roommate
                                    </Link>
                                    <Link href="/payment-methods" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        Payment methods
                                    </Link>
                                    <Link href="/messages" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        Messages
                                    </Link>
                                    <Link href="/favorite" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        Favorites 
                                    </Link>
                                    <Link href="/bookings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        My Bookings 
                                    </Link>
                                    <p onClick={handleLogout} className="pt-20 bg-white font-regular text-red-600">
                                        Logout
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </button>
                </div>}
                
                {!currentUserInfo && <div className="flex flex-row items-center space-x-4">
                    <Link href={'/login'}>
                        <button  className="text-black font-regular text-lg  bg-white shadow-lg shadow-gray-300 text-center p-4 m-2 rounded-sm md:w-25 lg:w-28">
                            Login
                        </button>
                    </Link>
                    <Link href={'/signup'}>
                        <button  className="text-white font-regular text-lg bg-blue-700 shadow-lg shadow-gray-300 text-center p-4 m-2 rounded-sm md:w-25 lg:w-28">
                            Sign Up
                        </button>
                    </Link>
                </div>}
                
                {/* desktop view ends */}
            </div>
      {/* desktop view ends */}
    </>
  ) : (
    // CHAT_PAGE NAVBAR
    <div
      className={`sticky top-0 flex-none z-50 w-full bg-white ${
        toggleNavbar ? "flex" : "hidden md:flex"
      } justify-around items-center px-2 py-3 shadow-lg h-[72px]`}
    >
      <nav
        className={`text-xs mdxl:text-lg flex md:justify-between items-center w-full p-2 md:pr-14 md:pl-0 gap-2 z-50`}
      >
        <p className="flex-none w-10 md:hidden">
          <BsArrowLeftShort
            title="Close chat"
            onClick={() =>
              setIsChatPageOpened({ isOpen: false, conversationId: "" })
            }
            className="cursor-pointer text-gray-600 text-2xl hover:text-gray-900 transition-all"
          />
        </p>
        <figure className="flex-none w-60 h-52 md:flex hidden">
          <Image
            className="text-sm font-bold translate-y-2 w-full h-full"
            src="/assets/resavation-black.png"
            width={260}
            height={230}
            alt="Resavation"
            priority={true}
          />
        </figure>
        <div className="flex-grow w-[90%] md:hidden flex items-center gap-2">
          <figure className="rounded-full w-8 h-8 bg-slate-300">
            {
              // TODO: Conditional rendering for the loggedIn user picture
              guestUserInfo?.displayPic && (
                <img
                  src={guestUserInfo?.displayPic}
                  alt="Profile picture"
                  className="object-cover h-full w-full rounded-full"
                />
              )
            }
          </figure>
          <div className="flex-grow justify-between w-full mobile:text-sm flex items-center ">
            {
              // guestUserInfo ? (
              <div className="flex flex-col gap-0">
                {/* navigate to user profile */}
                <p className="cursor-pointer font-medium hover:underline hover:underline-offset-1 transition-all hover:opacity-80 active:opacity-100">
                  {guestUserInfo?.name}
                </p>
                {guestUserInfo?.isOnline ? (
                  <span className="first-letter:text-lg text-gray-400 flex items-center gap-2 relative after:content-[''] after:w-1.5 after:h-1.5 after:bg-green-600 after:rounded-full after:mt-1">
                    online
                  </span>
                ) : (
                  <span className="first-letter:text-xl capitalize text-gray-400 flex items-center gap-2 relative after:content-[''] after:w-1.5 after:h-1.5 after:bg-gray-300 after:rounded-full after:mt-1">
                    offline
                  </span>
                )}
              </div>
              // )
              // : null
            }

            <p className="text-center">
              <BsCameraVideo className="text-lg cursor-pointer" />
            </p>
          </div>
        </div>

        <div className="flex-none w-[40%] mdxl:text-base lg:w-[30%] flex items-center justify-between maxscreen:hidden font-medium">
          <Link href={"/"}>Home</Link>
          {/* <p className='flex items-center gap-0 cursor-pointer hover:opacity-95'>
                        <span>Company</span>
                        <MdKeyboardArrowDown />
                    </p>
                    <p className='flex items-center gap-0 cursor-pointer hover:opacity-95'>
                        <span>Legal</span>
                        <MdKeyboardArrowDown />
                    </p> */}

          <button
            className="flex flex-row justify-between items-center space-x-2"
            id="dropdown1Button"
            data-dropdown-toggle="dropdown1"
            data-dropdown-trigger="hover"
          >
            <p>Company</p>
            <Image
              src="./arrowDown.svg"
              alt="arrowDown"
              width={10}
              height={10}
              className="w-[10px] h-[10px]"
            />
            <div
              id="dropdown1"
              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdown1Button"
              >
                <li>
                  <Link
                    href="/about-us"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    About Us
                  </Link>
                  <Link
                    href="/about-us"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Our Team
                  </Link>
                  <Link
                    href="/about-us"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
          </button>
          <button
            className="flex flex-row justify-between items-center space-x-2"
            id="dropdown2Button"
            data-dropdown-toggle="dropdown2"
            data-dropdown-trigger="hover"
          >
            <p>Legal</p>
            <Image
              src="./arrowDown.svg"
              alt="arrowDown"
              width={10}
              height={10}
              className="w-[10px] h-[10px]"
            />
            <div
              id="dropdown2"
              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdown2Button"
              >
                <li>
                  <Link
                    href="/about-us"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Terms of use
                  </Link>
                  <Link
                    href="/about-us"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </button>
        </div>

        <figure className="relative rounded-full hidden md:block w-8 h-8 bg-slate-300">
          {
            currentUserInfo?.imageUrl ?
            <img src={currentUserInfo?.imageUrl} alt="Profile picture"
            className="object-cover h-full w-full rounded-full"
            />
            : null
          }
        </figure>
      </nav>
    </div>
  );
}
