"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import arrowleft from "../../image/bck.png";
import male from "../../image/male.png";
import female from "../../image/female.png";
import home from "../../image/home.png";
import mdi from "../../image/mdi_worker.png";

import { FaMale, FaFemale, FaHome, FaBriefcase } from "react-icons/fa";

const pageTwo = ({ formData, setFormData, handleChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [moveInDate, setMoveInDate] = useState({ ...formData.moveInDate });
  const [selectedOccupation, setSelectedOccupation] = useState(null);
    const [ageBracket, setAgeBracket] = useState({
      minAge: 0,
      maxAge: 0,
    });
    const [ageError, setAgeError] = useState({
      isError: false,
      message: "Minimum age must not be greater than maximum age.",
    });

  const handleOptionClick = (value) => {
    setSelectedOption(value);
    // Update formData with the selected value
    setFormData((prevData) => ({
      ...prevData,
      gender: value, // Replace 'gender' with the corresponding field in formData
    }));
  };

  const handleMoveInDateChange = (event) => {
    const newMoveInDate = event.target.value;
    // setMoveInDate(newMoveInDate);
    // handleChange({
    //   target: {
    //     name: "moveInDate",
    //     value: newMoveInDate,
    //   },
    // });
    setFormData((formData) => ({
      ...formData,
      roommateRequest: {
        ...formData.roommateRequest,
        moveInDate: newMoveInDate,
      },
    }));
  };

  const handleOccupationClick = (value) => {
    setSelectedOccupation(value);
    setFormData((prevData) => ({
      ...prevData,
      occupation: value,
    }));
  };

  const handleAgeChange = (field, value) => {
    if (field === "minAge") {
      setAgeBracket((prev) => ({ ...prev, minAge: parseInt(value) }));

      if (parseInt(value) > ageBracket.maxAge) {
        setAgeError({
          isError: true,
          message: "Minimum age must not be greater than maximum age.",
        });
      } else {
        setAgeError({ isError: false, message: "" });
      }
    } else if (field === "maxAge") {
      setAgeBracket((prev) => ({ ...prev, maxAge: parseInt(value) }));

      if (parseInt(value) < ageBracket.minAge) {
        setAgeError({
          isError: true,
          message: "Maximum age must not be less than minimum age.",
        });
      } else {
        setAgeError({ isError: false, message: "" });
      }
    }
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      ageRange: [
        Math.min(ageBracket.minAge, ageBracket.maxAge),
        Math.max(ageBracket.minAge, ageBracket.maxAge),
      ],
    }));
  }, [ageBracket.minAge, ageBracket.maxAge]);

  return (
    <div>
      <div className="mt-6 w-full">
        <h3 className="font-montserrat text-base font-semibold leading-5 tracking-normal text-left">
          Roommate Preference
        </h3>
      </div>
      <div className="mt-8 w-full">
        <h3 className="font-montserrat font-medium text-base leading-5 tracking-normal">
          Gender
        </h3>
      </div>

      <div className="flex justify-center items-center">
        {/* //Male */}
        <button
          type="button" // Add this to prevent the page from reloading
          className={`h-14 w-14 md:w-20 md:h-20 p-2 md:p-4 mr-4 border border-gray-500 rounded-md flex-col items-center justify-center ${
            selectedOption === "male" ? "text-blue-700" : "text-black "
          }`}
          onClick={() => handleOptionClick("male")}
        >
          <div className=" ">
            <FaMale className="w-full md:text-3xl text-lg" />
            <span className="text-xs">Male</span>
          </div>
        </button>
        {/* //Female */}
        <button
          type="button" // Add this to prevent the page from reloading
          className={`h-14 w-14 md:w-20 md:h-20 p-2 md:p-4 mr-4 border border-gray-500 rounded-md flex-col items-center justify-center ${
            selectedOption === "female" ? "text-pink-700" : "text-black "
          }`}
          onClick={() => handleOptionClick("female")}
        >
          <div className=" ">
            <FaFemale className="w-full md:text-3xl text-lg" />
            <span className="text-xs">Female</span>
          </div>
        </button>
      </div>

      <div className="mt-8 w-full">
        <h3 className="font-montserrat font-medium text-base leading-5 tracking-normal">
          Move-in Date
        </h3>
      </div>
      <div className="w-full h-9 sm:h-12 border flex items-center border-gray-300 hover:border rounded-md mt-4 lg:h-12 bg-white">
        <input
          type="date"
          name="moveInDate"
          value={formData.moveInDate}
          onChange={handleMoveInDateChange}
          className="px-2 w-full h-8 rounded-md border-none text-gray-700 enabled:hover:border-none focus:outline-none focus:border-none"
          lang="en"
          min={new Date().toISOString().split("T")[0]}
        />
      </div>

      <div className="mt-8 w-full">
        <h3 className="font-montserrat font-medium text-base leading-5 tracking-normal">
          Occupation
        </h3>
      </div>

      <div className="flex justify-center items-center mt-4">
        {/* Occupation */}
        <button
          type="button"
          className={`h-14 w-14 mr-4 flex-col items-center justify-center ${
            selectedOccupation === "STUDENT" ? "text-blue-500" : "text-black"
          }`}
          onClick={() => handleOccupationClick("STUDENT")}
        >
          <div>
            <div className="md:w-12 md:h-12 p-2 border  border-gray-500 rounded-full">
              <FaHome className="w-full md:text-3xl text-2xl" />
            </div>
            <span className="text-xs pt-2">Student</span>
          </div>
        </button>
        <button
          type="button"
          className={`h-14 w-14 flex-col items-center justify-center ${
            selectedOccupation === "PROFESSIONAL"
              ? "text-blue-700"
              : "text-black"
          }`}
          onClick={() => handleOccupationClick("PROFESSIONAL")}
        >
          <div>
            <div className="md:w-12 md:h-12 p-2 border  border-gray-500 rounded-full">
              <FaBriefcase className="w-full md:text-3xl text-2xl" />
            </div>
            <span className="text-xs">Professional</span>
          </div>
        </button>
      </div>

      <div className="mt-8 w-full">
        <h3 className="font-montserrat font-medium text-base leading-5 tracking-normal">
          Age range
        </h3>
      </div>

      <div className="flex justify-center items-center mt-4">
        <div className="flex flex-col items-center justify-center mr-4">
          <select
            className="mt-1 p-3 border border-gray-500 rounded-md"
            value={formData?.ageRange[0] || ""}
            onChange={(e) => handleAgeChange("minAge", e.target.value)}
          >
            <option value="" className="text-xs">
              Min Age
            </option>
            {Array.from({ length: 33 }, (_, index) => index + 18).map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </select>{" "}
          <label className="text-xs">Minimum Age</label>
        </div>
        <div className="flex flex-col items-center justify-center">
          <select
            className="mt-1 p-3 border border-gray-500 rounded-md"
            value={formData?.ageRange[1] || 0}
            onChange={(e) => handleAgeChange("maxAge", e.target.value)}
          >
            <option value="" className="text-xs">
              Max Age
            </option>
            {Array.from({ length: 41 }, (_, index) => index + 30).map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </select>
          <label className="text-xs">Maximum Age</label>
        </div>
      </div>
      <div className="flex justify-center items-center">
        
      {ageError.isError && (
        <p className="text-red-500 text-sm mt-2">{ageError.message}</p>
      )}
    </div>
    </div>
  );
};

export default pageTwo;
