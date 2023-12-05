import React from 'react'
import { PropertyAttributesComponent } from '../../components/PropertyAttributesComponent'

const amenitiesClass = 'text-xs mobile:text-sm text-gray-700 font-normal capitalize'

export const PropertyInfo = ({ apartmentProfileData }) => {
  

  return (
    <div className='lg:pt-0 pt-5 lg:w-[60%] lg:min-w-[55%] flex flex-col mobile:text-sm w-full gap-3 p-2 mobile:p-0.5'>

      <div className='flex flex-col gap-1.5'>
        <p className='text-base font-medium flex items-center gap-1'>
          <span className='hidden lg:block'>Property</span>
          <span>Description</span>
        </p>
        <p className='text-justify mobile:text-sm whitespace-pre-wrap tracking-wide text-xs text-gray-700'>
          {apartmentProfileData?.roommateDetails?.apartmentRequest?.propertyDescription}
        </p>
      </div>

      <PropertyAttributesComponent apartmentProfileData={apartmentProfileData} />

      <div className='flex flex-col gap-3 p-2 mobile:p-0'>

        <div className='flex flex-col gap-2 w-full'>
          <p className='font-medium mobile:text-base'>Amenities</p>
          <div className='flex items-center justify-between flex-wrap gap-2 w-[30%] mobile:w-1/2 '>
            {
              apartmentProfileData?.roommateDetails?.apartmentRequest?.amenities?.map(entity => (
                <span key={entity} className={amenitiesClass}>{entity}</span>  
                // <p className='w-full flex items-center justify-between text-gray-800'>
                  //   <span className={amenitiesClass}>{entity}</span>
                  //   <span className={amenitiesClass}>Vacancy</span>
                  // </p>
              ))
            }
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <p className='font-medium mobile:text-base'>House rules</p>
          <div className='flex flex-col gap-2'>
            {
              apartmentProfileData?.roommateDetails?.apartmentRequest?.houseRules?.map(rule => (
                <span key={rule} className={amenitiesClass}>{rule}</span>
              ))
            }
          </div>
        </div>

      </div>

    </div>
  )
}

