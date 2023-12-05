"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import arrowleft from "../../image/arrow-left.png";
import X from "../../image/x.png";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import PageOne from "./pageone";
import PageTwo from "./pagetwo";
import PageThree from "./pagethree";
import PageFour from "./pagefour";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";

const DefaultData = {
  preferredLocation: [],
  city: " ",
  country: "",
  state: "",
  gender: "",
  occupation: "",
  ageRange: [0],
  roomType: "SINGLE",
  bedroomType: "SINGLE BED",
  lengthOfStay: [0],
  roommateRequest: {
    adsTitle: "",
    moveInDate: "",
    rentBudget: [],
  },
  isApartmentRequest: false,
  isRoommateRequest: true,
};

const page = () => {
  const axiosPrivate = useAxiosPrivate()
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState(DefaultData);
  const [selectedMinBudget, setSelectedMinBudget] = useState(
    formData.roommateRequest.rentBudget[0]
  );
  const [selectedMaxBudget, setSelectedMaxBudget] = useState(
    formData.roommateRequest.rentBudget[1]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleBudgetChange = (field, value) => {
    if (field === "minBudget") {
      setSelectedMinBudget(value);
    } else if (field === "maxBudget") {
      setSelectedMaxBudget(value);
    }

    setFormData((prevData) => ({
      ...prevData,
      roommateRequest: {
        ...prevData.roommateRequest,
        rentBudget: [
          field === "minBudget" ? value : selectedMinBudget,
          field === "maxBudget" ? value : selectedMaxBudget,
        ],
      },
    }));
  };

  // Render the appropriate page based on the current page state
  let currentPageComponent;
  switch (currentPage) {
    case 1:
      currentPageComponent = (
        <PageOne
          formData={formData}
          handleChange={handleChange}
          setFormData={setFormData}
        />
      );
      break;
    case 2:
      currentPageComponent = (
        <PageTwo
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
        />
      );
      break;
    case 3:
      currentPageComponent = (
        <PageThree
          handleBudgetChange={handleBudgetChange}
          formData={formData}
          setFormData={setFormData}
        />
      );
      break;
    case 4:
      currentPageComponent = (
        <PageFour
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
        />
      );
      break;

    default:
      currentPageComponent = null;
  }

  const isCurrentPageValid = () => {
    if (currentPage === 1) {
      const { city, state, country, preferredLocation } = formData;

      // Check if city, state, and country are not empty
      const isLocationValid =
        city.trim() !== "" && state.trim() !== "" && country.trim() !== "";

      // Check if preferredLocation array has at least one location
      const isPreferredLocationValid = preferredLocation.length > 0;

      return isLocationValid && isPreferredLocationValid;
    } else if (currentPage === 2) {
      const { gender, moveInDate, occupation, ageRange } = formData;

      return (
        gender !== null &&
        moveInDate !== "" &&
        occupation.trim() !== "" &&
        ageRange[0] !== null &&
        ageRange[1] !== null
      );
    } else if (currentPage === 3) {
      const { roommateRequest, lengthOfStay, roomType, bedroomType } = formData;

      const isBudgetValid =
        roommateRequest.rentBudget[0] !== null &&
        roommateRequest.rentBudget[1] !== null &&
        roommateRequest.rentBudget[0] <= roommateRequest.rentBudget[1]; //This handles min and max

      const isLengthOfStayValid =
        lengthOfStay[0] > 0 &&
        lengthOfStay[1] > 0 &&
        lengthOfStay[0] <= lengthOfStay[1]; //This also handle min and max

      return (
        isBudgetValid &&
        isLengthOfStayValid &&
        roomType.trim() !== "" &&
        bedroomType.trim() !== ""
      );
    }
    return true;
  };

  const handleNext = (data) => {
    // Validate the current page before proceeding to the next page
    const isCurrentPageValid = isCurrentPageValid();
    if (isCurrentPageValid) {
      setCurrentPage(currentPage + 1);
      setFormData({ ...formData, ...data });
      console.log(formData);
    } else {
      alert(
        "Please fill all required fields on the current page before proceeding."
      );
    }
  };

  const handleBack = () => {
    setCurrentPage(currentPage - 1);
  };

  const isPageFourValid = () => {
    const { adsTitle } = formData.roommateRequest;

    return adsTitle.trim() !== "";
  };

  const router = useRouter();
  // get user items from localStorage
  const userToken =
    typeof window !== "undefined"
      ? window.localStorage.getItem("loggedIn_User")
      : false;
  const token = JSON.parse(userToken);
  console.log(token.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let msg;

    try {
      const isCurrentPageValid = isPageFourValid();
      if (!isCurrentPageValid) {
        alert(
          "Please fill all required fields on the current page before submitting."
        );
        return; // Prevent submission if the page is not valid
      }
      const response = await axiosPrivate.post('roommates/request', formData);
      // handle succesful response
      if (response.status === 200) {
        msg =
          response.data?.message ||
          "Successfully Uploaded your roommate request";
        alert(msg);
        router.push("/profile");
        return response.data;
      } else {
        throw new Error("bad request");
      }
    } catch (error) {
      msg =
        error.response?.data?.message ||
        " something went wrong, please try again";
      alert(msg);
      router.push("/profile");
      console.error(error);
    }
  };

  return (
    <div className=" w-[95%] md:w-2/3  m-auto px-4">
      <div className="flex  w-full mt-6 items-center justify-between">
        {currentPage > 1 ? (
          <FaArrowLeft className="w-3 text-3xl" onClick={handleBack} />
        ) : (
          <FaArrowRight
            className="w-3 text-lg font-semibold"
            onClick={handleNext}
          />
        )}
        <div className="text-base lg:w-[8rem] lg:h-10 lg:text-[30px] lg:flex lg:items-center lg:justify-center">
          Step {currentPage}-4
        </div>
      </div>
      <form>{currentPageComponent}</form>

      <div>
        {currentPage < 4 && (
          <button
            className="bg-blue-700 text-white mt-[4rem] w-[100%] h-9 rounded-md flex items-center justify-center lg:h-16"
            onClick={() => {
              if (isCurrentPageValid()) {
                setCurrentPage(currentPage + 1);
              } else {
                alert("Please fill all required fields ");
              }
            }}
          >
            Next
          </button>
        )}
        {currentPage === 4 && (
          <button
            className="bg-blue-700 text-white mt-[4rem] w-[100%] h-9 rounded-md flex items-center justify-center lg:h-16"
            onClick={handleSubmit}
          >
            Post Ads
          </button>
        )}
      </div>
    </div>
  );
};

export default page;
