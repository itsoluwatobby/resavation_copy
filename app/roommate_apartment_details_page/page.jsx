"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link';
import { ApartmentDetail } from './ApartmentDetail'
import { CheckingComponent } from './CheckingComponent'
import { PropertyInfo } from './PropertyInfo'
import { ApartmentNav } from './ApartmentNav'
import { ApartmentImage } from './ApartmentImage'
import { useResavationAppProvider } from '@/context/useResavationAppProvider';
import { useRouter } from 'next/navigation';

const initialState = { dailyCheck: false, monthlyCheck: false }
const requestState = { 
  duration: 0, openDuration: false, isValidCheckInOrOut: true, 
  bookingType: '', checkInDate: '', checkOutDate: '', totalPrice: 0 
}
export default function RoommateApartmentDetailsPage(){
  const { currentUserInfo, apartmentProfileData } = useResavationAppProvider()
  const [requestData, setRequestData] = useState(requestState);
  const [checkingType, setCheckingType] = useState(initialState)
  const router = useRouter()
  
  // useEffect(() => {
  //   if(!currentUserInfo?.pid){
  //     router.push('/login')
  //   }
  // }, [])

  return (
    <section 
      className={`mobile:text-sm mt-8 flex-grow gap-3 text-sm p-3 lg:p-0 flex flex-col justify-between w-full sm:m-auto lg:w-[70%] md:w-[70%]`}>

      {
        apartmentProfileData?.roommateDetails ? (
          <>
            <ApartmentNav apartmentProfileDetail={apartmentProfileData} />

            <ApartmentImage 
              resource={apartmentProfileData}
            />

            <article className='flex flex-col p-2 lg:p-0 w-full lg:flex-row-reverse lg:align-top lg:gap-x-2.5'>

              <ApartmentDetail 
                checkingType={checkingType} setCheckingType={setCheckingType} 
                requestData={requestData} setRequestData={setRequestData}
                apartmentProfileData={apartmentProfileData}
              />
              <PropertyInfo apartmentProfileData={apartmentProfileData} />    </article>

            <CheckingComponent 
              checkingType={checkingType} setCheckingType={setCheckingType}
              requestData={requestData} setRequestData={setRequestData}
              apartmentProfileData={apartmentProfileData}
            />
          </>
          )
          :
          <div className='h-[22rem] w-full text-lg flex flex-col items-center justify-center'>
            <p className='first-letter:text-xl'>Please return to the search page</p>
            <Link href='/search'
              className='rounded-md w-fit p-2 px-4 bg-gray-200 shadow-lg border border-gray-300'
            >
              Go back
            </Link>
          </div>
      }
    </section>
  )
}
