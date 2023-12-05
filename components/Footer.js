import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube} from "react-icons/fa"

export default function Footer() {
    const pathname = usePathname()
    const { userId } = useParams()
    const pagesWithoutFooter = [`/chat_page`, '/settings']

  return (
    <div className={`${pagesWithoutFooter.includes(pathname) ? 'hidden' : 'w-full bg-[#04122A] text-white px-6'}`}>
        <div className="flex flex-row pl-4 space-x-2 text-xl md:text-2xl font-regular font-medium m-6 md:m-12 px-2 md:px-4 pt-4">
            <Image src="./logo.svg" alt="logo" width={30} height={50} className='hidden w-[30px] h-[50px] text-white' color="#FFFFFF" />
            <div className="text-2xl">Resavation</div>
        </div>

        <div className="flex justify-center md:justify-between md:px-24 text-sm md:text-base space-x-24 md:space-x-4">
           <div>
                <h4 className="text-xl pb-8">
                    Company
                </h4>
                <ul className="font-light space-y-4 text-base">
                    <li>
                        <Link href="/" >Home</Link>
                    </li>
                    <li>
                        <Link href="/" >About Us</Link>
                    </li>
                    <li>
                        <Link href="/" >Our team</Link>
                    </li>
                    <li>
                        <Link href="/" >Blog</Link>
                    </li>
                </ul>
            </div>
            <div>
                <h4 className="text-xl pb-8 font-regular">
                        Legal
                </h4>
                <ul className="font-light space-y-4 text-base text-gray-200">
                    <li>
                        <Link href="/" >Terms of use</Link>
                    </li>
                    <li>
                        <Link href="/" >Privacy Policy</Link>
                    </li>
                </ul>
            </div>
        </div>
        
        <div className="text-center mt-4 pt-4">
            <div className="flex flex-row justify-center items-center text-center space-x-2 py-1">
                <span className="bg-[#04122A] rounded-full text-white p-1">
                    <Link href="/" ><FaLinkedinIn /></Link>
                </span>
                <span className="bg-[#04122A] rounded-full text-white p-1">
                    <Link href="/" ><FaFacebookF /></Link>
                </span>
                <span  className="bg-[#04122A] rounded-full text-white p-1">
                    <Link href="/" ><FaTwitter /></Link>
                </span>
                <span  className="bg-[#04122A] rounded-full text-white p-1">
                    <Link href="/" ><FaInstagram /></Link>
                </span>
                <span  className="bg-[#04122A] rounded-full text-white p-1">
                    <Link href="/" ><FaYoutube /></Link>
                </span>
            </div>
            <p className="py-2">&copy; Resavation Technologies Ltd</p>
        </div>
    </div>
  )
}
