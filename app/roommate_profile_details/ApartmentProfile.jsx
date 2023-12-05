import { BsFillSuitHeartFill } from 'react-icons/bs'
import { BiSolidBadgeCheck } from 'react-icons/bi'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { toast } from 'react-hot-toast'
import { PropertyAttributesComponent } from '../../components/PropertyAttributesComponent'
import { ErrorStyle, SuccessStyle } from '../../lib/helperFunction'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'

const initState = { isLoading: false, isSuccess: false, error: '' }
export const ApartmentProfile = ({ roommateProfileData }) => {
  const axiosPrivate = useAxiosPrivate()
  const [requestState, setRequestState] = useState(initState)
  const [userAge, setUserAge] = useState(0)

  const { isLoading, isSuccess, error } = requestState

  useEffect(() => {
    const dateOfBirth = roommateProfileData?.roommateDetails?.user?.dateOfBirth
    const age = new Date().getFullYear() - +dateOfBirth?.split('-')[0]
    setUserAge(age)
  }, [roommateProfileData?.roommateDetails?.user?.dateOfBirth])

  useEffect(() => {
    let timerId;
    if(error.length){
      timerId = setTimeout(() => {
        setRequestState(prev => ({ ...prev, error: '' }))
                }, 8000)
    }
    return () => clearTimeout(timerId)
  }, [error])

  const sendRequest = async() => {
    setRequestState(prev => ({ ...prev, isLoading: true }))
    try{
      const res = await axiosPrivate.post(`/roommates/profile/send-request/${roommateProfileData?.roommateDetails?.id}`)
      setRequestState(prev => ({ ...prev, isSuccess: true }))
      toast.success(res?.data?.message, SuccessStyle)
    }
    catch (error) {
      let errorMessage = error?.response?.data?.message ? error?.response?.data?.message : error?.message;
      setRequestState(prev => ({ ...prev, error: errorMessage, isSuccess: false }))
      toast.error(`${errorMessage}`, ErrorStyle)
    } finally {
      setRequestState(prev => ({ ...prev, isLoading: false }))
    }
  }

  return (
    <>

      <figure className='relative w-full h-64 rounded-sm box-border'>
        <img src={roommateProfileData?.roommateDetails?.apartmentRequest?.propertyImages[0]}
          alt='Home' loading='lazy'
          className='rounded-md object-cover w-full h-full'
        />

        <button className='absolute z-20 grid place-content-center right-4 rounded-full p-2 w-7 h-7 shadow-md bg-white top-5'>
          <BsFillSuitHeartFill className='text-red-600 text-lg hover:scale-[1.08] active:scale-[1.02] transition-all cursor-pointer' />
        </button>

        <figure className='absolute -bottom-8 left-2 w-14 h-14 border-2 border-white bg-slate-400 box-border rounded-full'>
          {
            roommateProfileData?.roommateDetails?.user?.imageUrl ?
              <img 
                src={roommateProfileData?.roommateDetails?.user?.imageUrl}
                alt={`${roommateProfileData?.roommateDetails?.user?.firstName}-DP`} loading='lazy'
                className='rounded-full w-full h-full object-cover'
              />
            : null
          }
        </figure>

      </figure>

      <article className='flex flex-col p-3 gap-3 mt-4'>

        <div className='flex items-center justify-between'>

          <div className='flex flex-col font-medium text-xs gap-1'>
            <p className='flex items-center gap-1.5'>
              <span className='font-bold capitalize'>{roommateProfileData?.roommateDetails?.user?.firstName}, {userAge}</span>
              <BiSolidBadgeCheck className='text-green-700 text-lg' />
            </p>
            <p className='text-gray-500 flex items-center'>
              <span className='capitalize'>{roommateProfileData?.roommateDetails?.city},&nbsp;</span><span className='capitalize'>{roommateProfileData?.roommateDetails?.state}</span>
            </p>
            <Link href={`/profile?email=${roommateProfileData?.roommateDetails?.user?.email}`} className='text-blue-600 cursor-pointer hover:text-blue-400 transition-all active:text-blue-600'>view profile</Link>
          </div>

          <button
            role="send request"
            onClick={sendRequest}
            disabled={error?.length ? Boolean(error) : isLoading && isLoading}
            className={`${(!isLoading && !error?.length) ? "bg-blue-700 hover:bg-blue-600 active:bg-blue-700" : "bg-gray-500"} ${isLoading ? 'animate-pulse' : 'animate-none'} ${error?.length ? 'bg-red-500' : ''} ${isSuccess ? 'bg-green-500' : ''} p-2 text-xs transition-all text-white rounded-md cursor-pointer w-fit`}
        >
          {
            error?.length ? (error?.substring(0, 10)+'...') :
            isLoading ? 'In Progress...' : isSuccess ? 'Sent' : 'Send request'
          }
        </button>

        </div>

        { 
          roommateProfileData?.roommateDetails?.user?.aboutMe?.length ?
            <p className='flex flex-col p-1'>
              <span><b>About</b></span>
              <span className='first-letter:capitalize text-justify whitespace-pre-wrap text-gray-600 tracking-wide text-xs mobile:text-sm'>  {roommateProfileData?.roommateDetails?.user?.aboutMe}
              </span>
            </p>
          : null
        }

        <div className='flex flex-col gap-1'>
          <p><b>Hobbies</b></p>
          <div className='flex items-center flex-wrap gap-2 mobile:text-sm'>
            {
              roommateProfileData?.roommateDetails?.user?.hobbies?.map((hobby, index) => (
                <p 
                  key={index}
                  className='rounded-full border p-1 pl-2 pr-2 w-fit border-blue-400 hover:scale-[1.01] cursor-default capitalize transition-all text-blue-700 bg-blue-50'>
                  {hobby}
                </p>
              ))
            }
          </div>
        </div>
        
        <div className='flex flex-col gap-1'>
          <p><b>Preferred location</b></p>
          <div className='flex items-center flex-wrap gap-1 mobile:text-sm'>
            {
              roommateProfileData?.roommateDetails?.preferredLocation?.map(local => (
                  <p key={local} className='rounded-md border p-1 capitalize'>{local}</p>
              ))
            }
          </div>
        </div>

        <PropertyAttributesComponent apartmentProfileData={roommateProfileData} />

      </article>

    </>
  )
}
