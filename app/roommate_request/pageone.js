"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import arrowleft from "../../image/arrow-left.png";
import X from "../../image/x.png";
import Link from "next/link";
import axios from "axios";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";

const pageone = ({ handleChange, formData, setFormData }) => {
  const axiosPrivate = useAxiosPrivate()
  const Countries = [
    "Nigeria",
    "England",
    "USA",
    "Australia",
    "Ghana",
    "Canada",
  ];
  const States = ["Abia", "Imo", "Lagos", "Kano", "Kwara", "Anambra"];

  const [preferredLocationItem, setPreferredLocationItem] = useState("");

  const handlePreferredLocationItemChange = (event) => {
    setPreferredLocationItem(event.target.value);
  };

  const handleAddPreferredLocation = () => {
    if (preferredLocationItem.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        preferredLocation: [
          ...prevData.preferredLocation,
          preferredLocationItem.trim(),
        ],
      }));
      setPreferredLocationItem(""); // Clear the input field after adding the preferred location
    }
  };

  const handleDeletePreferredLocation = (index) => {
    const updatedPreferredLocations = [...formData.preferredLocation];
    updatedPreferredLocations.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      preferredLocation: updatedPreferredLocations,
    }));
  };

  console.log(formData);

  return (
    <div>
      <div>
        <div className="mt-6 w-full">
          <h3 className="font-montserrat text-base font-semibold leading-5 tracking-normal text-left">
            Where do you want to live?
          </h3>
        </div>
        <div className="mt-6 w-full">
          <h3 className="font-montserrat font-medium text-base leading-5 tracking-normal lg:text-sm">
            Preferred location
          </h3>
        </div>

        <div className="border border-gray-300 hover:border rounded-md mt-4">
          <div className="w-full h-9 sm:h-12 border flex items-center hover:border-none rounded-md lg:h-12 bg-white">
            <input
              type="text"
              value={preferredLocationItem}
              onChange={handlePreferredLocationItemChange}
              className="px-2 w-full h-8 rounded-md border-none text-gray-700 enabled:hover:border-none focus:outline-none focus:border-none placeholder:text-sm"
              placeholder="Enter preferred location"
            />
            <button
              type="button"
              className="focus:outline-none mr-4"
              onClick={handleAddPreferredLocation}
            >
              <AiOutlinePlus className="w-5 h-5 text-blue-500" />
            </button>
          </div>

          <div className="w-full  flex flex-wrap">
            {formData.preferredLocation.map((item, index) => (
              <div
                key={index}
                className="h-9 sm:h-12 border flex items-center border-gray-300 rounded-md m-2 lg:h-12 bg-white"
              >
                <div className="flex items-center justify-between mx-2 px-4">
                  <h3 className="mr-2">{item}</h3>
                  <button
                    type="button"
                    className="focus:outline-none"
                    onClick={() => handleDeletePreferredLocation(index)}
                  >
                    <AiFillDelete className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 w-full">
          <label>
            <p className="font-montserrat font-medium text-base leading-5 tracking-normal lg:text-sm lg:mt-2">
              City
            </p>
            <div className="w-full h-9 sm:h-12 border flex items-center border-gray-300 hover:border rounded-md mt-4 lg:h-12 bg-white">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="px-2 w-full h-8 rounded-md border-none text-gray-700 enabled:hover:border-none focus:outline-none focus:border-none placeholder:text-sm"
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
            <div className="w-full h-9 sm:h-12 border flex items-center border-gray-300 hover:border rounded-md mt-4 lg:h-12 bg-white md:pr-4">
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="px-2 w-full h-10 rounded-md border-none text-gray-700 enabled:hover:border-none focus:outline-none focus:border-none"
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
          <p className="font-montserrat font-medium text-base leading-5 tracking-normal lg:text-sm lg:mt-2 ">
            Country
          </p>
          <div className="w-full h-9 sm:h-12 border flex items-center border-gray-300 hover:border rounded-md mt-4 lg:h-12 bg-white md:pr-4">
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="px-2 w-full h-10 rounded-md border-none text-gray-700 enabled:hover:border-none focus:outline-none focus:border-none"
            >
              <option value="">Select your country</option>
              {Countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default pageone;
