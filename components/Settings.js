"use client"

import Link from 'next/link'
import Image from 'next/image'
import {SlArrowRight} from 'react-icons/sl'

export default function Settings({setShowSettings}) {

    const linkColor = 'hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
   
    const handleLogout = () => {
        setShowSettings(false)
        //Logout Func
    }
    

  return (<div className="w-full h-full">
    <div className="absolute top-4 right-4">
        <button onClick={() => setShowSettings(false)} >
            <Image src="./exit.svg" alt="logo" width={12} height={12} className='w-[12px] h-[12px]' />
        </button>
    </div>
    <div className="p-10"> 
      <div className="flex items-center space-x-4">
        <Image src={`/dummy-profile.png`} alt="profile-pic" className="rounded-full w-[50px] h-[50px]" width={50} height={50} />
        <div>
          <h3 className="font-bold">
            Stephen Adeyemo
          </h3>
          <p className="font-light pb-2">
            adeyemodedapo@gmail.com
          </p>

          <Link href={`/profile`} className={`${linkColor}`} onClick={() => setShowSettings(false)}>View Profile</Link>
        </div>
      </div>
    </div>

    <div className="p-4 flex flex-col justify-center items-left space-y-4 text-lg" >
        <div className="flex justify-between items-center">
            <Link href={`/post_your_request`} className={`block px-4 py-2 ${linkColor}`} onClick={() => setShowSettings(false)}>
                Post your request 
            </Link>
            <SlArrowRight size={15} />
        </div>
        <div className="flex justify-between items-center">
            <Link href={`/my-listings`} className={`block px-4 py-2 ${linkColor}`} onClick={() => setShowSettings(false)}>
                My listings 
            </Link>
            <SlArrowRight size={15} />
        </div>
        <div className="flex justify-between items-center">
            <Link href={`/profile-preference`} className={`block px-4 py-2 ${linkColor}`} onClick={() => setShowSettings(false)}>
                Profile preference 
            </Link>
            <SlArrowRight size={15} />
        </div>
        <div className="flex justify-between items-center">
            <Link href={`/roommate_request`} className={`block px-4 py-2 ${linkColor}`} onClick={() => setShowSettings(false)}>
                Find Roommate 
            </Link>
            <SlArrowRight size={15} />
        </div>
        <div className="flex justify-between items-center">
            <Link href={`/payment-methods`} className={`block px-4 py-2 ${linkColor}`} onClick={() => setShowSettings(false)}>
                Payment methods 
            </Link>
            <SlArrowRight size={15} />
        </div>
        <div className="flex justify-between items-center">
            <Link href={`/messages`} className={`block px-4 py-2 ${linkColor}`} onClick={() => setShowSettings(false)}>
                Messages 
            </Link>
            <SlArrowRight size={15} />
        </div>  
        <div className="flex justify-between items-center">
            <Link href={`/favorite`} className={`block px-4 py-2 ${linkColor}`} onClick={() => setShowSettings(false)}>
                Favorites 
            </Link>
            <SlArrowRight size={15} />
        </div>
        <div className="flex justify-between items-center">
            <Link href={`/bookings`} className={`block px-4 py-2 ${linkColor}`} onClick={() => setShowSettings(false)}>
                My Bookings 
            </Link>
            <SlArrowRight size={15} />
        </div>                        
    </div>
    
    <div className="flex justify-center items-center text-center pt-64">
        <p onClick={handleLogout} className="font-regular text-lg text-red-600">
            Logout
        </p>
    </div>
  </div>)
}
