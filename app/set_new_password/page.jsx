"use client";
import { useState, useEffect } from "react";
import FormComponent from "./FormComponent";
import OTPEntry from "../verification_code/OTPEntry";
import { useRouter, useSearchParams } from "next/navigation";
import { ErrorStyle, SuccessStyle } from "../../lib/helperFunction";
import { toast } from 'react-hot-toast';
import axiosAuth from "../../lib/authAxios";
import Link from 'next/link';

const initState = {
  password: "",
  verifyPassword: "",
};

const initOTPState = {
  code1: '', code2: '', code3: '', code4: '' 
}

export default function SetNewPassword() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const [changePassword, setChangePassword] = useState(initState);
  const [strongPassword, setStrongPassword] = useState(false);
  const [proceed, setProceed] = useState(false);
  const [entries, setEntries] = useState(initOTPState)
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { password, verifyPassword } = changePassword;

  const passwordRegex = `^(?=.*\\d).{8,}$`;

  useEffect(() => {
    const regex = new RegExp(passwordRegex);
    const valid = regex.test(password);
    setStrongPassword(valid);
  }, [password]);

  useEffect(() => {
    setProceed([...Object.values(entries)].every(Boolean))
  }, [entries])

  useEffect(() => {
    let timerId;
    if(error?.length){
      timerId = setTimeout(() => {
                    setError('')
                }, 10000)
    }
    return () => clearTimeout(timerId)
  }, [error])
  
  const canSubmit = (password === verifyPassword) && [...Object.values(changePassword), strongPassword, proceed].every(Boolean);

  const handleSubmit = async(event) => {
    event.preventDefault();
    if(!canSubmit) return
    setIsLoading(true);
    const passResetDetails = {
      email,
      newPassword: password,
      confirmPassword: verifyPassword,
      otp: [...Object.values(entries)].join('')
    }
    try {
      const res = await axiosAuth.post(`/reset-password`, JSON.stringify(passResetDetails));
      toast.success(`${res?.data?.message}`, SuccessStyle)
      setChangePassword(initState);
      router.push("/reset_success");
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
      className={`${error?.length ? 'bg-red-200 bg-opacity-30' : ''}  mt-8 flex-grow gap-8 text-sm p-6 pb-5 flex flex-col justify-between w-full md:w-1/2 sm:m-auto`}>
      {
        proceed ? 
          <FormComponent 
            changePassword={changePassword} setChangePassword={setChangePassword}
            isLoading={isLoading} error={error} handleSubmit={handleSubmit} canSubmit={canSubmit} strongPassword={strongPassword}
          />
        :
          <OTPEntry newPassword
            entries={entries} setEntries={setEntries} proceed={proceed}
          />
      }
      <Link href={`/forgotPassword?email=${email}`}
        className={`self-center ${error?.length ? 'animate-pulse' : 'animate-none'} text-blue-600 font-bold underline transition-all cursor-pointer hover:opacity-70 tracking-wide`}
      >    
        Request new otp
      </Link>
    </section>
  );
}

