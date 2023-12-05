"use client"

import React from 'react'
import Image from 'next/image'


export default function CustomerCard() {
  return (
        <div className="bg-white rounded">
              <div className="pb-6">
                <div className="flex justify-center items-center text-center py-4">
                  <Image src="./comment.svg" alt="customerIcon" width={20} height={20} className="text-center w-[20px] h-[20px]" />
                </div>
                <p>I trust your services as much as anything, they are reliable and swift.</p>
              </div>
              <div className="pb-4">
                <div className="flex justify-center items-center text-center ">
                  <Image src="/testProfile.png" alt="customerIcon" width={80} height={80} className="text-center rounded-full" />
                </div>
                <h5 className="capitalize font-bold text-xl">
                  Stephen Adeyemo
                </h5>
                <p className="text-blue-600">
                  Student of OAU
                </p>
              </div>
        </div>
    )
}
