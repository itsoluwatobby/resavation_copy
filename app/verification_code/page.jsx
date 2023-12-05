'use client'
import { useState, useEffect } from 'react';
import OTPEntry from './OTPEntry';
import { useRouter, useSearchParams } from 'next/navigation';
import { ErrorStyle, SuccessStyle } from "../../lib/helperFunction";
import { toast } from 'react-hot-toast';
import axiosAuth from "../../lib/authAxios";

const initState = {
  code1: '', code2: '', code3: '', code4: '' 
}

export default function VerificationCode(){
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingResend, setIsLoadingResend] = useState(false);
  const [entries, setEntries] = useState(initState)

  useEffect(() => {
    let timerId;
    if(error?.length){
      timerId = setTimeout(() => {
                    setError('')
                }, 8000)
    }
    return () => clearTimeout(timerId)
  }, [error])

  const canSubmit = [...Object.values(entries)].every(Boolean)

  const handleSubmit = async(event) => {
    event.preventDefault()
    if(!canSubmit) return
    const code = [...Object.values(entries)].join('')
    const verify = { email, otp: code }
    setIsLoading(true);
    try {
      const res = await axiosAuth.post(`/confirm-reg-by-otp`, JSON.stringify(verify));
      setEntries(initState)
      toast.success(`${res?.data?.message}`, SuccessStyle)
      router.push(`/email_success?email=${email}`)
    } catch (error) {
      let errorMessage = error?.response?.data?.message ? error?.response?.data?.message : error?.message;
      setError(errorMessage);
      toast.error(`${errorMessage}`, ErrorStyle)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section 
      onClick={() => setError('')}
      className={`mt-8 flex-grow gap-10 text-sm p-6 flex flex-col justify-between w-full md:w-1/2 sm:m-auto ${isLoadingResend ? 'animate-pulse' : 'animate-none'}`}>
    
        <OTPEntry
          entries={entries} isLoading={isLoading} isLoadingResend={isLoadingResend}
          setIsLoadingResend={setIsLoadingResend} email={email}
          setEntries={setEntries} error={error} setError={setError}
          handleSubmit={handleSubmit} canSubmit={canSubmit}
        />

    </section>
  )
}

