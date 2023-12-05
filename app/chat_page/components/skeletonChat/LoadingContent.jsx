import React from 'react'
import { SkeletonChat } from './SkeletonChat'

export const LoadingContent = () => {

  return (
    <div className={`chatScroll p-4 flex-grow w-full h-[90%] pt-8 pb-4 overflow-y-scroll flex flex-col gap-3`}>
      <div className='w-full h-10 rounded-md flex items-center justify-end'>
        <SkeletonChat />
      </div>
      <div className='w-full border-gray-100 rounded-md flex items-center justify-start'>
        <SkeletonChat />
      </div>
      <div className='w-full border-gray-100 rounded-md flex items-center justify-end'>
        <SkeletonChat />
      </div>
      <div className='w-full border-gray-100 rounded-md flex items-center justify-end'>
        <SkeletonChat />
      </div>
      <div className='w-full border-gray-100 rounded-md flex items-center justify-start'>
        <SkeletonChat />
      </div>
    </div>
  )
}
