import React, { useState } from "react";
import Link from "next/link";
import { toast } from 'react-hot-toast';
import PasswordChecker from "@/app/profile/PasswordChecker";
import axios from "axios";

const initState = {
  email: "",
  password: "",
  confirmPassword: "",
  otp: ""
};

export default function ResetPassword({ formData }) {
  const [userDetails, setUserDetails] = useState(initState);
  const [strongPassword, setStrongPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(false);
  const { email, password } = userDetails;
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);

  const passwordRegex = `^(?=.*[!@#$%^&*])(?=.*\\d).{8,}$`;

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setUserDetails((prev) => ({ ...prev, password: value }));
  };

  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;
    setConfirmPassword(value);
  };

  const userToken =
    typeof window !== "undefined"
      ? window.localStorage.getItem("loggedIn_User")
      : false;

  const token = JSON.parse(userToken);
  const tokens = token.accessToken;


  const handleRequestOTP = async () => {
    try {
      const response = await axios.post(
        "https://resavation-service.onrender.com/api/v1/auth/forgot-password",
        null,
        {
          params: {
            email: formData.email
          }
        }
      );

      toast.success(response?.data?.message); // Display success message
      setShowRequestOTPModal(false); // Close the request OTP modal
      setIsOTPRequested(true); // Mark OTP as requested
      setShowOTPEntryModal(true); // Open the OTP entry modal
    } catch (error) {
      toast.error("Failed to request OTP"); // Display error message
    }
  };

  const handleOTPSubmit = async () => {
    try {
      // Call the API to verify OTP
      // On success, you can proceed with password reset
      // Display success message
      toast.success("OTP verified and password reset successful");
    } catch (error) {
      toast.error("Failed to verify OTP"); // Display error message
    } finally {
      setShowOTPEntryModal(false); // Close the OTP entry modal
    }
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      setTimeout(() => setError(false), 3000); // Clear the error message after 3 seconds
      return;
    }
    if (formData.email !== email) {
      setError("Email do not match");
      setIsLoading(false);
      setTimeout(() => setError(false), 3000); // Clear the error message after 3 seconds
      return;
    }


    try {
      const baseURL = "https://resavation-service.onrender.com/api/v1/auth";
      const response = await axios.post(
        `${baseURL}/reset-password`,
        {
          email: formData.email,
          newPassword: password,
          confirmPassword: confirmPassword,
          otp: "", // You need to provide OTP here
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokens}`,
          },
        }
      );

      setSuccessMessage(response.data.message);
      setSuccess(true);
      setUserDetails(initState);
      setConfirmPassword("");
      setTimeout(() => {
        setSuccess(false);
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error resetting password:", error.message);
      setError("Password reset failed");
    } finally {
      setIsLoading(false);
    }

  };

  const canSubmit = [email, password, confirmPassword].every(Boolean);

  return (
    <section className="">
      <div
        className={`absolute rounded-md p-2 w-[70%] md:w-[50%] lg:w-[30%] ${success
          ? "scale-100 border-green-500 bg-green-100"
          : error
            ? "scale-100 border-red-500 bg-red-100"
            : "scale-0"
          } text-xs whitespace-pre-wrap shadow-lg shadow-gray-300 w-4/5 border-2`}
      >
        {success ? successMessage : error}
      </div>
      <div>
        <h1 className="font-bold py-2 text-lg ">Personal Information</h1>
        <p className="text-xs flex flex-col text-gray-500">
          <span>Enter your email and new password</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-8">
        <div className="flex flex-col gap-6">
          <div className="py-2">
            <input
              type="email"
              name="email"
              value={userDetails.email}
              required
              onChange={(event) =>
                setUserDetails({
                  ...userDetails,
                  email: event.target.value,
                })
              }
              placeholder="Email"
              className="w-[90%] md:w-[70%] lg:w-[50%]  py-2 md:py-4 pd:pl-4 pl-2  text-gray-700 rounded-md border border-gray-300 hover:border  enabled:hover:border-gray-400 focus:outline-none focus:border-[#074CE5] focus:ring-1 focus:ring-[#074CE5]"
            />
          </div>

          <div>
            <input
              type="password"
              id="password"
              name="password"
              value={userDetails.password}
              required
              onChange={handlePasswordChange}
              placeholder="New Password"
              className="w-[90%] md:w-[70%] lg:w-[50%] py-2 md:py-4 pd:pl-4 pl-2  text-gray-700 rounded-md border border-gray-300 hover:border  enabled:hover:border-gray-400 focus:outline-none focus:border-[#074CE5] focus:ring-1 focus:ring-[#074CE5]"
            />
          </div>

          <div>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              required
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm New Password"
              className="w-[90%] md:w-[70%] lg:w-[50%] py-2 md:py-4 pd:pl-4 pl-2  text-gray-700 rounded-md border border-gray-300 hover:border  enabled:hover:border-gray-400 focus:outline-none focus:border-[#074CE5] focus:ring-1 focus:ring-[#074CE5]"
            />
          </div>

          <PasswordChecker
            password={password}
            strongPassword={strongPassword}
            verifyPassword={confirmPassword}

          />

          {/* {showOTPModal && ( */}
          <OTPEntry onRequestOTP={handleRequestOTP} />
          {/* // )} */}
        </div>
        <button className={`w-[90%] md:w-[70%] lg:w-[50%] ${canSubmit
          ? "bg-blue-700 hover:bg-blue-600 active:bg-blue-700"
          : "bg-gray-500"
          } p-4 transition-all text-white rounded-md`}
          onClick={handleRequestOTP}>
          Request OTP
        </button>

        {!showOTPModal &&
          <button
            type="submit"
            disabled={!canSubmit}
            className={`w-[90%] md:w-[70%] lg:w-[50%] ${canSubmit
              ? "bg-blue-700 hover:bg-blue-600 active:bg-blue-700"
              : "bg-gray-500"
              } p-4 transition-all text-white rounded-md`}
          >
            Reset Password
          </button>
        }

      </form>
    </section>
  );
}
