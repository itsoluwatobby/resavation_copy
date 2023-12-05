import { BsFillFilterSquareFill, BsFillGridFill, BsFilter } from "react-icons/bs";
import { MdSearch } from "react-icons/md";
import { useState, useEffect } from 'react'
import { useRefreshToken } from '../../hooks/useRefreshToken'

export default function SearchTop({ 
  data, handleChange, sortType, setSortType, setActiveType, activeType, 
  inputRef, search, isLoading, isError, filteredResource
}){
  const [locationEntry, setLocationEntry] = useState('')
  const newAccessToken = useRefreshToken()

  // const fect = async() => {
  //   const res = await newAccessToken()
  //   console.log(res)
  // }

  useEffect(() => {
    if(search && !isError) setLocationEntry(search)
    else if(isError) setLocationEntry('')
  }, [isError, search])

  return (
    <div className="flex flex-col gap-5 z-20 pb-2 pt-4">
        {/* search bar */}
        <div className={`flex-none flex items-center w-full gap-1 h-10 rounded-sm`}>
          
          <div 
            className={`flex-auto flex items-center ${isLoading ? 'animate-pulse' : 'animate-none'} h-full rounded-sm bg-gray-200`}>
            <input
              type="text"
              ref={inputRef}
              name="Location"
              value={search}
              onChange={handleChange}
              placeholder="Filter either by City, State, Location, Country, Price, PropertyType"
              className="flex-auto bg-inherit border-none h-full p-1 px-2 rounded-sm text-sm focus:outline-none placeholder:text-gray-700"
            />

            <p className="w-8 h-full grid place-content-center">
              <MdSearch
                //onClick={fect}
                className="text-blue-600 text-xl"
              />   
            </p>
          
          </div>
            
          {/* <BsFillFilterSquareFill 
            className={`text-4xl ${(canSearch && !isLoading) ? 'text-blue-600' : 'text-gray-600'} cursor-pointer hover:opacity-80 active:opacity-100 hover:scale-[1.02] active:scale-[1] transition-all`} 
          /> */}
        </div>
        
      {/* flatmate and apartment button */}
        <div className="flex-none h-8 py-2 mobile:w-full flex items-center gap-2 self-start text-white">
          <button
            onClick={() => setActiveType(false)}
            className={`py-2 ${!activeType ? 'bg-blue-600' : 'bg-gray-200 text-black'} px-4 grid place-content-center mobile:w-full rounded-sm shadow-sm border-none cursor-pointer hover:opacity-80 active:opacity-100 transition-all focus:outline-none`}
          >
            Apartments
          </button> 
          <button
            onClick={() => setActiveType(true)}
            className={`py-2 ${!activeType ? 'bg-gray-200 text-black' : 'bg-blue-600'} px-6 mobile:w-full grid place-content-center p-1 rounded-sm shadow-sm border-none cursor-pointer hover:opacity-80 active:opacity-100 transition-all focus:outline-none`}
          >
            Flatmates
          </button> 
        </div>

        <div className="flex-none h-12 mt-1 py-2 flex items-center justify-between w-full">
          <div className="flex flex-col w-fit p-1">
            {/* <span className="font-medium tracking-wide text-lg capitalize">{
            activeType ? 'Roommates' : 'Apartments'} in {locationEntry || 'location*'}
            </span> */}
            <p className="font-medium tracking-wide text-lg flex items-center">
              <span className="text-blue-600">{!search?.length ? (data?.totalElements ?? 0) : filteredResource?.length}</span> 
              &nbsp;
              <span className="">
                {
                  activeType ? 'Flatmate' : 'Apartment'
                }{
                    !search?.length 
                      ? ((!data?.totalElements || data?.totalElements <= 1) ? '' : 's') 
                        : ((!filteredResource?.length || filteredResource?.length) <= 1 ? '' : 's')
                }&nbsp;found
              </span>
            </p>
          </div>

         {/* { 
           filteredResource?.length > 5 ? */}
            <div className="flex items-center justify-between p-1 gap-6">
              <p className="text-gray-900 font-medium">Sort by</p>
              {/* <p className="flex items-center gap-2">
                <BsFilter 
                //   title="Single"
                //   onClick={() => setSortType('SINGLE')}
                //   className={`text-xl cursor-pointer font-bold hover:opacity-90 active:opacity-100 transition-all ${sortType === 'SINGLE' ? 'text-blue-700' : 'text-gray-800'}`}
                // /> 
                // <BsFillGridFill 
                //   title="Grid"
                //   onClick={() => setSortType('GRID')}
                //   className={`text-lg cursor-pointer hover:opacity-90 active:opacity-100 transition-all ${sortType === 'GRID' ? 'text-blue-600' : 'text-gray-600'}`}
                // />
              </p> */}
            </div>
          {/* //  : null
          // } */}
      </div>
    </div>
  )
}