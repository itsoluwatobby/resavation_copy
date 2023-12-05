"use client";

import React from "react";
import { useState } from "react";

const SentReceived = ({ handleRequest, request, }) => {
  //   const [request, setRequest] = useState("sent");

  return (
    <div>
      <div className="flex gap-3 md:mx-[3rem] mt-[2rem] lg:w-[42%]   justify-center items-center">
        <h2
          className={` ${
            request == "sent"
              ? "bg-[#cddcff] p-3 text-sm w-[6rem] text-center cursor-pointer rounded-md"
              : "text-sm w-[6rem] shadow-md p-3 text-center cursor-pointer rounded-md"
          } `}
          onClick={() => {
            handleRequest("sent");
          }}
        >
          Sent
        </h2>
        <h2
          className={` ${
            request == "received"
              ? "bg-[#cddcff] p-3 text-sm w-[6rem] text-center cursor-pointer rounded-md"
              : "text-sm w-[6rem] shadow-md p-3 text-center cursor-pointer rounded-md"
          } `}
          onClick={() => {
            handleRequest("received");
          }}
        >
          Received
        </h2>
      </div>
    </div>
  );
};

export default SentReceived;
