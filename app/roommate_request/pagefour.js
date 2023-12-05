import React, { useState } from "react";
import arrowleft from "../../image/bck.png";
import Link from "next/link";
import Image from "next/image";

const PageFour = ({ setFormData, formData }) => {
  const [adsTitle, setAdsTitle] = useState("");

  const handleAdsTitleChange = (event) => {
    const value = event.target.value;
    setAdsTitle(value);
    setFormData((prevData) => ({
      ...prevData,
      roommateRequest: {
        ...prevData.roommateRequest,
        adsTitle: value,
      },
    }));
  };

  console.log(formData);
  return (
    <div>
      <div className="mt-8 w-full">
        <h3 className="font-montserrat text-base font-semibold leading-5 tracking-normal text-left">
          About Ads
        </h3>
      </div>
      <div className="mt-8 w-full">
        <h3 className="font-montserrat font-medium text-base leading-5 tracking-normal">
          Ads title
        </h3>
      </div>
      <div className="w-full">
        <div className="w-full h-9 sm:h-12 border flex items-center border-gray-300 hover:border rounded-md mt-4 lg:h-12 bg-white">
          {" "}
          <input
            type="text"
            value={adsTitle}
            onChange={handleAdsTitleChange}
            className="px-2 w-full h-8 rounded-md border-none text-gray-700 enabled:hover:border-none focus:outline-none focus:border-none placeholder:text-sm"
          />
        </div>

        <label className="text-xs">Enter Ads Title</label>
      </div>
    </div>
  );
};

export default PageFour;
