"use client"

import { useEffect } from 'react'
import { ApartmentProfile } from './ApartmentProfile'
import { useResavationAppProvider } from '../../context/useResavationAppProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RoommateProfileDetails(){
  const { currentUserInfo, apartmentProfileData } = useResavationAppProvider()
  const router = useRouter()

  // useEffect(() => {
  //   if(!currentUserInfo?.pid){
  //     router.push('/login')
  //   }
  // }, [])

   return (
    <section
      className={`mt-8 flex-grow gap-3 text-sm p-3 flex flex-col justify-between w-full sm:m-auto md:w-2/3 lg:w-[55%]`}>
      {apartmentProfileData?.roommateDetails ?
        <ApartmentProfile  
          roommateProfileData={apartmentProfileData} 
        />
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
