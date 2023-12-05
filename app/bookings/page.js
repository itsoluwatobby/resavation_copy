"use client";

import ApartmentBookingSentCard from "./ApartmentBookingSentCard";
import FlatmateBookingSentCard from "./FlatmateBookingSentCard";
import ApartmentBookingReceivedCard from "./ApartmentBookingReceivedCard";
import FlatmateBookingReceivedCard from "./FlatmateBookingReceivedCard ";
import { useEffect, useState } from "react";
import SentReceived from "./Sent_Received";
import RoommateSentCard from "./roommatedetails/RoommateDetails";
import axios from "axios";
import { IsLoadingModal } from "@/components/IsLoading";
import Link from "next/link";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";

// const metadata = {
//   title: "Resavation | Bookings",
//   description: "Flat and apartment booking",
// };

const Booking = () => {
  const axiosPrivate = useAxiosPrivate()
  const [isActive, setIsActive] = useState("flatmate");
  const [request, setRequest] = useState("sent");
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("accepted");
  const [isLoading, setIsLoading] = useState(false);
  const message = "this simple message";

  const handleActive = (active) => {
    setIsActive(active);
  };

  const userToken =
    typeof window !== "undefined"
      ? window.localStorage.getItem("loggedIn_User")
      : false;

  const token = JSON.parse(userToken);

  const handleRequest = async (request) => {
    setRequest(request);
  };
  const requestAPI = async () => {
    const accessToken = token.token;
    setIsLoading(true);
    try {
      const res = await axiosPrivate.get(`/roommates/profile/requests?type=${request}`);
      if (res.status === 200) {
        console.log("working");
      }
      setIsLoading(false);
      setData(res.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Kindly log in with your credentials.");
      } else {
        console.error("An error occurred:", error);
      }
    }
  };

  useEffect(() => {
    requestAPI();
  }, [request]);

  console.log(data);
  return (
    <div className="bg-white">
      <header className="bg-white">
        <div className="container px-4 lg:px-12 mx-auto py-[2.4rem]">
          <div className=" md:mx-[3rem] gap-2 grid md:grid-cols-2 lg:grid-cols-2">
            <button
              onClick={() => handleActive("flatmate")}
              className={`${
                isActive == "flatmate"
                  ? "bg-[#074ce5] text-white py-4 px-6 text-2xl text-center"
                  : "text-center bg-[#f5f5f5]  py-4 px-6 text-2xl"
              } `}
            >
              Flatmates
            </button>
            <button
              onClick={() => handleActive("apartment")}
              className={` ${
                isActive == "apartment"
                  ? "bg-[#074ce5] text-white py-4 px-6 text-2xl text-center"
                  : "text-center bg-[#f5f5f5]  py-4 px-6 text-2xl"
              } `}
            >
              Apartments
            </button>
          </div>
          {/* sent and received  */}
          {/* <SentReceived /> */}
        </div>
      </header>
      <div className="pb-[2rem]">
        {isActive == "flatmate" ? (
          <>
            <SentReceived request={request} handleRequest={handleRequest} />

            {request === "sent" ? (
              <div className="mt-4 bg-white flex-grow gap-3 text-sm p-3 flex  flex-col justify-between w-full sm:m-auto md:w-2/3 lg:w-[70%]">
                {isLoading ? (
                  <IsLoadingModal />
                ) : (
                  <Link href="/bookings/roommatedetails">
                    <FlatmateBookingSentCard status={status} />
                  </Link>
                )}
              </div>
            ) : (
              <div className="mt-4 bg-white flex-grow gap-3 text-sm p-3 flex  flex-col justify-between w-full sm:m-auto md:w-2/3 lg:w-[70%]">
                {isLoading ? (
                  <IsLoadingModal />
                ) : (
                  <Link href="/bookings/22">
                    <FlatmateBookingReceivedCard />
                  </Link>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            <div>
              <SentReceived request={request} handleRequest={handleRequest} />
            </div>
            {request === "sent" ? (
              <div className="mt-4 bg-white flex-grow gap-3 text-sm p-3 flex  flex-col justify-between w-full sm:m-auto md:w-2/3 lg:w-[70%]">
                {isLoading ? (
                  <IsLoadingModal />
                ) : (
                  <Link href="/bookings/apartmentdetails">
                    <div>
                      <ApartmentBookingSentCard status={status} />
                      <ApartmentBookingSentCard status={status} />
                    </div>
                  </Link>
                )}
              </div>
            ) : (
              <div className="mt-4 bg-white flex-grow gap-3 text-sm p-3 flex  flex-col justify-between w-full sm:m-auto md:w-2/3 lg:w-[70%]">
                {isLoading ? (
                  <IsLoadingModal />
                ) : (
                  <Link href="/bookings/apartmentdetails">
                    <ApartmentBookingReceivedCard />
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </div>
      <div className="w-full flex justify-center items-center pt-[4rem] bg-white">
        <ul className="flex justify-center items-center gap-2">
          <li className="px-[15px] py-[8px]  bg-[#f5f5f5] rounded-full text-black font-bold cursor-pointer  hover:bg-blue-600 hover:text-white ">
            1
          </li>
          <li className="px-[15px] py-[8px]  bg-[#f5f5f5] rounded-full text-black font-bold cursor-pointer  hover:bg-blue-600 hover:text-white ">
            2
          </li>
          <li className="px-[15px] py-[8px]  bg-[#f5f5f5] rounded-full  text-black font-bold cursor-pointer  hover:bg-blue-600 hover:text-white ">
            3
          </li>
          <li className="px-[15px] py-[8px]  bg-[#f5f5f5] rounded-full  text-black font-bold cursor-pointer  hover:bg-blue-600 hover:text-white">
            4
          </li>
          <li className="px-[15px] py-[8px]  bg-[#f5f5f5] rounded-full  text-black font-bold cursor-point hover:bg-blue-600 hover:text-white">
            5
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Booking;
