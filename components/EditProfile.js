import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import { toast } from "react-hot-toast";


const Form = ({ formData, setFormData, editData, setEditData, setActiveComponent }) => {

  //I did some very useless thing in this code to just make it work, 
  // 1. The design and the code does not correspnd to one another.


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleReligionChange = (e) => {
    const { value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      occupation: value,  //Using occupation in place of religion
    }));
  };


  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value) => {
    setEditData((prevData) => ({
      ...prevData,
      postalCode: value,
    }));
  };

  const userToken =
    typeof window !== "undefined"
      ? window.localStorage.getItem("loggedIn_User")
      : false;

  const token = JSON.parse(userToken);

  const updateUserProfile = async (editData) => { 
    const baseURL = "https://resavation-service.onrender.com/api/v1";
    const tokens = token.token; // Replace this with your actual access token

    try {
      const response = await axios.post(
        `${baseURL}/user/profile/update`,
        editData,
        {
          headers: {
            Authorization: `Bearer ${tokens}`,
            "Content-Type": "application/json",
          },
        }
      );


      toast.success("Profile updated successfully!");
      // Handle the successful response here
      const responseData = response.data;
      console.log(responseData);
      setActiveComponent("general")
      // Do something with the response data if needed
      return responseData;
    } catch (error) {
      // Handle errors here
      toast.error("Error updating user profile.");
      console.error("Error updating user profile:", error.message);
      throw error; // Optionally re-throw the error to handle it in the parent component
    }
  };

  console.log(editData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !editData.address ||
      !editData.city ||
      !editData.country ||
      !editData.dateOfBirth ||
      !formData.email ||
      !formData.firstName ||
      !formData.lastName ||
      !editData.occupation ||
      !editData.postalCode ||
      !editData.state) {
      toast.error("Please fill in all input fields.");
      return;
    }
    try {
      const response = await updateUserProfile(editData);
      // Handle the response if needed
      console.log(response);
      // Perform any other logic, such as showing a success message or navigating to another page
    } catch (error) {
      // Handle errors here
      console.error("Error updating user profile:", error.message);
      // Show an error message or perform other error handling as needed
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <section>
        {" "}
        <div>
          <h1 className="font-bold py-2 text-lg font-sans">
            Personal Information
          </h1>
        </div>
        <div className="py-2">
          <label>
            <p className="text-sm font-semibold py-1"> First Name</p>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-[90%] md:w-[70%] py-2 pl-2 text-gray-700 rounded-md border border-gray-300 hover:border  enabled:hover:border-gray-400 focus:outline-none focus:border-[#074CE5] focus:ring-1 focus:ring-[#074CE5]"
            />
          </label>
        </div>
        <div className="pb-2">
          {" "}
          <label>
            <p className="text-sm font-semibold py-1">Last Name:</p>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-[90%] md:w-[70%] py-2 pl-2 md:-4 text-gray-700 rounded-md border border-gray-300 hover:border  enabled:hover:border-gray-400 focus:outline-none focus:border-[#074CE5] focus:ring-1 focus:ring-[#074CE5]"
            />
          </label>
        </div>
        <div className="pb-2">
          <label>
            <p className="text-sm font-semibold "> Email:</p>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-[90%] md:w-[70%] py-2 pl-2 md:-4 text-gray-700 rounded-md border border-gray-300 hover:border  enabled:hover:border-gray-400 focus:outline-none focus:border-[#074CE5] focus:ring-1 focus:ring-[#074CE5]"
            />
          </label>
        </div>
        <div className="pb-2">
          <label>
            <p className="text-sm font-semibold ">Date of Birth</p>
            <input
              type="date"
              name="dateOfBirth"
              value={editData.dateOfBirth}
              onChange={handleEditChange}
              className={`w-[90%] md:w-[70%] py-2 pl-2 md:-4 text-gray-700 rounded-md border  border-gray-300 p-4 `}
            />
          </label>
        </div>
        <div className="pb-2">
          <label>
            <p className="text-sm font-semibold ">Relationship:</p>
            <input
              type="text"
              name="relationship"
              value={editData.occupation}
              onChange={handleReligionChange}
              className="w-[90%] md:w-[70%] py-2 pl-2 md:-4 text-gray-700 rounded-md border border-gray-300 hover:border  enabled:hover:border-gray-400 focus:outline-none focus:border-[#074CE5] focus:ring-1 focus:ring-[#074CE5]"
            />
          </label>
        </div>
        <div className="pb-2">
          <label>
            <p className="text-sm font-semibold "> Phone Number:</p>

            <PhoneInput
              name="phoneNumber"
              value={editData.postalCode}
              onChange={handlePhoneChange}
              country="ng" // Set the default country to Nigeria
              inputProps={{
                className:
                  "w-[90%] md:w-[70%] py-2 pl-12 md:-4 text-gray-700 rounded-md border border-gray-300 hover:border  enabled:hover:border-gray-400 focus:outline-none focus:border-[#074CE5] focus:ring-1 focus:ring-[#074CE5]",
              }}
            />
          </label>
        </div>
        <div className="py-2">
          <label>
            <p className="text-sm font-semibold">About Me:</p>
            <textarea
              name="aboutMe"
              value={editData.aboutMe}
              onChange={handleEditChange}
              className="w-[90%] md:w-[70%] py-2 pl-2 md:-4 text-gray-700 rounded-md border border-gray-300 hover:border enabled:hover:border-gray-400 focus:outline-none focus:border-[#074CE5] focus:ring-1 focus:ring-[#074CE5]"
            ></textarea>
          </label>
        </div>

      </section>

      {/* Persona Address */}
      <section className="pt-8">
        <div>
          <h1 className="font-bold py-2 text-lg">Personal Address</h1>
          {/* <button className="border rounded-full px-2 text-sm md:text-base ">Edit Details</button> */}
        </div>
        <div></div>
        <div className="py-2">
          <label>
            <p className="text-sm font-semibold "> City: </p>
            <input
              type="text"
              name="city"
              value={editData.city}
              onChange={handleEditChange}
              className="w-[90%] md:w-[70%] py-2 pl-2 md:-4 text-gray-700 rounded-md border border-gray-300 hover:border  enabled:hover:border-gray-400 focus:outline-none focus:border-[#074CE5] focus:ring-1 focus:ring-[#074CE5]"
            />
          </label>
        </div>
        <div className="pb-2">
          <label>
            <p className="text-sm font-semibold "> State:</p>
            <input
              type="text"
              name="state"
              value={editData.state}
              onChange={handleEditChange}
              className="w-[90%] md:w-[70%] py-2 pl-2 md:-4 rounded-md border text-gray-700 border-gray-300 hover:border enabled:hover:border-gray-400 focus:outline-none focus:border-[#074CE5] focus:ring-1 focus:ring-[#074CE5]"
            />
          </label>
        </div>
        <div className="pb-2">
          <label>
            <p className="text-sm font-semibold "> Country:</p>
            <input
              type="text"
              name="country"
              value={editData.country}
              onChange={handleEditChange}
              className="w-[90%] md:w-[70%] py-2 pl-2 md:-4 text-gray-700 rounded-md border border-gray-300 hover:border  enabled:hover:border-gray-400 focus:outline-none focus:border-[#074CE5] focus:ring-1 focus:ring-[#074CE5]"
            />
          </label>
        </div>
        <div className="pb-2">
          <label>
            <p className="text-sm font-semibold ">Address:</p>
            <textarea
              name="address"
              value={editData.address}
              onChange={handleEditChange}
              className="w-[90%] md:w-[70%] py-2 pl-2 md:-4 text-gray-700 rounded-md border border-gray-300 hover:border  enabled:hover:border-gray-400 focus:outline-none focus:border-[#074CE5] focus:ring-1 focus:ring-[#074CE5]"
            ></textarea>
          </label>
        </div>
      </section>
      <div className="w-[90%] md:w-[70%] flex items-end justify-end">
        <button
          type="submit"
          className="bg-[#074CE5] text-white md:text-base py-2 px-4 my-4 rounded-full "
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
