"use client";

import React from "react";
import FeatureCard from "./FeatureCard";

export default function FindFlatmate() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className={`bg-[#06215F] m-4 p-6 rounded md:w-[500px] md:max-w-[500px]`}>
        <h3 className="font-regular text-lg text-[#679BFF] md:text-xl pb-4">Sign Up</h3>

        <p className="text-sm md:text-base text-white">
          Join Resavation! Sign up using your email, complete your profile, set preferences, and write a captivating bio.
          Be transparent about your lifestyle to find the perfect flatmate. Start your search now!
        </p>
      </div>

      <div className={`bg-[#F5F5F5] m-4 p-6 rounded md:w-[500px] md:max-w-[500px]`}>
        <h3 className="font-regular text-lg md:text-xl pb-4">
          Browse and Connect
        </h3>

        <p className="text-sm md:text-base font-bold">
          Refine your search: <span className="font-normal">Set location, budget, and preferences. </span> <br />
          Review profiles: <span className="font-normal">Find shared interests and compatible lifestyles. </span> <br />
          Start a conversation: <span className="font-normal">Message potential flatmates to connect. </span> <br />
          Schedule a meeting: <span className="font-normal">Discuss expectations and details. </span> <br/>
          <span className="font-normal">Resavation makes finding your ideal flatmate effortless!</span>
        </p>
      </div>

      <div className={`bg-[#3b72f036] m-4 p-6 rounded  md:w-[500px] md:max-w-[500px]`}>
        <h3 className="font-regular text-lg md:text-xl pb-4">
          Review & Select flatmates
        </h3>

        <p className="text-sm md:text-base">
          Find the perfect flatmate with Resavation by conducting background
          checks, meeting in person to gauge compatibility, discussing important
          terms, and finalizing the selection process through the app.
        </p>
      </div>
    </div>
  );
}
