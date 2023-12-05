"use client";
import { useState } from "react";
import Image from "next/image";
import featureImage from "../../public/room_accept.png";
import profileImage2 from "../../public/room_profile_image.png";
import { BsFillPatchCheckFill } from "react-icons/bs";
import {AiOutlineArrowLeft} from 'react-icons/ai'

const page = () => {
  const [isActive, setIsActive] = useState("accept");

  const handleActive = (state) => {
    setIsActive(state);
  };
  return (
    <div>
      <section>
        <div className="mt-10 px-10 mx-auto md:w-[60%]">
          <div className="flex flex-col md:flex-row md:justify-start md:items-center   ">
            <div className="w-full hidden md:block md:w-[200px] p-r-4">
              <Image
                className="rounded-full ima"
                src={featureImage}
                alt="feature-image"
                priority
                height={168}
                width={168}
              />
            </div>
            <div className="w-full relative md:w-[200px]md:hidden lg:hidden">
              <Image
                className="rounded-lg object-cover"
                src={profileImage2}
                alt="feature-image"
                priority
                height={338}
                width={390}
              />
              <AiOutlineArrowLeft
                color="white"
                className="top-[20%] left-[6%] absolute  md:hidden lg:hidden"
              />
            </div>
            <div className="   w-full">
              <div className="w-full flex justify-between items-center ">
                <div className=" py-4">
                  <h2 className="flex text-xl font-bold pb-4 md:text-3xl justify-start items-center gap-[1.2rem]">
                    Stephen, 27 <BsFillPatchCheckFill color="green" />{" "}
                  </h2>
                  <h3 className="font-bold pb-4">About</h3>
                  <p>I love basketball, volleyball and other </p>
                  <p>I code at times and i lobe to party as well</p>
                  <p>I code at times and i lobe to party as well</p>
                </div>
                <div className="md:-mt-10">
                  <span className="bg-[#074ce5] py-2 px-3 hidden md:block text-white font-regular rounded-lg">
                    {" "}
                    85% match
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col md:flex-row gap-3">
                    <p>Hobbies</p>{" "}
                    <p className=" text-black bg-[#d59b68]  text-center md:text-[#074ce5]  md:bg-[#cddcff] px-2 py-1 rounded-full w-[100px]">
                      Reading
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <p>Occupation</p> <p>self Employed</p>{" "}
                  </div>
                </div>
                <div className="flex justify-center py-8 gap-4">
                  <button
                    className={
                      isActive === "accept"
                        ? "bg-[#074ce5] py-3 px-[1.85rem] text-white font-regular rounded-lg"
                        : "bg-[#ebebeb] py-3 px-[1.85rem] text-black font-regular rounded-lg"
                    }
                    onClick={() => handleActive("accept")}
                  >
                    Accept
                  </button>
                  <button
                    className={
                      isActive === "decline"
                        ? "bg-[#074ce5] py-3 px-[1.85rem] text-white font-regular rounded-lg"
                        : "bg-[#ebebeb] py-3 px-[1.85rem] text-black font-regular rounded-lg"
                    }
                    onClick={() => handleActive("decline")}
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
