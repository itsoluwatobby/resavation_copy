"use client";
import React, { useEffect, useState } from "react";
import { BiBed } from "react-icons/bi";
import { LiaBedSolid } from "react-icons/lia";

const PageThree = ({ formData, setFormData, handleChange }) => {
  // const apartment = ['Apartment', 'Bungalow']
  const propertyTypes = ["Bungalow", "Apartment"];

  // New state and update functions for roomType
  const [roomType, setRoomType] = useState("");

  //Bed type
  const [isSingleBed, setIsSingleBed] = useState(true);
  const [isDoubleBed, setIsDoubleBed] = useState(false);

  const [priceType, setPriceType] = useState("DAILY");
  const [priceAmount, setPriceAmount] = useState(0);

  const [depositAmount, setDepositAmount] = useState(0);

  const [availabilityDate, setAvailabilityDate] = useState("");
  const [lengthOfStay, setLengthOfStay] = useState({
    minLength: 1,
    maxLength: 1,
  });

  const handleAvailabilityDateChange = (event) => {
    let date = event.target.value;
    date = date.split("-");
    const formattedDate = `${date[2]}-${date[1]}-${date[0]}`;
    setAvailabilityDate(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      apartmentRequest: {
        ...prevData.apartmentRequest,
        availability: formattedDate,
      },
    }));
  };

  const handleDepositAmountChange = (event) => {
    setDepositAmount(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      apartmentRequest: {
        ...prevData.apartmentRequest,
        deposit: event.target.value,
      },
    }));
  };

  const handlePriceTypeChange = (event) => {
    setPriceType(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      apartmentRequest: {
        ...prevData.apartmentRequest,
        price: {
          priceType: event.target.value,
          amount: priceAmount,
        },
      },
    }));
  };

  const handlePriceAmountChange = (event) => {
    setPriceAmount(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      apartmentRequest: {
        ...prevData.apartmentRequest,
        price: {
          priceType: priceType,
          amount: event.target.value,
        },
      },
    }));
  };

  const handlePropertyTypeChange = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      apartmentRequest: {
        ...prevData.apartmentRequest,
        propertyType: value,
      },
    }));
  };

  const [bedroomCount, setBedroomCount] = useState(0);
  const [bathroomCount, setBathroomCount] = useState(0);
  const [roomsToRentCount, setRoomsToRentCount] = useState(0);

  const handleMinusClick = (setter) => {
    if (setter === setBedroomCount && bedroomCount > 0) {
      setter((prevCount) => prevCount - 1);
    } else if (setter === setBathroomCount && bathroomCount > 0) {
      setter((prevCount) => prevCount - 1);
    } else if (setter === setRoomsToRentCount && roomsToRentCount > 0) {
      setter((prevCount) => prevCount - 1);
    }
    setFormData((prevData) => ({
      ...prevData,
      apartmentRequest: {
        ...prevData.apartmentRequest,
        propertySummary: {
          ...prevData.apartmentRequest.propertySummary,
          bedroomsNumbers:
            setter === setBedroomCount
              ? prevData.apartmentRequest.propertySummary.bedroomsNumbers - 1
              : prevData.apartmentRequest.propertySummary.bedroomsNumbers,
          bathroomsNumbers:
            setter === setBathroomCount
              ? prevData.apartmentRequest.propertySummary.bathroomsNumbers - 1
              : prevData.apartmentRequest.propertySummary.bathroomsNumbers,
          roomsToRent:
            setter === setRoomsToRentCount
              ? prevData.apartmentRequest.propertySummary.roomsToRent - 1
              : prevData.apartmentRequest.propertySummary.roomsToRent,
        },
      },
    }));
  };

  const handleAdditionClick = (setter) => {
    setter((prevCount) => prevCount + 1);
    setFormData((prevData) => ({
      ...prevData,
      apartmentRequest: {
        ...prevData.apartmentRequest,
        propertySummary: {
          ...prevData.apartmentRequest.propertySummary,
          bedroomsNumbers:
            setter === setBedroomCount
              ? prevData.apartmentRequest.propertySummary.bedroomsNumbers + 1
              : prevData.apartmentRequest.propertySummary.bedroomsNumbers,
          bathroomsNumbers:
            setter === setBathroomCount
              ? prevData.apartmentRequest.propertySummary.bathroomsNumbers + 1
              : prevData.apartmentRequest.propertySummary.bathroomsNumbers,
          roomsToRent:
            setter === setRoomsToRentCount
              ? prevData.apartmentRequest.propertySummary.roomsToRent + 1
              : prevData.apartmentRequest.propertySummary.roomsToRent,
        },
      },
    }));
  };

  // Function to update roomType in formData
  const changeActive = (selectedType) => {
    setRoomType(selectedType);
    setFormData((prevData) => ({
      ...prevData,
      roomType: selectedType,
    }));
  };

  const changeYes = (option) => {
    // Set the "furnished" property in formData based on the selected option
    setFormData((prevData) => ({
      ...prevData,
      apartmentRequest: {
        ...prevData.apartmentRequest,
        furnished: option === "Yes", // If option is "Yes", set furnished to true, otherwise set it to false
      },
    }));
  };

  const bedType = () => {
    setIsSingleBed(true);
    setIsDoubleBed(false);
    setFormData((prevData) => ({
      ...prevData,
      apartmentRequest: {
        ...prevData.apartmentRequest,
        bedroomType: "Single bed",
      },
    }));
  };
  /**
 * type === "min"
          ? [value, prevData.lengthOfStay[1]]
          : [prevData.lengthOfStay[0], value]
 */
  const handleLengthOfStayChange = (event, type) => {
    const value = parseInt(event.target.value);
    type === "min"
      ? setLengthOfStay((prev) => ({ ...prev, minLength: value }))
      : setLengthOfStay((prev) => ({ ...prev, maxLength: value }));
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      lengthOfStay: [...Object.values(lengthOfStay)],
    }));
  }, [lengthOfStay?.minLength, lengthOfStay?.maxLength]);

  console.log(formData);

  const [progress, setProgress] = useState(0);

  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedd, setIsCheckedd] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isCheckedd);
  };
  const uncheckCheckbox = () => {
    setIsChecked(false);
  };
  const uncheckCheckboxx = () => {
    setIsCheckedd(false);
  };

  const handleCheckboxChangee = () => {
    setIsCheckedd(!isCheckedd);
  };

  const handleProgressChange = (e) => {
    const value = e.target.value;
    setProgress(value);
  };

  const [chosenApartment, setChosenApartment] = useState("");

  const [number, setNumber] = useState("");

  const handleInputChange = (e) => {
    setNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform further operations with the number value
    console.log(number);
  };
  const [numberr, setNumberr] = useState("");

  return (
    <div className="sm:w-[100%] lg:mx-auto lg:mt-1 lg:w-[100%] lg:relative font-montserrat">
      <div className="w-[100%]">
        <div className="flex flex-col items-center justify-center mx-auto relative">
          <div className="mt-6 w-full">
            <h3 className="font-montserrat text-base font-semibold leading-5 tracking-normal text-left">
              Roommate Preference
            </h3>
          </div>
          <div className="mt-6 w-full">
            <h3 className="font-montserrat font-medium text-base leading-5 tracking-normal">
              Property type
            </h3>
          </div>

          <div className="w-full h-9 sm:h-12 border flex items-center border-gray-300 hover:border rounded-md mt-4 lg:h-12 bg-white md:pr-4">
            <select
              value={formData.apartmentRequest.propertyType}
              onChange={handlePropertyTypeChange}
              className="px-2 w-full h-full rounded-md border-none text-gray-700 enabled:hover:border-none focus:outline-none focus:border-none"
            >
              <option value="">Select property type</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6 w-full">
            <h3 className="font-montserrat font-medium text-base leading-5 tracking-normal">
              Property summary
            </h3>
          </div>

          <div className="w-full">
            <div className="mt-3 w-full flex flex-row items-center justify-between lg:w-5/12">
              <h3 className="text-[14px]">Number of Bedrooms</h3>
              <button
                type="button"
                onClick={() => handleMinusClick(setBedroomCount)}
                className="w-[1.5rem] h-[1.5rem] rounded-full border border-gray-300 flex items-center justify-center font-bold"
              >
                -
              </button>
              <h1 className="w-[2.3rem] h-[1.3rem] rounded-md border border-gray-300 flex items-center justify-center font-semibold">
                {bedroomCount}
              </h1>
              <button
                type="button"
                onClick={() => handleAdditionClick(setBedroomCount)}
                className="w-[1.5rem] h-[1.5rem] rounded-full border border-gray-300 flex items-center justify-center font-bold"
              >
                +
              </button>
            </div>

            <div className="w-full">
              <div className="mt-3 w-full flex flex-row items-center justify-between lg:w-5/12">
                <h3 className="text-[14px]">Number of Bathrooms</h3>
                <button
                  type="button"
                  onClick={() => handleMinusClick(setBathroomCount)}
                  className="w-[1.5rem] h-[1.5rem] rounded-full border border-gray-300 flex items-center justify-center font-bold"
                >
                  -
                </button>
                <h1 className="w-[2.3rem] h-[1.3rem]  rounded-md border border-gray-300 flex items-center justify-center font-semibold">
                  {bathroomCount}
                </h1>
                <button
                  type="button"
                  onClick={() => handleAdditionClick(setBathroomCount)}
                  className="w-[1.5rem] h-[1.5rem] rounded-full border border-gray-300 flex items-center justify-center font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="w-full">
              <div className="mt-3 w-full flex flex-row items-center justify-between lg:w-5/12">
                <h3 className="text-[14px]">Available rooms to rent</h3>
                <button
                  type="button"
                  onClick={() => handleMinusClick(setRoomsToRentCount)}
                  className="w-[1.5rem] h-[1.5rem] rounded-full border border-gray-300 flex items-center justify-center font-bold"
                >
                  -
                </button>
                <h1 className="w-[2.3rem] h-[1.3rem]  rounded-md border border-gray-300 flex items-center justify-center font-semibold">
                  {roomsToRentCount}
                </h1>
                <button
                  type="button"
                  onClick={() => handleAdditionClick(setRoomsToRentCount)}
                  className="w-[1.5rem] h-[1.5rem] rounded-full border border-gray-300 flex items-center justify-center font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 w-full">
            <h3 className="font-montserrat font-medium text-base leading-5 tracking-normal">
              Room type
            </h3>
          </div>

          <div className="w-full">
            {/* Room Type */}
            <div className="w-full mt-3 lg:w-5/12">
              <div className="w-full flex flex-row gap-5 mt-5 h-8 lg:w-3/12">
                <div
                  className="w-3/6 flex items-center justify-center h-8 px-[4rem] rounded-md cursor-pointer bg-gray-100 shadow-lg"
                  onClick={() => changeActive("Single")}
                  style={{
                    backgroundColor: roomType === "Single" ? "blue" : "inherit",
                    color: roomType === "Single" ? "white" : "black",
                  }}
                >
                  Single
                </div>
                <div
                  className="w-3/6 flex items-center px-[4rem] justify-center cursor-pointer h-8 rounded-md bg-gray-100 shadow-lg"
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

          <div className="mt-8 w-full">
            <h3 className="font-montserrat font-medium text-base leading-5 tracking-normal">
              Furnished
            </h3>
          </div>

          <div className="w-full">
            <div className="w-full flex flex-row mt-5 gap-4 h-8 lg:w-3/12">
              <div
                className="w-3/6 flex items-center justify-center cursor-pointer h-8 rounded-md bg-gray-100 shadow-lg"
                onClick={() => changeYes("Yes")}
                style={{
                  backgroundColor: formData.apartmentRequest.furnished
                    ? "blue"
                    : "inherit",
                  color: formData.apartmentRequest.furnished
                    ? "white"
                    : "black",
                }}
              >
                Yes
              </div>
              <div
                className="w-3/6 flex items-center justify-center cursor-pointer h-8 rounded-md bg-gray-100 shadow-lg"
                onClick={() => changeYes("No")}
                style={{
                  backgroundColor: !formData.apartmentRequest.furnished
                    ? "blue"
                    : "inherit",
                  color: !formData.apartmentRequest.furnished
                    ? "white"
                    : "black",
                }}
              >
                No
              </div>
            </div>
          </div>

          <div className="mt-8 w-full">
            <h3 className="font-montserrat font-medium text-base leading-5 tracking-normal">
              Bedroom type
            </h3>
          </div>

          <div className="w-full">
            <div className="w-full gap-14 flex flex-row mt-3 items-center justify-center lg:w-3/12">
              <div
                className={`flex flex-col items-center justify-center cursor-pointer ${
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
                <div className="w-[5rem] h-[5rem] border border-gray-500 rounded-full flex flex-col items-center justify-center lg:h-[3rem] lg:w-[3rem]">
                  <BiBed className="w-10 h-10" />
                </div>
                <h3 className="text-[10px]">Single bed</h3>
              </div>
              <div
                className={`flex flex-col items-center justify-center cursor-pointer ${
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
                <div className="w-[5rem] h-[5rem] border border-gray-500 rounded-full flex flex-col items-center justify-center lg:h-[3rem] lg:w-[3rem]">
                  <LiaBedSolid className="w-10 h-10" />
                </div>
                <h3 className="text-[10px]">Double bed</h3>
              </div>
            </div>
          </div>

          <div className="mt-8 w-full">
            <h3 className="font-montserrat font-medium text-base leading-5 tracking-normal">
              Length of stay
            </h3>
          </div>

          <div className="flex justify-center items-center mt-4">
            <div className="flex flex-col items-center justify-center mr-4">
              <select
                className="mt-1 p-3 border border-gray-500 rounded-md"
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
              </select>
              <label className="text-xs">Minimum Length of Stay</label>
            </div>
            <div className="flex flex-col items-center justify-center">
              <select
                className="mt-1 p-3 border border-gray-500 rounded-md"
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
              </select>
              <label className="text-xs">Maximum Length of Stay</label>
            </div>
          </div>

          <div className="w-full">
            <div className="mt-8 w-full lg:w-4/12">
              <div className="mt-8 w-full lg:w-4/12">
                <div>
                  <h3 className="font-montserrat font-medium text-base leading-5 tracking-normal">
                    Price
                  </h3>
                </div>
                <h6 className="mt-4 text-sm">
                  How much is the rent you're asking?
                </h6>
                <div className="w-full h-9 sm:h-12 border flex items-center border-gray-300 hover:border rounded-md mt-4 lg:h-12 bg-white ">
                  <select
                    // value={priceType}
                    onChange={handlePriceTypeChange}
                    className="px-2 w-full h-full rounded-md border-none text-gray-700 enabled:hover:border-none focus:outline-none focus:border-none"
                  >
                    <option value="DAILY">Per Day</option>
                    <option value="MONTHLY">Per Month</option>
                  </select>
                </div>
                <div className="w-full h-9 sm:h-12 border flex items-center border-gray-300 hover:border rounded-md mt-4 lg:h-12 bg-white ">
                  <input
                    type="number"
                    // value={priceAmount}
                    onChange={handlePriceAmountChange}
                    placeholder="#"
                    min={0}
                    step={50}
                    className="px-2 w-full h-full rounded-md border-none text-gray-700 enabled:hover:border-none focus:outline-none focus:border-none"
                  />
                </div>
              </div>

              <div className="mt-5">
                <h3 className="font-montserrat font-medium text-base leading-5 tracking-normal">
                  Deposits (optional)
                </h3>
                <h5 className="text-sm">Amount Required Up-front</h5>
              </div>
              <div className="w-full h-9 sm:h-12 border flex items-center border-gray-300 hover:border rounded-md mt-4 lg:h-12 bg-white ">
                <input
                  type="number"
                  // value={depositAmount}
                  onChange={handleDepositAmountChange}
                  placeholder="#"
                  min={0}
                  step={50}
                  className="px-2 w-full h-full rounded-md border-none text-gray-700 enabled:hover:border-none focus:outline-none focus:border-none"
                />
              </div>

              <div className="mt-5">
                <h3 className="text-sm">Available from</h3>
                <h5 className="text-sm">Enter a Date in DD/MM/YYYY Format</h5>
              </div>
              <div className="w-full h-9 sm:h-12 border flex items-center border-gray-300 hover:border rounded-md mt-4 lg:h-12 bg-white ">
                <input
                  type="date"
                  value={availabilityDate}
                  onChange={handleAvailabilityDateChange}
                  className="px-2 w-full h-8 rounded-md border-none text-gray-700 enabled:hover:border-none focus:outline-none focus:border-none"
                  lang="en"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageThree;
