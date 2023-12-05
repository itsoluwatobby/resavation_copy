"use client"

import { BsFillSuitHeartFill, BsArrowLeft } from 'react-icons/bs'
import { useRouter } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react'

export const ApartmentImage = ({ resource }) => {
  const [seeMore, setSeeMore] = useState(false)
  const [nextImage, setNextImage] = useState(0)
  const [imagesLength, setImagesLength] = useState(6)
  const scrollRef = useCallback((node) => {
    node ? node.scrollIntoView({ behavior: 'smooth' }) : null
  }, [])
  // const router = useRouter()
  // width=400 height=400

  useEffect(() => {
    //setImagesLength(resource?.roommateDetails?.apartmentRequest?.propertyImages?.length)
  }, [resource?.roommateDetails?.apartmentRequest?.propertyImages?.length])
  

  return (
    <figure className={`relative w-full rounded-md h-64 lg:h-72 box-border ${seeMore ? 'hidden' : 'flex'} items-center gap-3`}>

      <img src={resource?.roommateDetails?.apartmentRequest?.propertyImages[0]}
        alt='Home' priority={true}
        className='flex-auto rounded-md object-cover lg:w-[53%] w-full h-full'
      />

      <div className={`relative rounded-md flex-none min-w-[43%] w-[43%] hidden box-border ${resource?.roommateDetails?.apartmentRequest?.propertyImages?.length == 1 ? 'flex' : 'flex'} ${seeMore ? 'flex-row overflow-x-scroll' : 'flex-col'} h-full gap-1.5`}>

        {
          // !seeMore ? (
            resource?.roommateDetails?.apartmentRequest?.propertyImages?.slice(0, 2)?.map(image => (
            // [...Array(2).keys()]?.map((image, i) => (
              <figure 
                key={image?.substring(160, 190)}
                // key={i}
                className='flex-auto rounded-md w-full h-[48%] bg-slate-400'>
                <img
                  // width={200} 
                  // height={200} 
                  src={image}
                  alt='Home' loading='eager'
                  className='rounded-md object-cover w-full h-full'
                />
              </figure>
            ))
          // ) : (
          //    //resource?.roommateDetails?.apartmentRequest?.propertyImages?.map(image => (
          //   [...Array(6).keys()]?.map((image, i) => (
          //     <figure 
          //       //key={image?.substring(160, 190)}
          //       key={i}
          //       ref={nextImage == i ? scrollRef : null}
          //       className='flex-auto rounded-md w-full h-full bg-slate-400'>
          //       {/* <img key={image?.substring(160, 190)}
          //         // width={200} 
          //         // height={200} 
          //         src={image}
          //         alt='Home' loading='eager'
          //         className='rounded-md object-cover w-full h-full'
          //       /> */}
          //     </figure>
          //   ))
          // )
        }
        {
          resource?.roommateDetails?.apartmentRequest?.propertyImages?.length > 3 ? 
            <button
              //onClick={() => setSeeMore(true)}    
              className={`absolute left-0 bottom-0 ${seeMore ? 'hidden' : 'block'} bg-gray-900 rounded-md bg-opacity-40 border-none focus:outline-none hover:opacity-90 active:opacity-100 transition-all w-full h-[49%] text-white`}>See more
            </button> 
          : null
        }
          {/* <button
            onClick={() => setNextImage(prev => prev < imagesLength ? prev + 1 : prev = 0)}    
            className={`absolute right-1 top-6 bg-gray-900 rounded-md bg-opacity-40 border-none focus:outline-none hover:opacity-90 active:opacity-100 transition-all w-fit text-white`}>
              next
          </button>  */}
      </div>

      <button className='absolute z-20 lg:hidden grid place-content-center left-4 rounded-full p-2 w-8 h-8 top-5'>
        <BsArrowLeft 
          className='text-white text-xl hover:scale-[1.08] active:scale-[1.02] transition-all cursor-pointer' />
      </button>

      <button className='lg:hidden absolute z-20 grid place-content-center right-4 rounded-full p-2 w-8 h-8 shadow-md bg-white top-8'>
        <BsFillSuitHeartFill className='text-red-600 text-xl hover:scale-[1.08] active:scale-[1.02] transition-all cursor-pointer' />
      </button>

      <div className='absolute lg:hidden bg-blue-600 text-white flex items-center z-20 right-4 rounded-md p-2 h-8 shadow-md bottom-5'>{resource?.matchingPercentage+'%'} match</div>

    </figure>
  )
}
