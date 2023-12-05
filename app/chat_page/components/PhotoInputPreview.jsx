"use client"

import Image from 'next/image';
import { useEffect } from 'react';
import { FiMinimize2, FiMaximize2 } from 'react-icons/fi';

const PhotoInputPreview = ({ photoInput, setPhotoInput, closePreview, setClosePreview }) => {

  const handleRemoveImage = (index) => {
    const targetPhoto = photoInput[index]
    const guestPhotos = photoInput.filter(image => image.name !== targetPhoto.name)
    setPhotoInput([...guestPhotos])
  }

  useEffect(() => {
    if(!closePreview && photoInput?.length) setClosePreview(true)
    else if(!photoInput?.length){
      setClosePreview(false)
    }
  }, [photoInput?.length])

  return (
    <article className={`absolute right-0 box-border z-50 ${closePreview ? 'w-[75%] lg:w-[70%] h-[80%] top-12' : 'w-32 h-14 top-1 mdl:top-2 opacity-80 hover:opacity-100'} rounded-md bg-slate-600 mobile:text-sm shadow-lg p-2 flex flex-col transition-all ${photoInput?.length ? 'scale-[1]' : 'scale-[0] hidden'}`}>

      <div className={`relative flex flex-col h-full w-full`}>

        <div
          className='flex-none h-10 flex items-center justify-between p-1'
        >
          <p className='font-medium text-gray-400 font-sans flex items-center gap-1 text-lg'>Preview {photoInput?.length}</p>

          {
            closePreview ? 
                <button
                  title='Close preview'
                  onClick={() => setClosePreview(false)}
                  className='p-1 rounded-sm shadow-lg bg-slate-500 hover:opacity-80 active:opacity-100 transition-all'
                >
                  <FiMinimize2 className='text-red-600' />
                </button>
              :
                <button
                  title='Open preview'
                  onClick={() => setClosePreview(true)}
                  className='p-1 rounded-sm shadow-lg bg-slate-800 hover:opacity-80 active:opacity-100 transition-all'
                >
                  <FiMaximize2 className='text-green-400' />
                </button>
          }

        </div>
        
        <div className='photoScroll flex-auto flex flex-col items-center gap-1.5 w-full h-full overflow-y-scroll'>
          {
            photoInput?.map((photo, index) => (
              <figure
                key={index}
                className={`relative w-[95%] h-1/2 rounded-md shadow-md bg-slate-700 border-2 transition-all border-slate-400`}>
                <Image 
                  src={URL.createObjectURL(photo)}
                  width={100}
                  height={100}
                  loading='lazy'
                  alt='photos'
                  className='w-full h-full object-cover'
                />
                <span className='absolute right-1 top-1 rounded-full shadow-md p-0.5 bg-slate-700 text-white'>{index + 1}</span>

                <button
                  onClick={() => handleRemoveImage(index)}
                  className={`absolute top-10 right-1 w-20 h-10 text-center p-1 pr-2.5 pl-2.5 shadow-lg opacity-50 rounded-md hover:opacity-90 active:opacity-100 transition-all bg-gray-400`}
                >
                  Remove
                </button>
              </figure>
            ))
          }

        </div>
      </div>

    </article>
  )
}

export default PhotoInputPreview