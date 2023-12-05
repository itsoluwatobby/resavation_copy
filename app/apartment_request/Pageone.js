"use client";
import React, { useState } from "react";

const page = ({ formData, setFormData, handleChange }) => {
  const Countries = [
    "Nigeria",
    "England",
    "USA",
    "Australia",
    "Ghana",
    "Canada",
  ];
  const States = ["Abia", "Imo", "Lagos", "Kano", "Kwara", "Anambra"];

  return (
    <div>
      <h3 className="ctext-base font-semibold leading-5 tracking-normal text-left my-2">
        Where do you live?
      </h3>
      <div className="flex flex-col items-center justify-center mx-auto w-full gap-y-3 mt-6">
        {/* Location */}
        <div className="mt-3 w-full">
          <label>
            <p className="font-montserrat font-medium text-base leading-5 tracking-normal lg:text-sm lg:mt-2">
              Your location
            </p>
            <div className="w-full  h-9 sm:h-12  border flex items-center  border-gray-300 hover:border rounded-md mt-2 lg:h-12 bg-white">
              {" "}
              <input
                type="text"
                name="preferredLocation"
                value={formData.preferredLocation[0]}
                onChange={handleChange}
                className="px-2 w-full h-full rounded-md border-none text-gray-700  focus:outline-none placeholder:text-sm"
                placeholder="Enter your address"
              />
            </div>
          </label>
        </div>

        {/* City */}

        <div className="mt-3 w-full">
          <label>
            <p className="font-montserrat font-medium text-base leading-5 tracking-normal lg:text-sm lg:mt-2">
              City
            </p>
            <div className="w-full h-9 sm:h-12 border flex items-center border-gray-300 hover:border rounded-md mt-2 lg:h-12 bg-white">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="px-2 w-full h-full rounded-md border-none text-gray-700 enabled:hover:border-none focus:outline-none focus:border-none placeholder:text-sm"
                placeholder="Enter your city"
              />
            </div>
          </label>
        </div>

        {/* State */}
        <div className="mt-3 w-full">
          <label>
            <p className="font-montserrat font-medium text-base leading-5 tracking-normal lg:text-sm lg:mt-2">
              State
            </p>
            <div className="w-full h-9 sm:h-12 border flex items-center border-gray-300 hover:border rounded-md mt-4 lg:h-12 bg-white pr-4">
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="px-2 w-full h-full rounded-md border-none text-gray-700 enabled:hover:border-none focus:outline-none focus:border-none"
              >
                <option value="">Select your state</option>
                {States.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </label>
        </div>

        {/* Country */}
        <div className="mt-3 w-full">
          <label>
            <p className="font-montserrat font-medium text-base leading-5 tracking-normal lg:text-sm lg:mt-2 ">
              Country
            </p>
            <div className="w-full h-9 sm:h-12 border flex items-center border-gray-300 hover:border rounded-md mt-4 lg:h-12 bg-white pr-4">
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="px-2 w-full h-full rounded-md border-none text-gray-700 enabled:hover:border-none focus:outline-none focus:border-none"
              >
                <option value="">Select your country</option>
                {Countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default page;
