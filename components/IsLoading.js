import React from 'react'

export const IsLoadingModal = ({ position='default' }) => {
  return (
    <div 
        className={`${position === 'default' ? 'w-20 h-20 border-[10px] mt-5' : 'w-10 h-10 border-[5px]'} animate-spin border-r-blue-700 border-l-blue-700 border-t-indigo-300 border-b-indigo-300 rounded-full m-auto`}
    />
  )
}
