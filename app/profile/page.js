"use client";
import React, { useState, useEffect } from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import Form from "../../components/EditProfile";
import GenaralProfile from "../../components/GenaralProfile";
import PasswordReset from "../../components/PasswordReset";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { usersDB } from '@/lib/firebase';
import { doc, setDoc, getDoc, query, where } from '@firebase/firestore';
import { imageUpload } from "../../lib/fileUpload";
import { toast } from "react-hot-toast";
import { IsLoadingModal } from "../../components/IsLoading";
import { FaUpload } from "react-icons/fa"
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";




// const what_user_can_get = {
//   aboutMe: "string",
//   address: "string",
//   city: "string",
//   country: "string",
//   dateOfBirth: "string",
//   email: "string",
//   firstName: "string",
//   gender: "string",
//   imageUrl: "string",
//   lastName: "string",
//   occupation: "string",
//   phoneNumber: "string",
//   postalCode: "string",
//   profession: "string",
//   state: "string"
// }

const Profile = () => {
  const axiosPrivate = useAxiosPrivate()
  //Form Data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    relationship: "",
    phoneNumber: "",
    city: "",
    state: "",
    country: "",
    address: "",
    dateOfBirth: "",
    imageUrl: ""
  });

  const [editData, setEditData] = useState({
    aboutMe: formData.aboutMe,
    address: formData.address,
    city: formData.city,
    country: formData.country,
    gender: "",
    imageUrl: "",
    occupation: formData.occupation,
    postalCode: formData.postalCode,
    profession: "",
    state: formData.state,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activeComponent, setActiveComponent] = useState("general");
  const [showProfileDetails, setShowProfileDetails] = useState(false);

  // State for fetching user profile
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const router = useRouter();

  const userToken =
    typeof window !== "undefined"
      ? window.localStorage.getItem("loggedIn_User")
      : false;

  const token = JSON.parse(userToken);


  const fetchUserProfile = async () => {
    try {
      const response = await axiosPrivate.get(`/user/profile`);

      // Handle the successful response here
      const userProfile = response.data;
      console.log(userProfile);
      // Do something with the user profile data
      setFormData({
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        email: userProfile.email,
        relationship: userProfile.occupation,
        phoneNumber: userProfile.postalCode,
        city: userProfile.city,
        state: userProfile.state,
        country: userProfile.country,
        address: userProfile.address,
        dateOfBirth: userProfile.dateOfBirth,
        imageUrl: userProfile.imageUrl
      });
      setEditData({
        aboutMe: userProfile.aboutMe,
        address: userProfile.address,
        city: userProfile.city,
        country: userProfile.country,
        gender: "",
        imageUrl: "",
        occupation: userProfile.occupation,
        postalCode: userProfile.postalCode,
        profession: userProfile.profession,
        state: userProfile.state,
      })

      setLoading(false);
    } catch (error) {
      // Handle errors here
      console.error("Error fetching user profile:", error.message);
      setLoading(false);
    }
  };

  // Use useEffect to fetch user profile data when the component mounts
  useEffect(() => {
    fetchUserProfile();
  }, []);

  //Geneneral, EditProfile, PaddwordEdit Toggle
  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  //picture state
  const [isEditingPic, setIsEditingPic] = useState(false);

  // Picture upload
  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    // Upload the image to Firebase and get the download URL
    imageUpload(file, "profileImages")
      .then((result) => {
        const imageUrl = result.url;
        setFormData((prevData) => ({ ...prevData, imageUrl }));
        setEditData((prevData) => ({ ...prevData, imageUrl }));
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  const handleEditPic = () => {
    setIsEditingPic(!isEditingPic);
  };

  const handlePictureUpload = async () => {
    // Include the updated image URL in the data

    if (!editData.imageUrl) {
      toast.error("Please choose an image to upload.");
      return;
    }
    setEditData((prevEditData) => ({
      ...prevEditData,
      imageUrl: formData.imageUrl,
    }));

    console.log(formData);
    console.log(editData);

    try {
      // Send the updated data to the backend API
      const response = await axiosPrivate.post("/user/profile/update", editData);
      toast.success("Profile updated successfully!");
      const responseData = response.data;
      console.log(responseData);
      return responseData;
    } catch (error) {
      // Handle errors here
      toast.error("Profile update failed!");
      console.error("Error updating user profile:", error.message);
      throw error;
    }

  }
  return (
    <div className="py-8 md:px-8 lg:px-12 px-2 overflow-x-hidden font-montserrat ">

      {loading ? ( // Show loading spinner while loading
        <div className="flex justify-center items-center w-full h-[300px] ">
          <IsLoadingModal />
        </div>

      ) : (
        <div>
          <div className=" flex items-center">
            <img
              src={formData.imageUrl}
              alt="profile_pics"
              className="object-cover h-[35px] w-[35px] md:h-[60px] md:w-[60px] rounded-full mr-2"
              style={{ borderRadius: '50%' }} // Apply the circular clipping effect
            />
            <div className="flex-col justify-start">
              <div className="flex text-base sm:text-lg md:text-xl items-center font-semibold md:font-bold ">
                {formData.firstName} {formData.lastName}
                <BsFillPatchCheckFill color="green" className="pl-1" />
              </div>
              <p className=" font-normal">
                {formData.city}, {formData.country}
              </p>{" "}
            </div>
            <button
              onClick={handleEditPic}
              className="bg-[#074CE5] text-white text-xs sm:text-sm md:text-base py-2 px-4 rounded-full  sm:ml-4 ml-1 hidden sm:block"
            >
              <p></p>
              {isEditingPic ? <p onClick={handlePictureUpload}>Upload</p>
                : "Upload pics"}
            </button>
          </div>
          <button
            onClick={handleEditPic}
            className="bg-[#074CE5] text-white text-xs sm:text-sm md:text-lg py-2 px-4 rounded-full  sm:ml-4 ml-1 block sm:hidden"
          >
            {isEditingPic ? <p onClick={handlePictureUpload}>Upload</p> : "Upload your pic"}
          </button>
          {isEditingPic && (
            <label className="flex items-center gap-1 cursor-pointer pt-3">
              <FaUpload className="text-blue-700 " />
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handlePictureChange}
                className="hidden"
              />
            </label>
          )}

          <div className="py-6 md:flex items-start ">
            <div className="md:flex-col flex justify-around md:justify-start md:w-40 md:border rounded-lg  md:p-2 items-start">
              <div className="md:border-b-2 w-full">
                <button
                  className="border md:border-none rounded-lg md:pt-2 md:px-2 p-2 sm:mb-1 text-sm md:text-base ml-2 md:ml-0"
                  onClick={() => handleComponentChange("general")}
                >
                  General
                </button>
              </div>
              <div className="md:border-b-2 w-full">
                <button
                  className="border md:border-none rounded-lg p-2 sm:mb-1 text-sm md:text-base"
                  onClick={() => handleComponentChange("editProfile")}
                  style={{
                    fontWeight:
                      setActiveComponent === "editProfile" ? "bold" : "normal",
                  }}
                >
                  Edit Profile
                </button>
              </div>
              <div className=" w-full">
                <button
                  className="border md:border-none rounded-lg p-2 md:pb-2 md:px-2 sm:mb-1 text-sm md:text-base"
                // onClick={() => handleComponentChange("editPassword")}
                >
                  <Link href="./forgotPassword" >
                    Password
                  </Link>
                </button>
              </div>
            </div>

            <div className="ml-4 md:ml-8 w-full">
              {activeComponent === "editProfile" && (
                <Form
                  formData={formData}
                  setFormData={setFormData}
                  editData={editData}
                  setEditData={setEditData}
                  setActiveComponent={setActiveComponent}
                />
              )}
              {activeComponent === "general" && (
                <GenaralProfile
                  formData={formData}
                  setFormData={setFormData}
                  handleComponentChange={handleComponentChange}
                  showProfileDetails={showProfileDetails}
                  setShowProfileDetails={setShowProfileDetails}
                />
              )}
              {/* {activeComponent === "editPassword" && (
<PasswordReset/>              )} */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
