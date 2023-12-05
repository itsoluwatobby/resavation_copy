"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import arrowleft from "../../image/bck.png";
import first from "../../image/first.png";
import sec from "../../image/2nd.png";

const PageFive = ({ formData, setFormData }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

 const handlePropertyTitleChange = (event) => {
   const newTitle = event.target.value;
   setTitle(newTitle);
   if (newTitle.length >= 3) {
     setTitleError("");
     setFormData((prevData) => ({
       ...prevData,
       apartmentRequest: {
         ...prevData.apartmentRequest,
         propertyTitle: newTitle,
       },
     }));
   } else {
     setTitleError("Property title must be at least 3 characters");
   }
  };
  
 const handlePropertyDescriptionChange = (event) => {
   const newDescription = event.target.value;
   if (newDescription.length <= 300) {
     setDescription(newDescription);
     setDescriptionError("");
     setFormData((prevData) => ({
       ...prevData,
       apartmentRequest: {
         ...prevData.apartmentRequest,
         propertyDescription: newDescription,
       },
     }));
   } else {
     setDescriptionError("Description can't exceed 300 characters");
   }
 };

  const handleImageChange = (event) => {
    const files = event.target.files;
    setSelectedImages([...selectedImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    const targetImage = selectedImages[index]
    const otherImages = selectedImages.filter(image => image.name !== targetImage.name)
    setSelectedImages([...otherImages])
  }

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      apartmentRequest: {
        ...prevData.apartmentRequest,
        propertyImages: [...selectedImages]
      },
    }));
  }, [selectedImages, setFormData]);

  console.log(formData);

  // const handleImageChange = (event) => {
  //   setSelectedImage(URL.createObjectURL(event.target.files[0]));
  // };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="mt-6 w-full">
        <h3 className="font-montserrat text-[13px] font-semibold leading-5 tracking-normal text-left">
          About Property
        </h3>
      </div>
      <div className="mt-6 w-full">
        <h3 className="font-montserrat font-medium text-[13px] leading-5 tracking-normal">
          Property Title
        </h3>
      </div>
      <div className="w-full flex flex-row mt-3">
        <div className="w-full h-9 sm:h-12 border flex items-center border-gray-300 hover:border rounded-md mt-4 lg:h-12 bg-white">
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={handlePropertyTitleChange}
            minLength={3}
            className="px-2 w-full h-full rounded-md border-none text-gray-700 enabled:hover:border-none focus:outline-none focus:border-none placeholder:text-sm"
          />
        </div>
      </div>
      {titleError && (
        <p className="text-[10px] text-red-500 mt-1">{titleError}</p>
      )}

      <div className="mt-3 w-full">
        <h3 className="font-montserrat font-medium text-[13px] leading-5 tracking-normal">
          Property Description
        </h3>
      </div>
      <div className="w-full">
        <textarea
          type="textarea"
          className=" font-montserrat text-[13px] h-16 font-normal leading-5 tracking-normal text-left w-full  border border-gray-300 hover:border rounded-md mt-4 lg:h-12 bg-white"
          onChange={handlePropertyDescriptionChange}
          maxLength={300}
        />
      </div>
      {descriptionError && (
        <p className="text-[10px] text-red-500 mt-1">{descriptionError}</p>
      )}

      <div className="w-full">
        <div className="mt-3 w-full lg:w-3/12">
          <h3 className="font-montserrat font-medium text-[13px] leading-5 tracking-normal">
            Property Images
          </h3>
          <p className="text-[10px]">
            Image(s) help prospective tenant imagine staying in your place. You
            can add up to 10 images of your property
          </p>
        </div>
      </div>

      <div className="w-full">
        <div className="mt-4 flex gap-4">
          <figure className="relative flex items-center h-44 w-44 rounded-md">
            <Image src={first} alt="" />
            <button
              type="button"
              className="absolute rounded-md p-2 hover:opacity-90 transition-all active:opacity-100 translate-x-[50%] opacity-50 text-white bg-gray-700"
             
            >
              Sample
            </button>
          </figure>
          <figure className="relative flex items-center h-44 w-44 rounded-md ">
            <Image src={sec} alt="" />
            <button
              type="button"
              className="absolute rounded-md p-2 hover:opacity-90 transition-all active:opacity-100 translate-x-[50%] opacity-50 text-white bg-gray-700"
            
            >
              Sample
            </button>
          </figure>
        </div>
      </div>
      <div className="mt-6 flex items-center flex-wrap gap-2 w-[80%] pb-3">
        {selectedImages.map((image, index) => (
          <figure
            key={index}
            className="relative flex items-center h-44 w-44 rounded-md"
          >
            <img
              src={URL.createObjectURL(image)}
              width={15}
              height={15}
              alt={`Image ${index}`}
              className="h-full w-full object-cover rounded-md"
            />
            <button
              type="button"
              className="absolute rounded-md p-2 hover:opacity-90 transition-all active:opacity-100 translate-x-[50%] opacity-50 text-white bg-gray-700"
              onClick={() => handleRemoveImage(index)}
            >
              Remove
            </button>
          </figure>
        ))}
      </div>
      <input type="file" multiple onChange={handleImageChange} />
    </div>
  );
};

export default PageFive;
