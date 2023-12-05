"use client"

import { useState, useEffect } from 'react';
import { LiaBedSolid } from "react-icons/lia";
import { LuBoxSelect} from "react-icons/lu";
import { formatPrice, reduceTextLength } from "@/lib/helperFunction";
import { BsPeople, BsSuitHeart } from "react-icons/bs";
import { BiSolidBadgeCheck } from "react-icons/bi";
import { useResavationAppProvider } from '../../context/useResavationAppProvider'
import { useRouter } from "next/navigation";

export default function SearchCard({ sortType, resource }){
  const { setApartmentProfileData } = useResavationAppProvider()
  const router = useRouter()
  const [userAge, setUserAge] = useState(0)

  useEffect(() => {
    const dateOfBirth = resource?.roommateDetails?.user?.dateOfBirth
    const age = new Date().getFullYear() - +dateOfBirth?.split('-')[0]
    setUserAge(age)
  }, [resource?.roommateDetails?.user?.dateOfBirth])

  const openRoommateProfile = () => {
    setApartmentProfileData({...resource})
    resource?.roommateDetails?.isRoommateRequest 
        ? router.push('/roommate_profile_details')
            : router.push('/roommate_apartment_details_page')
  }
//  ${sortType === 'GRID' ? 'h-44 lg:h-52' : 'h-72'}
  return (
    <article 
      onClick={openRoommateProfile}
      className="flex flex-col border-2 border-gray-200 border-dashed h-fit rounded-sm cursor-pointer hover:scale-[1.01] active:scale-[1] transition-all shadow-md shadow-slate-300">

      <figure className={`flex-none relative h-72 transition-all w-full rounded-sm box-border`}>
        <img src={resource?.roommateDetails?.apartmentRequest?.propertyImages[0]}
          alt='Home' loading='eager'
          className='rounded-sm object-cover w-full h-full'
        />

        <button className='absolute grid place-content-center right-4 rounded-full p-2 w-8 h-8 shadow-md bg-white top-4'>
          <BsSuitHeart className='text-black text-xl hover:scale-[1.08] active:scale-[1.02] transition-all cursor-pointer' />
        </button>

        <div className='absolute lg:hidden bg-blue-600 text-xs text-white flex items-center left-3 rounded-sm p-2 h-8 shadow-md top-4'>{resource?.matchingPercentage+'%'} match
        </div>
       
      </figure>

      <div className="flex-auto flex flex-col gap-3 lg:gap-3 text-xs py-1.5 pb-2.5 px-1.5 hover:opacity-90 active:opacity-100">

        <div className="flex flex-col w-full">
          <p className="text-sm font-medium">Looking for {resource?.roommateDetails?.isRoommateRequest ? 'a Student roommate' : 'an apartment'}</p>
          <p className="text-gray-600 text-xs">{resource?.roommateDetails?.city}, {resource?.roommateDetails?.state}</p>
        </div>

        <div className="self-left w-3/4 maxscreen:text-[11px] flex items-center flex-wrap gap-x-3">
          <p className="flex items-center gap-1.5 text-gray-700">
            <BsPeople className="text-lg" />
            <span>{3} guests</span>
          </p>
          <p className="flex items-center gap-1.5 text-gray-700">
            <LiaBedSolid className="text-lg" />
            <span>{resource?.roommateDetails?.apartmentRequest?.propertySummary?.bedroomsNumbers} Bedroom</span>
          </p>
          <p className="flex items-center gap-1.5 text-gray-700">
            <LuBoxSelect className="text-lg" />
            <span>{3} 300m<sup>2</sup></span>
          </p>
        </div>

        <div className="flex items-center w-full justify-between maxscreen:text-[11px] text-sm">

          <div className='flex items-center gap-1'>

            <figure className='w-8 h-8 mobile:w-10 mobile:h-10 box-border rounded-full bg-slate-400'>
              {
                resource?.roommateDetails?.user?.imageUrl ?
                  <img 
                    src={resource?.roommateDetails?.user?.imageUrl}
                    alt='Home' loading='eager'
                    className='rounded-full w-full h-full object-cover'
                  />
                  : null
              }
            </figure>

            <div className='flex flex-col -gap-1 font-medium mobile:text-base'>
              <p 
                title={resource?.roommateDetails?.user?.firstName}
                className="flex items-center gap-1 capitalize">
                <b>{reduceTextLength(resource?.roommateDetails?.user?.firstName, 15, 'letter')}, {userAge}</b>
                <BiSolidBadgeCheck className='text-green-600 text-lg' />
              </p>
              <span className='text-blue-600 cursor-pointer hover:text-blue-400 transition-all active:text-blue-600 capitalize'>{resource?.roommateDetails?.user?.occupation}</span>
            </div>

          </div>
        
          <p className='text-black text-xs'>
            {
              resource?.roommateDetails?.apartmentRequest?.price?.priceType === 'MONTHLY' 
                  ? (
                      resource?.roommateDetails?.apartmentRequest?.price?.amount > 0 
                        ? `#${formatPrice(resource?.roommateDetails?.apartmentRequest?.price?.amount)}/monthly` : 'NA'
                    ) 
                      : 
                    (
                      resource?.roommateDetails?.apartmentRequest?.price?.amount > 0 
                        ? `#${formatPrice(resource?.roommateDetails?.apartmentRequest?.price?.amount)}/daily` : 'NA'
                    )
            }
          </p>
        
        </div>

      </div>

    </article>
  )
}
