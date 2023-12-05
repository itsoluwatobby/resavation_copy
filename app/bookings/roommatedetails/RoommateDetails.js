"use client"
import React from 'react'
import { BsFillSuitHeartFill } from "react-icons/bs";
import { BiSolidBadgeCheck } from "react-icons/bi";
import { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useParams } from "next/navigation";
import { PropertyAttributesComponent } from '@/components/PropertyAttributesComponent';

const RoommateDetails = () => {

   const [error, setError] = useState("");
   const [isLoading, setIsLoading] = useState(false);
  const sendRequest = () => {
    console.log("request")
  }
  return (
    <div className="mt-4 bg-white flex-grow gap-3 text-sm p-3 flex  flex-col justify-between w-full sm:m-auto md:w-2/3 lg:w-[55%]">
      <figure className="relative w-full h-64 rounded-sm box-border">
        <Image
          width={400}
          height={400}
          src="/booking_sent_bg.png"
          alt="Home"
          loading="lazy"
          className="rounded-md object-cover w-full h-full"
        />

        <button className="absolute z-20 grid place-content-center right-4 rounded-full p-2 w-7 h-7 shadow-md bg-white top-5">
          <BsFillSuitHeartFill className="text-red-600 text-lg hover:scale-[1.08] active:scale-[1.02] transition-all cursor-pointer" />
        </button>

        <figure className="absolute -bottom-8 left-2 w-14 h-14 border-2 border-white box-border rounded-full">
          <Image
            width={20}
            height={20}
            src="/room_accept.png"
            alt="Home"
            loading="lazy"
            className="rounded-full w-full h- hidden md:block object-cover"
          />
        </figure>
      </figure>

      <article className="flex flex-col p-3 gap-3 mt-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col font-medium text-xs gap-1">
            <p className="flex items-center gap-1.5">
              <span className="font-bold">Stephen, 27</span>
              <BiSolidBadgeCheck className="text-green-700 text-lg" />
            </p>
            <p className="text-gray-500 flex items-center">
              <span>{"Lekki"},&nbsp;</span>
              <span>Lagos</span>
            </p>
            <span className="text-blue-600 cursor-pointer hover:text-blue-400 transition-all active:text-blue-600">
              view profile
            </span>
          </div>

          <button className="bg-green-700 hover:bg-green-600 active:bg-green-700 p-2 text-xs transition-all text-white rounded-md md:hidden cursor-pointer w-fit">
            {" "}
            Accepted
          </button>
          <button className="bg-blue-700 hover:bg-blue-600 active:bg-blue-700 p-2 text-xs transition-all text-white hidden md:block rounded-md cursor-pointer w-fit">
            {" "}
            Chat now
          </button>
        </div>

        <p className="flex flex-col p-1">
          <span>
            <b>About</b>
          </span>
          <span className="text-justify whitespace-pre-wrap text-gray-600 tracking-wide text-xs mobile:text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            similique architecto, veritatis perferendis. Earum similique
            distinctio aspernatur quam molestias mollitia, id numquam
            accusantium, quisquam, qui velit doloremque ut obcaecati fugiat
            voluptate veniam vero. Omnis at vel aliquid modi libero, sint atque
            exercitationem in!
          </span>
        </p>

        <div className="flex flex-col gap-1">
          <p>
            <b>Hobbies</b>
          </p>
          <div className="flex items-center flex-wrap gap-2 mobile:text-sm">
            {
              <p className="rounded-full border p-1 pl-2 pr-2 w-fit border-blue-400 hover:scale-[1.01] cursor-default transition-all text-blue-700 bg-blue-50">
                Reading
              </p>
            }
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p>
            <b>Preferred location</b>
          </p>
          <div className="flex items-center flex-wrap gap-1 mobile:text-sm">
            {<p className="rounded-md border p-1">Reading</p>}
          </div>
        </div>

        <PropertyAttributesComponent />
        <div className="flex justify-center items-center">
          <button className="bg-blue-700 hover:bg-blue-600 active:bg-blue-700 p-2 text-xs transition-all text-white  md:hidden rounded-md cursor-pointer w-fit">
            {" "}
            Chat now
          </button>
        </div>
      </article>
    </div>
  );
}

export default RoommateDetails;