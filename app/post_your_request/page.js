"use client"

import {useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function PostYourRequest() {
 const checkboxStyles = 'inline-flex items-center p-4 justify-between w-full p-5 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700'

const checker = {apartmentCheck: false, roommateCheck: false}
const {apartmentCheck, roommateCheck} = checker

const [checkedObj, setCheckedObj] = useState(checker)


 const handleCheck = (e) => {
  const name = e.target.name
  const checked = e.target.checked

  if(name == "apartment") {
    setCheckedObj({apartmentCheck: checked, roommateCheck: false})
  } else if (name == "roommate") {
    setCheckedObj({apartmentCheck: false, roommateCheck: checked})
  }

 }
  return (
    <div className="flex flex-col justify-center items-center">
                                    <div className="relative w-full max-w-[80%] max-h-full p-8">
                                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                <div className="pt-24 space-y-4 px-10">
                                                    <ul className="space-y-4 gap-4">
                                                        <li>                  
                                                            <label htmlFor="apartment" className={`${checkboxStyles} flex justify-between items-center`}>
                                                                <div className="block">
                                                                    <h3 className="font-bold text-xl">
                                                                        Post Apartment Request
                                                                    </h3>
                                                                    <p className="font-light text-base py-4">
                                                                        List your apartment to get a roommate
                                                                    </p>
                                                                </div>
                                                                <input  type="checkbox" id="apartment" name="apartment" className="peer" checked={checkedObj?.apartmentCheck} onChange={handleCheck} />
                                                            </label>
                                                        </li>
                                                        <li>
                                                            <label htmlFor="roommate" className={`${checkboxStyles}`}>
                                                                <div className="block">
                                                                    <h3 className="font-bold text-xl">
                                                                        Post Roommate Request
                                                                    </h3>
                                                                    <p className="font-light text-base py-4">
                                                                        Post to get a roommate so you can find an apartment together
                                                                    </p>
                                                                </div>
                                                                <input  type="checkbox" id="roommate" name="roommate" className="peer" checked={checkedObj?.roommateCheck} onChange={handleCheck}/>
                                                            </label>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className="p-6 flex justify-center items-center">
                                                    <button type="button" className="text-white text-2xl flex justify-center items-center text-center w-full bg-blue-600  focus:ring-4 focus:outline-none font-medium rounded-lg px-5 py-3 mr-4 mt-4">
                                                        Next
                                                    </button>
                                                </div>
                                            </div>
                                        </div>


    </div>
  )
}
