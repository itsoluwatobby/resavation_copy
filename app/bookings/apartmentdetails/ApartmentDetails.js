"use client";
import React from "react";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { BiSolidBadgeCheck } from "react-icons/bi";
import { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useParams } from "next/navigation";
import {
  ApartmentAcceptDecline,
  ApartmentRentDetails,
} from "./ApartmentAcceptDecline.js";
import { ApartmentSentMakePayment } from "./ApartmentSentMakePayment.js";
import { ApartmentSentWithdraw } from "./ApartmentSentWithdraw.js";
import { PropertyAttributesComponent } from "@/components/PropertyAttributesComponent";

const ApartmentDetails = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const sendRequest = () => {
    console.log("request");
  };
  return (
    <div className="mt-4 bg-white  text-sm p-3 flex flex-col justify-between w-full sm:m-auto md:w-2/3 lg:w-[60%]">
      {/* desktop view banner  */}
      <figure className="relative w-full hidden md:block h-64 rounded-sm box-border">
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

        <p className="text-gray-500 flex items-center">
          <span>{"Lekki"},&nbsp;</span>
          <span>Lagos</span>
        </p>
      </figure>
      {/* Mobile view banner  */}
      <div className="relative md:hidden w-full flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Rental Details</h2>
          <h2 className="text-xl ">Roomates Details</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h2>ELeko Estate</h2>
            <p>Lekki Lagos</p>
          </div>
          <div>
            <img src="/appartment_room_1.png" alt="apartmentimage" />
          </div>
        </div>
      </div>
      {/* mobile view end  */}
      <div className="w-full h-[1px] md:hidden bg-[#c4c4c4] mt-6" />
      <article className="flex flex-col p-3 gap-3 md:mt-4">
        <div className="flex justify-between gap-6">
          <div className="w-[95%] md:w-[55%] md:mt-[70px]">
            <ApartmentAcceptDecline />
          </div>
          <div className="w-[40%] h-[350px] hidden md:block  rounded-md border border-gray-400 p-5">
            <div className="flex items-center justify-start ">
              <figure className=" w-14 h-14 border-2 border-white box-border rounded-full">
                <Image
                  width={20}
                  height={20}
                  src="/room_accept.png"
                  alt="Home"
                  loading="lazy"
                  className="rounded-full w-full h- hidden md:block object-cover"
                />
              </figure>
              <div className="flex flex-col font-medium text-xs gap-1">
                <p className="flex items-center gap-1.5">
                  <span className="font-bold">Stephen, 27</span>
                  <BiSolidBadgeCheck className="text-green-700 text-lg" />
                </p>

                <span className="text-blue-600 cursor-pointer hover:text-blue-400 transition-all active:text-blue-600">
                  view profile
                </span>
              </div>
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
                voluptate veniam vero. Omnis at vel aliquid modi libero, sint
                atque exercitationem in!
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
          </div>
        </div>
      </article>
    </div>
  );
};

export default ApartmentDetails;
