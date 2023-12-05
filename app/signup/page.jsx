"use client";
import { useState, useEffect } from "react";
import SignupForm from './SignupForm';
import Link from 'next/link';
import PreSignupForm from './PreSignupForm';
import axiosAuth from "../../lib/authAxios";
import { ErrorStyle, SuccessStyle } from "../../lib/helperFunction";
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useResavationAppProvider } from "../../context/useResavationAppProvider";

const initState = {
  firstname: "",
  lastname: "",
  dateOfBirth: "",
  email: "",
  password: "",
  verifyPassword: "",
  termAndCondition: false
};

export default function Signup() {
  const [userDetails, setUserDetails] = useState(initState);
  const { setCredentials } = useResavationAppProvider()
  const [preSignupForm, setPreSignupForm] = useState(true);
  const [userOption, setUserOption] = useState('') // PROPERTY OWNER | TENANT
  const [isLoading, setIsLoading] = useState(false);
  const [strongPassword, setStrongPassword] = useState(false);
  const router = useRouter()
  const [isDateValid, setIsDateValid] = useState(false);
  const [error, setError] = useState(false);
  const { dateOfBirth, password, verifyPassword } = userDetails

  const handleChange = (event) => { 
    const name = event.target.name
    if(name !== 'termAndCondition'){
      const value = event.target.value
      setUserDetails((prev) => ({ ...prev, [name]: value }))
    }
    else{
      const value = event.target.checked
      setUserDetails((prev) => ({ ...prev, [name]: value }))
    }
  }

  useEffect(() => {
    let timerId;
    if(error?.length){
      timerId = setTimeout(() => {
                    setError('')
                }, 8000)
    }
    return () => clearTimeout(timerId)
  }, [error])

  const canSubmit = (password === verifyPassword) && [...Object.values(userDetails), isDateValid, strongPassword].every(Boolean);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!canSubmit) return
    setIsLoading(true);
    const platform = "mobile";
    const date = dateOfBirth.split('-')
    const formattedDOB = `${date[2]}-${date[1]}-${date[0]}`
    const newUser = {...userDetails, dateOfBirth: formattedDOB, accountType: userOption, platform}
    try {
      const { data } = await axiosAuth.post(`/register`, JSON.stringify(newUser));
      setCredentials(data)
      toast.success(data?.message, SuccessStyle)
      setUserDetails(initState);
      setPreSignupForm(true)
      router.push(`/verification_code?email=${data?.email}`)
    } catch (error) {
      let errorMessage = error?.response?.data?.message ? error?.response?.data?.message : error?.message;
      setError(errorMessage);
      toast.error(`${errorMessage}`, ErrorStyle)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section 
      onClick={() => setError('')}
      className={`${error?.length ? 'bg-red-200 bg-opacity-30' : ''} flex-grow flex flex-col p-5 text-xs gap-6 w-full md:w-1/2 sm:m-auto`}>
      <div className="mt-6 flex flex-col gap-1">
        {preSignupForm ? 
          <Image 
            src={'/assets/Frame3.png'}
            width={20}
            height={10}
            alt="Resavation Logo"
            priority={true}
            className="object-cover"
          /> : null
        }
        <h2 className="font-bold text-2xl font-sans">Join our network</h2>
        <p className="text-sm flex flex-col text-gray-500">
          <span>We'd love to have you!</span>
          <span>Have seamless rental experience</span>
        </p>
      </div>

      {
        preSignupForm ? 
        <PreSignupForm 
          setPreSignupForm={setPreSignupForm}
          userOption={userOption}
          setUserOption={setUserOption}
        />
        :
        <SignupForm 
          userDetails={userDetails}
          setUserDetails={setUserDetails}
          handleChange={handleChange}
          error={error}
          isLoading={isLoading}
          isDateValid={isDateValid} 
          strongPassword={strongPassword} 
          setStrongPassword={setStrongPassword}
          setIsDateValid={setIsDateValid}
          handleSubmit={handleSubmit}
          canSubmit={canSubmit}
        />
      }
      <p className="flex text-sm items-center justify-center gap-1 mt-1.5">
        <span className="text-gray-500">Already have an account?</span>
        <Link href={"/login"}>
          <span className="text-blue-700 hover:text-blue-500 font-bold transition-all active:text-blue-700 cursor-pointer">
            Login
          </span>
        </Link>
      </p>
    </section>
  );
}
