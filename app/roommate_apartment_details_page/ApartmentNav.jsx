"use client"

import { BsFillSuitHeartFill } from 'react-icons/bs'
import { formatPrice } from '../../lib/helperFunction'

export const ApartmentNav = ({ apartmentProfileDetail }) => {

  return (
    <nav className='sticky top-0 hidden bg-gray-100 lg:flex items-center justify-center w-full z-50 -mb-2'>

      <div className='flex flex-col font-medium pl-2 w-full'>
        <p className='flex items-center gap-1.5'>
          <span className='font-bold text-base'>
            {`${apartmentProfileDetail?.roommateDetails?.user?.firstName}
             ${apartmentProfileDetail?.roommateDetails?.user?.lastName}`}
          </span>
        </p>
        <p className='text-gray-400 text-xs flex items-center font-normal'>
          <span>{apartmentProfileDetail?.roommateDetails?.city},&nbsp;</span>
          <span>{apartmentProfileDetail?.roommateDetails?.state}</span>
        </p>
      </div>

      <div className='flex items-center gap-4'>
        <p className='text-blue-600 tracking-wide text-xs'>
        {
          apartmentProfileDetail?.roommateDetails?.apartmentRequest?.price?.priceType === 'MONTHLY' 
              ? (
                  apartmentProfileDetail?.roommateDetails?.apartmentRequest?.price?.amount > 0 
                    ? `#${formatPrice(apartmentProfileDetail?.roommateDetails?.apartmentRequest?.price?.amount)}/monthly` : 'NA'
                ) 
                : 
                (
                  apartmentProfileDetail?.roommateDetails?.apartmentRequest?.price?.amount > 0 
                    ? `#${formatPrice(apartmentProfileDetail?.roommateDetails?.apartmentRequest?.price?.amount)}/daily` : 'NA'
                )
        }
        </p>
        <button className='grid place-content-center rounded-full p-2 w-7 h-7 shadow-md bg-white'>
          <BsFillSuitHeartFill className='text-red-600 text-xl hover:scale-[1.08] active:scale-[1.02] transition-all cursor-pointer' />
        </button>
      </div>

    </nav>
  )
}
