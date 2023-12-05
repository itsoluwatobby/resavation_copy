'use client'
import { useRef, useEffect } from 'react';
import NumberInput from './NumberInput';
import { useRouter } from 'next/navigation';
import { ErrorStyle, SuccessStyle } from "../../lib/helperFunction";
import { toast } from 'react-hot-toast';
import axiosAuth from "../../lib/authAxios";

export default function OTPEntry({ newPassword, proceed, entries, setEntries, isLoadingResend, setIsLoadingResend, handleSubmit, isLoading
, setError, error, canSubmit, email }){
  const router = useRouter()
  const [inputRef1, inputRef2, inputRef3, inputRef4] = [useRef(), useRef(), useRef(), useRef()];

  const { code1, code2, code3, code4 } = entries

  useEffect(() => {
    if(code1?.length == 0) inputRef1?.current?.focus() 
    else if(code2?.length == 0) inputRef2?.current?.focus()
    else if(code3?.length == 0) inputRef3?.current?.focus()
    else if(code4?.length == 0) inputRef4?.current?.focus()
  }, [code1, code2, code3, code4])

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setEntries(prev => ({...prev, [name]: value}))
  }

  const resendLink = async() => {
    setIsLoadingResend(true);
    try {
      const res = await axiosAuth.post(`/request-otp`, JSON.stringify({ email }));
      toast.success(`${res?.data?.message}`, SuccessStyle)
      router.push(`/verification_code?email=${email}`)
    }
    catch(error){
      let errorMessage = error?.response?.data?.message
      setError(errorMessage);
      toast.error(`${errorMessage}`, ErrorStyle)
    } finally {
      setIsLoadingResend(false);
    }
  }

  return (
    <>
       <div className='flex flex-col gap-2'>
        <div className='flex flex-col'>
          <h1 className='font-bold text-lg'>Enter 4-digit</h1>
          <h1 className='font-bold text-lg -mt-1'>recovery code</h1>
        </div>
        <p className='flex flex-col text-sm'>
          <span className='text-gray-400'>The recovery code was sent to your email.</span>
          <span className='text-gray-400'>Please enter the code</span>
        </p>
      </div>

      <form onSubmit={handleSubmit}
        className={`flex flex-col ${newPassword ? 'gap-10' : 'gap-6'} items-center w-full`}
      >
        <div className='flex items-center gap-4'>
          <NumberInput 
            name='code1'
            value={entries?.code1}
            refValue={inputRef1}
            handleChange={handleChange}
            placeholder={'0'}
          />
          <NumberInput 
            name='code2'
            value={entries?.code2}
            refValue={inputRef2}
            handleChange={handleChange}
            placeholder={'0'}
          />
          <NumberInput 
            name='code3'
            value={entries?.code3}
            refValue={inputRef3}
            handleChange={handleChange}
            placeholder={'0'}
          />
          <NumberInput 
            name='code4'
            value={entries?.code4}
            refValue={inputRef4}
            handleChange={handleChange}
            placeholder={'0'}
          />
        </div>

        <p 
          className={`${newPassword ? 'hidden' : 'flex text-sm items-center justify-center gap-1 mt-1.5 mb-1.5'}`}>
          <span className='text-gray-500'>
            Didn't receive link? 
          </span>
          <span 
            onClick={isLoadingResend ? null : resendLink}
            className={`${
              isLoadingResend ? 'text-gray-600' : 'text-blue-700 hover:text-blue-600 active:text-blue-700'} font-bold transition-all cursor-pointer`}
          >Resend</span>
        </p>
        
        {
          newPassword ? 
          <button
            type='submit'
            disabled={error?.length ? Boolean(error) : isLoading ? isLoading : !canSubmit}
            className={`${proceed ? "bg-blue-700 hover:bg-blue-600 active:bg-blue-700" : "bg-gray-500"} mt-3 p-4 transition-all capitalize text-white rounded-md w-full`}
          >
           Next
          </button>
          :
          <button
            type='submit'
            disabled={error?.length ? Boolean(error) : isLoading ? isLoading : !canSubmit}
            className={`${(canSubmit && !isLoading && !error?.length) ? "bg-blue-700 hover:bg-blue-600 active:bg-blue-700" : "bg-gray-500"} ${isLoading ? 'animate-pulse' : 'animate-none'} ${error?.length ? 'bg-red-500' : ''} p-4 transition-all capitalize text-white rounded-md w-full`}
          >
            {
              error?.length ? (error?.substring(0, 25)+'...') 
                : isLoading ? 'In Progress...' : 'Submit'
            }
          </button>
        }
      </form>
    </>
  )
}

