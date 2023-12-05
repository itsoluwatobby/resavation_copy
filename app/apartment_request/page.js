"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import arrowleft from "../../image/arrow-left.png";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import X from "../../image/x.png";
import Link from "next/link";
import PageTwo from "./pagetwo";
import PageThree from "./pagethree";
import PageFour from "./pagefour";
import PageFive from "./pagefive";
import PageOne from "./Pageone";
import { useRouter } from "next/navigation";
import { imageUpload } from "../../lib/fileUpload";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";

const page = () => {
  const axiosPrivate = useAxiosPrivate()
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [formData, setFormData] = useState({
    preferredLocation: [],
    city: "",
    state: "",
    country: "",
    ageRange: [],
    occupation: "",
    gender: "",
    apartmentRequest: {
      amenities: [],
      houseRules: [],
      propertyType: "",
      propertySummary: {
        bedroomsNumbers: 0,
        bathroomsNumbers: 0,
        roomsToRent: 0,
      },
      furnished: true,
      price: {
        priceType: "DAILY",
        amount: 0.0,
      },
      deposit: 0,
      availability: "",
      propertyTitle: " ",
      propertyDescription: " ",
      propertyImages: [],
    },
    roomType: "",
    bedroomType: "",
    lengthOfStay: [],
    isApartmentRequest: true,
    isRoommateRequest: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "preferredLocation") {
      setFormData((prevData) => ({ ...prevData, [name]: [value] }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Render the appropriate page based on the current page state
  let currentPageComponent;
  switch (currentPage) {
    case 1:
      currentPageComponent = (
        <PageOne formData={formData} handleChange={handleChange} />
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
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
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
    case 5:
      currentPageComponent = (
        <PageFive
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
      const { preferredLocation, city, state, country } = formData;
      return city.trim() !== "" && state.trim() !== "" && country.trim() !== "";
    } else if (currentPage === 2) {
      // Add validation logic for PageTwo here
      const { gender, occupation, ageRange } = formData;
      return (
        gender !== null && // Make sure gender is selected (not null)
        occupation.trim() !== "" && // Make sure occupation is filled
        ageRange[0] !== null && // Make sure minimum age is selected (not null)
        ageRange[1] !== null // Make sure maximum age is selected (not null)
      );
    } else if (currentPage === 3) {
      // Add validation logic for PageThree here
      const { apartmentRequest, lengthOfStay, roomType, bedroomType } =
        formData;
      const {
        propertyType,
        propertySummary,
        furnished,
        price,
        availability = "", // Initialize with an empty string to prevent undefined error
      } = apartmentRequest;

      return (
        propertyType.trim() !== "" &&
        propertySummary.bedroomsNumbers > 0 &&
        propertySummary.bathroomsNumbers > 0 &&
        propertySummary.roomsToRent > 0 &&
        roomType.trim() !== "" &&
        bedroomType.trim() !== "" &&
        furnished !== null &&
        lengthOfStay[0] !== null &&
        lengthOfStay[1] !== null &&
        price.priceType.trim() !== "" &&
        price.amount > 0 &&
        availability.trim() !== ""
      );
    } else if (currentPage === 4) {
      const { apartmentRequest } = formData;
      return (
        apartmentRequest.amenities.length > 0 && // Check if there is at least one amenity
        apartmentRequest.houseRules.length > 0 // Check if there is at least one house rule
      );
    }
    // Add other pages' validation logic if needed
    return false;
  };

  const handleNext = (data) => {
    // Validate the current page before proceeding to the next
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

  const isPageFiveValid = () => {
    const { propertyTitle, propertyDescription, propertyImages } =
      formData.apartmentRequest;

    return (
      propertyTitle.trim() !== "" &&
      propertyDescription.trim() !== "" &&
      propertyImages.length > 0
    );
  };
  const userToken =
    typeof window !== "undefined"
      ? window.localStorage.getItem("loggedIn_User")
      : false;

  const token = JSON.parse(userToken);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const isCurrentPageValid = isPageFiveValid();
      if (!isCurrentPageValid) {
        alert(
          "Please fill all required fields on the current page before submitting."
        );
        return;
      }

      setIsLoading(true);

      const {
        apartmentRequest: { propertyImages },
      } = formData;

      const imageUrls = await Promise.all(
        propertyImages?.map(async (image) => {
          const result = await imageUpload(image, "apartmentImages");
          return result?.url;
        })
      );

      const formRequest = {
        ...formData,
        apartmentRequest: {
          ...formData.apartmentRequest,
          propertyImages: [...imageUrls],
        },
      };
      const response = await axiosPrivate.post('/roommates/request', formRequest);
      // Handle successful response
      if (response.status === 200) {
        alert(response?.data?.message);
        router.push("/profile");
        return response;
      } else {
        throw new Error("Bad response");
      }
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || "An error occurred";
      alert(errorMessage);
      router.push("/profile");

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const {
    apartmentRequest: { deposit, ...rest },
  } = formData;
  const requiredData = { ...formData, apartmentRequest: { ...rest } };
  const canSubmit = [...Object.values(rest)].every(Boolean);

  return (
    <div className=" w-[95%] md:w-2/3 m-auto px-4">
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
          Step {currentPage}-5
        </div>
      </div>
      <form>{currentPageComponent}</form>

      <div>
        {currentPage < 5 && (
          <button
            disabled={!isCurrentPageValid()}
            className={`${
              isCurrentPageValid() ? "bg-blue-700" : "bg-gray-600"
            } text-white mt-[4rem] w-[100%] rounded-md flex items-center justify-center p-3`}
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
        {/* submit button need littile modification  */}
        {currentPage === 5 && (
          <button
            // disabled={
            //   error?.length > 0
            //     ? Boolean(error)
            //     : isLoading
            //     ? isLoading
            //     : !canSubmit
            // }
            className={`${
              canSubmit && !isLoading && !error?.length
                ? "bg-blue-700 hover:bg-blue-600 active:bg-blue-700"
                : "bg-gray-500"
            } ${isLoading ? "animate-pulse" : "animate-none"} 
                  ${
                    error?.length ? "bg-red-500" : ""
                  } text-white mt-[3rem] w-[100%] p-3 transition-all rounded-md flex items-center justify-center`}
            onClick={handleSubmit}
          >
            {error?.length
              ? error?.substring(0, 25) + "..."
              : isLoading
              ? "In Progress..."
              : "Submit"}
          </button>
        )}
      </div>
    </div>
  );
};

export default page;
