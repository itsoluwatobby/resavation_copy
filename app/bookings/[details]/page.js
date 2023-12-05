"use client";
import React from "react";
import AcceptDeclineCard from "../AcceptDeclineCard";
// import { useParams } from "next/navigation";

const page = ({ params }) => {
  const { details } = params;

  //    console.log(params)

  return (
    <div>
      <AcceptDeclineCard />
    </div>
  );
};

export default page;
