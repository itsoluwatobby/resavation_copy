"use client"

import { useState } from 'react';
import { Dropdown } from 'flowbite-react';
import Image from 'next/image'
import Link from 'next/link'


export default function ShowMenu({setShowMenu}) {
    
 const [isCompanyOpen, setIsCompanyOpen] = useState(false)
 const [isLegalOpen, setIsLegalOpen] = useState(false)   

  return (<div>
    <div className='flex flex-row justify-between items-center px-8 py-4'>
        <div className="flex flex-row items-center space-x-2 text-xl md:text-2xl font-regular font-medium">
            <Image src="./logo.svg" alt="logo" width={30} height={50} className='w-[30px] h-[50px]' />
            <div>Resavation</div>
        </div>
        <button onClick={() => setShowMenu(false)}>
            <Image src="./exit.svg" alt="logo" width={12} height={12} className='w-[12px] h-[12px]' />
        </button>
    </div>

    <div className='flex flex-col font-regular capitalize font-bold text-lg p-8 space-y-8'>
        <p>
            <Link href='/'>Home</Link>
        </p>

        <button onClick={() => setIsCompanyOpen((prev) => !prev)}>
            <div className='relative flex flex-row justify-between items-center space-x-2'>
                <p>Company</p>
                <Image src="./arrowDown.svg" alt="arrowDown" width={10} height={10} className="w-[20px] h-[20px]" />
            </div>
            {isCompanyOpen && (
                <div className="bg-gray-200 flex flex-col absolute rounded-lg items-start p-2 w-[85%] space-y-4 px-4">
                    <Link href="/about-us" className="block px-4 pt-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        About Us
                    </Link>
                    <Link href="/our-team" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Our Team
                    </Link>
                    <Link href="/blog" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Blog
                    </Link>
                </div>
            )}
        </button>

        <button className={`${isCompanyOpen && 'pt-40'}`} onClick={() => setIsLegalOpen((prev) => !prev)}>
            <div className='relative flex flex-row justify-between items-center space-x-2'>
                <p>Legal</p>
                <Image src="./arrowDown.svg" alt="arrowDown" width={10} height={10} className="w-[20px] h-[20px]" />
            </div>
            {isLegalOpen && (
                <div className="bg-gray-200 flex flex-col absolute rounded-lg items-start p-2 w-[85%] space-y-4 px-4">
                    <Link href="/terms-of-use" className="block px-4 pt-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Terms of use
                    </Link>
                    <Link href="/privacy-policy" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Privacy Policy
                    </Link>
                </div>
            )}
        </button>
    </div>


    <div className='flex flex-col md:flex-row md:space-x-8 pt-72 md:pt-10 justify-center items-center text-center'>
        <button  className="text-white font-light text-xl bg-blue-700 shadow-lg shadow-gray-300 text-center p-4 m-4 rounded-sm w-[90%] md:w-32">
            <Link href={'/signup'} onClick={() => setShowMenu(false)}>
                Sign Up
            </Link>
        </button>
        <button  className="text-black font-light text-xl  bg-white shadow-lg shadow-gray-300 text-center p-4 m-4 rounded-sm w-[90%] md:w-32">
            <Link href={'/login'} onClick={() => setShowMenu(false)}>
                Login
            </Link>
        </button>
    </div>
  </div>)
}
