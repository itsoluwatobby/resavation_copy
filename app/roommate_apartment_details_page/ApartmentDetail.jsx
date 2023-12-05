
import { CheckingComponent } from './CheckingComponent'
import { BiSolidBadgeCheck } from 'react-icons/bi';
import { formatPrice, reduceTextLength } from '../../lib/helperFunction';
import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const ApartmentDetail = ({ apartmentProfileData, checkingType, requestData, setRequestData, setCheckingType }) => {
  const [userAge, setUserAge] = useState(0)

  useEffect(() => {
    const dateOfBirth = apartmentProfileData?.roommateDetails?.user?.dateOfBirth
    const age = new Date().getFullYear() - +dateOfBirth?.split('-')[0]
    setUserAge(age)
  }, [apartmentProfileData?.roommateDetails?.user?.dateOfBirth])

  return (
    <>
      <div className='w-full flex flex-col gap-2 p-2 lg:hidden'>
        <div className='w-full flex items-center justify-between'>
          <p className='flex text-xs items-center gap-1.5 mobile:text-base'>
            <span>Verified</span>
            {/* {apartmentProfileData?.roommateDetails?.user?.verificationStatus === '' ? '' : <BiSolidBadgeCheck className='text-green-600 text-lg' />} */}
            <BiSolidBadgeCheck className='text-green-600 text-lg' />
          </p>
          <p className='text-blue-600 tracking-wide text-xs mobile:text-sm'>
            {
              apartmentProfileData?.roommateDetails?.apartmentRequest?.price?.priceType === 'MONTHLY' 
                ? (
                    apartmentProfileData?.roommateDetails?.apartmentRequest?.price?.amount > 0 
                      ? `#${formatPrice(apartmentProfileData?.roommateDetails?.apartmentRequest?.price?.amount)}/monthly` : 'NA'
                  ) 
                  : 
                  (
                    apartmentProfileData?.roommateDetails?.apartmentRequest?.price?.amount > 0 
                      ? `#${formatPrice(apartmentProfileData?.roommateDetails?.apartmentRequest?.price?.amount)}/daily` : 'NA'
                  )
            }
          </p>
        </div>
        <div>
          <p className='font-medium text-base tracking-wide first-letter:capitalize'>{apartmentProfileData?.roommateDetails?.apartmentRequest?.propertyTitle}</p>
          <span className='text-xs mobile:text-sm capitalize'>{apartmentProfileData?.roommateDetails?.city}, {apartmentProfileData?.roommateDetails?.country}</span>
        </div>
      </div>

      <div className='w-full flex justify-start flex-col lg:min-w-[45%]  p-2 lg:pr-0 lg:pl-3 lg:gap-3 rounded-md'>

        <article className='lg:flex lg:flex-col w-full lg:p-2 lg:pl-1 lg:pr-1 lg:border lg:rounded-md'>

          <div className='flex items-center gap-3 lg:p-1.5'>
{/*  width={44} height={44} */}
            <figure className='w-8 h-8 mobile:w-10 mobile:h-10 box-border bg-slate-400 rounded-full'>
              {
                apartmentProfileData?.roommateDetails?.user?.imageUrl ?
                  <img 
                    src={apartmentProfileData?.roommateDetails?.user?.imageUrl}
                    alt='Home' loading='eager'
                    className='rounded-full w-full h-full object-cover'
                  />
                : null
              }
            </figure>
            <p className='flex flex-col font-medium text-xs mobile:text-sm'>
              <span className='capitalize'><b>{apartmentProfileData?.roommateDetails?.user?.firstName}, {userAge}</b></span>
              <Link href={`/profile?email=${apartmentProfileData?.roommateDetails?.user?.email}`} className='text-blue-500 cursor-pointer hover:text-blue-400 transition-all active:text-blue-600'>view profile</Link>
            </p>

          </div>

          {
            apartmentProfileData?.roommateDetails?.user?.aboutMe?.length ?
              <p className={`hidden lg:flex flex-col p-1`}>
                <span><b>About</b></span>
                <span className='text-justify w-fit whitespace-pre-wrap text-gray-600 text-xs mobile:text-sm first-letter:capitalize'>
                  {apartmentProfileData?.roommateDetails?.user?.aboutMe}
                </span>
              </p>
            : null
          }
        </article>


        <CheckingComponent large 
          checkingType={checkingType} setCheckingType={setCheckingType} 
          requestData={requestData} setRequestData={setRequestData}
          apartmentProfileData={apartmentProfileData}
        />
      
      </div>
    </>
  )
}
