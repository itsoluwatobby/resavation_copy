"use client"

import Input from "../../components/Input";
import { useState, useEffect, useRef } from "react";
import HiddenInput from "../../components/HiddenInput";
import PasswordChecker from "./PasswordChecker";
import { dateFormatter } from "../../lib/helperFunction";

export default function SignupForm({ userDetails, strongPassword, setStrongPassword, isDateValid, setIsDateValid, handleChange, error, isLoading, handleSubmit, canSubmit }) {
  const [getDate, setGetDate] = useState("");
  const [reveal, setReveal] = useState(false);
  const inputRef = useRef()
  const time = new Date().getMinutes();

  const { firstname, lastname, email, password, dateOfBirth, verifyPassword } = userDetails;
  const passwordRegex = `^(?=.*\\d).{8,}$`;

  useEffect(() => {
    if(inputRef?.current){
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    const regex = new RegExp(passwordRegex);
    const valid = regex.test(password);
    setStrongPassword(valid);
  }, [password]);

  useEffect(() => {
    const date = new Date(
      new Date().getTime() -
        (60 * 60 * 1000 * 24 * 365 * 16 - 60 * 60 * 24 * 1000 * 174) // 16years - 174days
    );
    let minimumDate = new Intl.DateTimeFormat("en-US", {
      dayTime: "medium",
    }).format(date);
    minimumDate = dateFormatter(minimumDate)
    setGetDate(minimumDate);
  }, [lastname, time]);

  useEffect(() => {
    // extra age validation in case maxDate limit fails | user enters age manually. Checks if user is older then 16
    const currentYear = new Date().getTime()
    const ageLimit = new Date(new Date().getTime() - (60 * 60 * 1000 * 24 * 365 * 16 - 60 * 60 * 24 * 1000 * 174)).getTime();
    const userAge = new Date(dateOfBirth).getTime()
    const estimatedAge = currentYear - userAge
    const isAcceptedAge = new Date(estimatedAge + ageLimit).getTime()
    isAcceptedAge < currentYear ? setIsDateValid(false) : setIsDateValid(true)
  }, [dateOfBirth])


  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-8">
        <div className="flex flex-col gap-6">
          <div>
            <div className="border border-gray-300 rounded-md">
              <Input first
                type="text"
                name="firstname"
                value={userDetails.firstname}
                required
                handleChange={handleChange}
                placeholder="First Name"
              />
              <Input
                type="text"
                name="lastname"
                value={userDetails.lastname}
                required
                handleChange={handleChange}
                placeholder="Last Name"
              />
            </div>
            <p className="text-gray-500 mt-2">
              Be sure it matches with the name on your government ID
            </p>
          </div>

          <div className="relative">
            <input
              type="date"
              name="dateOfBirth"
              max={getDate}
              value={userDetails.dateOfBirth}
              required
              onChange={handleChange}
              className={`border ${(dateOfBirth.length && !isDateValid) ? 'border-red-600 animate-pulse text-red-500' : 'border-gray-300'} rounded-md focus:outline-none p-4 placeholder:text-gray-400 text-sm placeholder:text-xs w-full `}
            />
            {reveal ||
              (userDetails?.dateOfBirth?.length == 0 && (
                <p
                  onClick={() => setReveal(true)}
                  className={`absolute transition-all bg-white w-[70%] text-gray-500 p-2 pt-3 rounded-md h-10 top-2 left-2`}
                >
                  Date of birth
                </p>
              ))}
            <p className={`${(dateOfBirth.length && !isDateValid) ? 'text-red-600' : 'text-gray-500'} mt-2`}>
              You need to be at least 16 to sign up on Resavation
            </p>
          </div>

          <div>
            <Input
              type="email"
              name="email"
              value={userDetails.email}
              required
              handleChange={handleChange}
              placeholder="Email"
            />
            <p className="text-gray-500 mt-2">
              You need to be at least 16 to sign up on Resavation
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <HiddenInput
              placeholder="Password"
              name="password"
              value={userDetails.password}
              handleChange={handleChange}
            />
            <HiddenInput
              placeholder="Confirm Password"
              name="verifyPassword"
              value={userDetails.verifyPassword}
              handleChange={handleChange}
            />
            <PasswordChecker
              password={password}
              verifyPassword={verifyPassword}
              firstname={firstname}
              lastname={lastname}
              email={email}
              strongPassword={strongPassword}
            />
          </div>

          <div className="flex items-center align-top gap-2">
            <Input
              type="checkbox"
              name="termAndCondition"
              checked={userDetails.termAndCondition}
              required
              handleChange={handleChange}
            />
            <p className="">
              <span>
                By selecting <strong>Agree and continue.&nbsp;</strong>I agree to
                Resavation's{" "}
                <span className=" text-blue-500">Terms of service.&nbsp;</span>
                <span className="text-blue-500">Payment Terms of service&nbsp;</span>
                and{" "}
                <span className="text-blue-500">
                  Nondiscrimination Policy{" "}
                </span>{" "}
                and acknowledge the&nbsp;
                <span className="text-blue-500">Privacy Policy</span>
              </span>
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={error?.length ? Boolean(error) : isLoading ? isLoading : !canSubmit}
          className={`${(canSubmit && !isLoading && !error?.length) ? "bg-blue-700 hover:bg-blue-600 active:bg-blue-700" : "bg-gray-500"} ${isLoading ? 'animate-pulse' : 'animate-none'} ${error?.length ? 'bg-red-500' : ''} p-4 transition-all capitalize text-white rounded-md`}
        >
          {
            error?.length ? (error?.substring(0, 25)+'...') :
            isLoading ? 'In Progress...' : 'Agree and continue'
          }
        </button>
      </form>
    </>
  )
}
