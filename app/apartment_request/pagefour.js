"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import arrowleft from "../../image/bck.png";
import male from "../../image/del.png";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";

const PageFour = ({ formData, setFormData }) => {
  const [amenity, setAmenity] = useState("");
  const [houseRule, setHouseRule] = useState("");

  const handleAmenityChange = (event) => {
    setAmenity(event.target.value);
  };

  const handleAddAmenity = () => {
    if (amenity.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        apartmentRequest: {
          ...prevData.apartmentRequest,
          amenities: [...prevData.apartmentRequest.amenities, amenity.trim()],
        },
      }));
      setAmenity(""); // Clear the input field after adding the amenity
    }
  };

  const handleHouseRuleChange = (event) => {
    setHouseRule(event.target.value);
  };

  const handleAddHouseRule = () => {
    if (houseRule.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        apartmentRequest: {
          ...prevData.apartmentRequest,
          houseRules: [
            ...prevData.apartmentRequest.houseRules,
            houseRule.trim(),
          ],
        },
      }));
      setHouseRule(""); // Clear the input field after adding the house rule
    }
  };

  const handleDeleteHouseRule = (index) => {
    const updatedHouseRules = [...formData.apartmentRequest.houseRules];
    updatedHouseRules.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      apartmentRequest: {
        ...prevData.apartmentRequest,
        houseRules: updatedHouseRules,
      },
    }));
  };

  const handleDeleteAmenity = (index) => {
    const updatedAmenities = [...formData.apartmentRequest.amenities];
    updatedAmenities.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      apartmentRequest: {
        ...prevData.apartmentRequest,
        amenities: updatedAmenities,
      },
    }));
  };

  console.log(formData);

  return (
    <div className="flex-col items-center justify-center ">
      <div className="w-full">
        <div className="mt-6 w-full ">
          <h3 className="font-montserrat text-base font-semibold leading-5 tracking-normal text-left">
            Amenities & Rules
          </h3>
        </div>

        <div className="w-full mt-6">
          <h3 className="font-montserrat font-medium text-base leading-5 tracking-normal">
            Amenities
          </h3>

          <div className="w-full mt-3">
            {formData.apartmentRequest.amenities.map((item, index) => (
              <div
                key={index}
                className="w-full h-9 sm:h-12 border flex items-center border-gray-300 hover:border rounded-md mt-4 lg:h-12 bg-white"
              >
                <div className="flex items-center justify-between w-full px-4">
                  <h3>{item}</h3>
                  <button
                    type="button"
                    className="focus:outline-none"
                    onClick={() => handleDeleteAmenity(index)}
                  >
                    <AiFillDelete className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full h-9 sm:h-12 border border-gray-300 hover:border rounded-md mt-4 lg:h-12 bg-white flex  items-center justify-between">
            <input
              type="text"
              value={amenity}
              onChange={handleAmenityChange}
              className="w-full h-full px-4 text-gray-700 rounded-md focus:outline-none"
              placeholder="Add Amenities"
            />
            <button
              type="button"
              className="focus:outline-none mr-2 shadow-lg grid place-content-center w-8 h-full"
              onClick={handleAddAmenity}
            >
              <AiOutlinePlus className="w-5 h-5 text-blue-500" />
            </button>
          </div>
        </div>

        <div className="w-full mt-6">
          <h3 className="font-montserrat font-medium text-base leading-5 tracking-normal">
            House Rules
          </h3>

          <div className="w-full mt-3">
            {formData.apartmentRequest.houseRules.map((item, index) => (
              <div
                key={index}
                className="w-full h-9 sm:h-12 border flex items-center border-gray-300 hover:border rounded-md mt-4 lg:h-12 bg-white"
              >
                <div className="flex items-center justify-between w-full px-4">
                  <h3>{item}</h3>
                  <button
                    type="button"
                    className="focus:outline-none"
                    onClick={() => handleDeleteHouseRule(index)}
                  >
                    <AiFillDelete className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full h-9 sm:h-12 border border-gray-300 hover:border rounded-md mt-4 lg:h-12 bg-white flex  items-center justify-between">
            <input
              type="text"
              value={houseRule}
              onChange={handleHouseRuleChange}
              className="w-full h-full px-4 text-gray-700 rounded-md focus:outline-none"
              placeholder="Add House Rule"
            />
            <button
              type="button"
              className="focus:outline-none mr-2 shadow-lg w-8 h-full grid place-content-center"
              onClick={handleAddHouseRule}
            >
              <AiOutlinePlus className="w-5 h-5 text-blue-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageFour;
