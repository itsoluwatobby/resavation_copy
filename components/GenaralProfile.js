"use client";
import { useState } from "react";
import ProfileDetails from "./ProfileDetail";
import Link from "next/link";

const GenaralProfile = ({
  formData,
  handleComponentChange,
  showProfileDetails,
  setShowProfileDetails,
}) => {
  const handleShowProfileDetails = () => {
    setShowProfileDetails(true);
  };

  const backShowProfileDetails = () => {
    setShowProfileDetails(false);
  };

  return (
    <div>
      {showProfileDetails ? (
        <ProfileDetails
          formData={formData}
          handleComponentChange={handleComponentChange}
          backShowProfileDetails={backShowProfileDetails}
        />
      ) : (
        <div>
          <h1 className="font-bold py-2 text-lg">Personal Details</h1>
          <div className="w-[90%] md:w-[70%] py-4 px-2 md:px-4 rounded-lg border border-gray-300 hover:border  ">
            <div
              className="pb-3 border-b border-gray-300 cursor-pointer"
              onClick={handleShowProfileDetails}
            >
              <h1 className="font-semibold md:text-lg">Account</h1>
              <p className="text-sm md:text-base">Manage Personal details</p>
            </div>
            <div className="pt-3 cursor-pointer">
              <Link href="./preference">
                <h1 className="font-semibold md:text-lg">Profile Preference</h1>
              </Link>
              <p className="lg:w-[70%] text-sm md:text-base">
                Customize your profile preference to see more of the result you
                want.
              </p>
            </div>
          </div>
          <h1 className="font-bold pt-4 pb-2 text-lg">Identity Verification</h1>
          <p className="text-sm md:text-base">
            Let others know you’re authenthic with your verification badge
          </p>
          <button className="py-2 px-4 border border-gray-700 rounded-lg my-3">
            Get the badge
          </button>

          <h1 className="font-bold pt-4 pb-2 text-lg">Listings</h1>
          <p className="text-sm md:text-base">Manage my listings </p>
        </div>
      )}
    </div>
  );
};

export default GenaralProfile;
