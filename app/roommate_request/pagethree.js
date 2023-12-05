"use client";
import React, { useState } from "react";
import { BiBed } from "react-icons/bi";
import { LiaBedSolid } from "react-icons/lia";

const PageThree = ({ formData, setFormData, handleBudgetChange }) => {
  const [roomType, setRoomType] = useState("");



  const handleLengthOfStayChange = (event, type) => {
    const value = parseInt(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      lengthOfStay:
        type === "min"
          ? [value, prevData.lengthOfStay[1]]
          : [prevData.lengthOfStay[0], value],
    }));
  };

  const changeActive = (selectedType) => {
    setRoomType(selectedType);
    setFormData((prevData) => ({
      ...prevData,
      roomType: selectedType,
    }));
  };

  console.log(formData);

  return (
    <div>
      <div className="mt-6 w-full">
        <h3 className="font-montserrat text-base font-semibold leading-5 tracking-normal text-left">
          Room Preference
        </h3>
      </div>

      <div className="mt-8 w-full">
        <h3 className="font-montserrat font-medium text-base leading-5 tracking-normal">
          Rent Budget
        </h3>
      </div>

      <div className="mt-5 flex justify-center items-center space-y-0 space-x-4">
        <div className="w-full md:w-40">
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={formData.roommateRequest.rentBudget[0]}
            onChange={(e) =>
              handleBudgetChange("minBudget", parseInt(e.target.value))
            }
          />
          <label className="text-xs">Min Budget</label>
        </div>
        <div className="w-full md:w-40">
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={formData.roommateRequest.rentBudget[1]}
            onChange={(e) =>
              handleBudgetChange("maxBudget", parseInt(e.target.value))
            }
          />
          <label className="text-xs">Max Budget</label>
        </div>
      </div>

      <div className="mt-5 w-full">
        <h3 className="font-montserrat font-medium text-base leading-5 tracking-normal">
          Length of stay
        </h3>
      </div>
      <div className="flex justify-center items-center mt-4">
        <div className="flex flex-col items-center justify-center mr-4">
          <select
            className="mt-1 p-3 border border-gray-300 rounded-md"
            value={formData.lengthOfStay[0]}
            onChange={(event) => handleLengthOfStayChange(event, "min")}
          >
            {Array.from({ length: 12 }, (_, index) => index + 1).map(
              (months) => (
                <option key={months} value={months}>
                  {months} month{months > 1 ? "s" : ""}
                </option>
              )
            )}
          </select>{" "}
          <label className="text-xs">Minimum Length of Stay</label>
        </div>
        <div className="flex flex-col items-center justify-center">
          <select
            className="mt-1 p-3 border border-gray-300 rounded-md"
            value={formData.lengthOfStay[1]}
            onChange={(event) => handleLengthOfStayChange(event, "max")}
          >
            {Array.from({ length: 12 }, (_, index) => index + 1).map(
              (months) => (
                <option key={months} value={months}>
                  {months} month{months > 1 ? "s" : ""}
                </option>
              )
            )}
          </select>{" "}
          <label className="text-xs">Maximum Length of Stay</label>
        </div>
      </div>

      <div className="mt-5 w-full">
        <h3 className="font-montserrat font-medium text-base leading-5 tracking-normal">
          Room type
        </h3>
      </div>
      <div className="w-full">
        {/* Room Type */}
        <div className="w-full mt-3 lg:w-5/12">
          <div className="w-full flex flex-row mt-5 h-8 lg:w-3/12">
            <div
              className="w-3/6 flex items-center justify-center h-8 px-[3rem] rounded-md hover:cursor-pointer bg-gray-100 shadow-lg"
              onClick={() => changeActive("Single")}
              style={{
                backgroundColor: roomType === "Single" ? "blue" : "inherit",
                color: roomType === "Single" ? "white" : "black",
              }}
            >
              Single
            </div>
            <div
              className="w-3/6 flex items-center justify-center h-8 px-[3rem] rounded-md hover:cursor-pointer bg-gray-100 shadow-lg"
              onClick={() => changeActive("Shared")}
              style={{
                backgroundColor: roomType === "Shared" ? "blue" : "inherit",
                color: roomType === "Shared" ? "white" : "black",
              }}
            >
              {" "}
              Shared
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 w-full">
        <h3 className="font-montserrat font-medium text-base leading-5  tracking-normal">
          Bedroom type
        </h3>
      </div>

      <div className="w-full">
        <div className="w-full gap-14 flex flex-row mt-3 items-center justify-center lg:w-3/12">
          <div
            className={`flex flex-col items-center justify-center ${
              formData.bedroomType === "Single bed"
                ? "text-blue-500 "
                : "text-gray-500 "
            }`}
            onClick={() => {
              setFormData((prevData) => ({
                ...prevData,
                bedroomType: "Single bed",
              }));
            }}
          >
            <div className="w-[5rem] h-[5rem] border border-gray-500 rounded-full flex flex-col hover:cursor-pointer items-center justify-center lg:h-[3rem] lg:w-[3rem]">
              <BiBed className="w-10 h-10" />
            </div>
            <h3 className="text-[10px]">Single bed</h3>
          </div>
          <div
            className={`flex flex-col items-center justify-center ${
              formData.bedroomType === "Double bed"
                ? "text-blue-700"
                : " text-black"
            }`}
            onClick={() => {
              setFormData((prevData) => ({
                ...prevData,
                bedroomType: "Double bed",
              }));
            }}
          >
            <div className="w-[5rem] h-[5rem] border border-gray-500 rounded-full flex flex-col items-center hover:cursor-pointer justify-center lg:h-[3rem] lg:w-[3rem]">
              <LiaBedSolid className="w-10 h-10" />
            </div>
            <h3 className="text-[10px]">Double bed</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageThree;
