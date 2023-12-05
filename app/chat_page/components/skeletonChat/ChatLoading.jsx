"use client"

import { useResavationAppProvider } from '../../../../context/useResavationAppProvider'
import SkeletonLoading from '../../../../components/SkeletonLoading'
import { LoadingContent } from './LoadingContent'
import { SkeletonMessages } from './SkeletonMessages'
import { SkeletonNav } from './SkeletonNav'

export const ChatLoading = () => {
  const {isChatPageOpened} = useResavationAppProvider();

  return (
    <> 
      <div className={`chatHeights md:mt-0 mt-2 md:flex-grow md:w-full ${isChatPageOpened?.isOpen ? 'flex' : 'hidden md:flex'} flex-col pr-0`}>
        
        <section className={`relative w-full h-[90%] flex flex-col gap-3 border`}>
          
          <SkeletonNav />
          
          <LoadingContent />
          
        </section>
        
        <SkeletonLoading classes={'width-100'} />

        <div className='absolute right-2 bottom-1.5 rounded-md w-[68%] maxscreen:w-[95%] p-6 animate-pulse border border-gray-400'/>

      </div>
      
      <SkeletonMessages />
    </>
  )
}

