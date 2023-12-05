import Link from 'next/link'
import { BsCheck2Circle } from 'react-icons/bs';

export default function EmailSuccess(){

  return (
    <section className='h-[57%] mdxl:text-base mt-8 flex-grow gap-5 text-sm p-6 flex flex-col justify-between w-full md:w-1/2 sm:m-auto'>

      <div className='flex flex-col items-center gap-8 p-2'>
        <BsCheck2Circle 
          className='text-green-700 text-6xl' 
        />
        <div className='flex flex-col items-center'>
          <h1 className='font-bold text-lg'>Email verification</h1>
          <h1 className='font-bold text-lg -mt-1'>successful</h1>
        </div>
        <span className='text-gray-400 text-sm'>Your email has been verified successfully</span>
      </div>
        
      <Link href={'/login'}
        className='w-full'
      >
        <button
          type='submit'
          className='bg-blue-700 p-4 transition-all w-[95%] text-white rounded-md hover:bg-blue-600 active:bg-blue-700 uppercase'
        >
            Login
        </button>
      </Link>

    </section>
  )
}

