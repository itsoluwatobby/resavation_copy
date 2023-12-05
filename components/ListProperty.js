"use client"

import React from 'react'

import FeatureCard from './FeatureCard'

export default function ListProperty() {
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
          Post Property
        </h3>

        <p className="text-sm md:text-base">
          Describe your property with compelling details, showcasing its key features and convenient location. 
          Be upfront about house rules and shared responsibilities. Start your search with Resavation today!
        </p>
      </div>

      <div className={`bg-[#3b72f036] m-4 p-6 rounded  md:w-[500px] md:max-w-[500px]`}>
        <h3 className="font-regular text-lg md:text-xl pb-4">
          Review & Select flatmates
        </h3>

        <p className="text-sm md:text-base">
          Respond promptly to inquiries, engage in conversations, and arrange property viewings. 
          Choose the perfect match for your property. Take action with Resavation today!
        </p>
      </div>
    </div>
  );
}
