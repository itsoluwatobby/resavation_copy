import { useCallback } from 'react'

const valueClass = 'flex-auto flex text-xs mobile:text-sm items-start w-[15%] mobile:w-[25%] text-gray-600 font-normal capitalize'

const attributeClass = 'flex-auto w-[40%] flex items-start font-normal text-left capitalize'

export const PropertyAttributesComponent = ({ apartmentProfileData }) => {
  
  return (
    <div className='flex flex-col w-full gap-1 mobile:text-sm'>
      <p className='text-base font-medium'>Property Information</p>
      <div className='flex flex-col text-xs w-full rounded-md border border-gray-200 p-1 pr-2 mobile:p-1.5'>

        <PropertyAttributes attribute='Property status' value='Rent' />
        <PropertyAttributes attribute='Property type' value={apartmentProfileData?.roommateDetails?.apartmentRequest?.propertyType} />
        <PropertyAttributes attribute='Space serviced' value='NA' />
        <PropertyAttributes attribute='Space furnished' value={apartmentProfileData?.roommateDetails?.apartmentRequest?.furnished ? 'Yes' : 'No'} />
        <PropertyAttributes attribute='Length of stay' value={apartmentProfileData?.roommateDetails?.lengthOfStay} />
        <PropertyAttributes attribute='Move-in Date' value={apartmentProfileData?.roommateDetails?.roommateRequest?.moveInDate} />

      </div>
    </div>
  )
}

const PropertyAttributes = ({ attribute, value}) => {

  const propertyClass = useCallback((last=false) => {
    return (`
      flex w-full items-center font-medium justify-between mobile:pr-2  pr-6 mobile:text-sm whitespace-pre-wrap text-left p-3 mobile:p-2 border border-r-0 border-l-0 border-t-0 ${last ? 'border-b-0' : 'border-b-1'}
      `)
  }, [])

  return (
    <p className={propertyClass()}>
      {attribute !== 'Length of stay' ?
        <>
          <span className={attributeClass}>{attribute}</span>
          <span className={valueClass}>{value}</span>
        </>
        :
        <>
          <span className={attributeClass}>{attribute}</span>
          {/* <span className={valueClass}>{`${value[0]} - ${value[1]}`}</span>  */}
          {/* <span className='flex items-center gap-2'>
            {
              value?.map(val => (
                <span key={val} className={valueClass}>{val}</span>
              ))
            }
          </span> */}
        </>
      }
    </p>
  )
}

