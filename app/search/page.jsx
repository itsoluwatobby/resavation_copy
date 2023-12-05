"use client";

import React, { useState , useEffect, useRef} from "react";
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import { IsLoadingModal } from "../../components/IsLoading";
import { ErrorStyle } from "@/lib/helperFunction";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import SearchCard from './SearchCard';
import SearchTop from './SearchTop'
import { useResavationAppProvider } from "@/context/useResavationAppProvider";
import { users } from '@lib/dummyUser'

const expected = { 
  content: [], first: false, last: false, number: 0, 
  totalPages: 0, size: 0, pageable: {
    offset: 0, pageNumber: 0, pageSize: 0
  }
}
const initialState = { 
  isLoading: false, status: 0, isError: false, 
  success: false, error: '', data: expected 
}
export default function Search(){
  const axiosPrivate = useAxiosPrivate()
  const { currentUserInfo } = useResavationAppProvider()
  const router = useRouter()
  const [sortType, setSortType] = useState('GRID');
  const [activeType, setActiveType] = useState(false);
  const [searchState, setSearchState] = useState(initialState);
  // const [filteredResource, setFilteredResource] = useState({});
  const [filteredResource, setFilteredResource] = useState([...users]);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');
  const [reload, setReload] = useState(0);
  const inputRef = useRef()
 

  const handleChange = (event) => setSearch(event.target.value)

  const { isLoading, status, error, isError, success, data } = searchState
console.log(currentUserInfo?.pid)
  
  useEffect(()=> {
    setNumberOfPages(data?.totalPages)
    setCurrentPage(data?.pageable?.pageNumber + 1)
  }, [data?.content?.length])
  
  // useEffect(() => {
  //   if(!currentUserInfo?.pid){
  //     router.push('/login')
  //   }
  // }, [])

  useEffect(() => {
    if(inputRef?.current) inputRef?.current?.focus()
  }, [])

  // Search is possible based on CITY, LOCATION, COUNTRY, STATE, PROPERTY-TYPE and PRICE
  useEffect(() => {
    const filteredData = data?.content?.filter(targetResource => (targetResource?.roommateDetails?.preferredLocation[0]?.toLowerCase())?.includes(search?.toLowerCase()) || (targetResource?.roommateDetails?.city?.toLowerCase())?.includes(search?.toLowerCase()) || (targetResource?.roommateDetails?.state?.toLowerCase())?.includes(search?.toLowerCase()) || (targetResource?.roommateDetails?.country?.toLowerCase())?.includes(search?.toLowerCase()) || (targetResource?.roommateDetails?.apartmentRequest?.price?.amount?.toString())?.includes(search) || (targetResource?.roommateDetails?.apartmentRequest?.propertyType?.toLowerCase())?.includes(search?.toLowerCase()))
    setFilteredResource([...filteredData])
  }, [search, data?.content?.length, activeType])

  // refetch on error
  useEffect(() => {
    let isMounted = true
    let timerId;
    if(isMounted && isError && status !== 404 && status !== 401 && reload <= 3) {
      timerId = setTimeout(() => {
        setReload(prev => prev + 1)
        setSearchState(prev => ({ ...prev, isError: false, error: '' }))
      }, 10000)
    }
    return () => {
      isMounted = false
      clearTimeout(timerId)
    }
  }, [status, isError])
 
  useEffect(() => {
    let isMounted = true
    const handleSearch = async() => {
      if(isLoading) return
      setReload(0)
      try{
        setSearchState(prev => ({...prev, isLoading: true, data: expected }))
        const res = await axiosPrivate(`/roommates/match?is_roommate=${activeType}`)
        setSearchState(prev => ({...prev, success: true, data: res?.data }))
        setSearch('')
      }
      catch(error) {
        let errorMessage; 
        if(error?.response?.status == 401) errorMessage = 'Session ended, Please login'
        else errorMessage = error?.response?.data?.message ? error?.response?.data?.message : error?.response?.message;
        if(errorMessage == 'You have not uploaded your profile preference') router.push('/preference')
        setSearchState(prev => ({...prev, status: error?.response?.status, success: false, isError: true, error: errorMessage}));
        toast.error(`${errorMessage ?? error?.message}`, ErrorStyle);
      }
      finally{
        setSearchState(prev => ({...prev, isLoading: false}))
      }
    }
    isMounted ? handleSearch() : null

    return () => {
      isMounted = false
    }
  }, [reload, activeType])

  let searchContent;

  isLoading ? searchContent = (
    <div className='w-full h-full grid place-content-center'>
      <IsLoadingModal />
    </div>
  ) : isError ? searchContent = (
    <div className='w-full h-full grid place-content-center text-red-500 animate-pulse text-lg'>
      <p>{error}</p>
    </div>
  ) : filteredResource?.length ? searchContent = (
      <>
         {
           filteredResource?.map(resource => (
              <SearchCard
                key={resource?.id} sortType={sortType} 
                resource={resource}
              />
            ))
          }
      </>
  ) : (!isLoading && !isError && !success) 
          ? searchContent = (
              <div className={`w-full h-full grid place-content-center text-gray-800 animate-pulse text-lg`}>
                <p className={`${!search ? 'block' : 'hidden'} font-medium first-letter:text-2xl`}>Loading up soon</p>
              </div>
            ) : searchContent = (
              <div className='w-full h-full grid place-content-center text-gray-800 animate-pulse text-lg'>
                <div className='font-medium first-letter:text-2xl'>
                  {activeType ? 
                        <span>No available Flatmates found</span> 
                      : 
                        <p>
                          No result for &nbsp;
                          <span className='text-green-600 uppercase'>
                            {search}
                          </span>, &nbsp;please try another filter
                        </p>
                  }
                </div>
              </div>)
              // mdxl:w-1/2 mdxl:justify-between
// maxscreen:grid-cols-1 ${sortType === 'GRID' ? 'grid-cols-2' : 'grid-cols-1'} gap-x-3 gap-y-3.5
  return (
    <main 
      onClick={() => setSearchState(prev => ({...prev, isError: false, error: ''}))}
      className={`mobile:text-sm mt-8 bg-white flex-grow text-sm p-3 pt-0 flex flex-col gap-5 w-full sm:m-auto lg:w-[65%] md:w-[85%]`}>

      <SearchTop 
        data={data} handleChange={handleChange} sortType={sortType} 
        setSortType={setSortType} setActiveType={setActiveType} 
        activeType={activeType} inputRef={inputRef} search={search}
        isLoading={isLoading} isError={isError} filteredResource={filteredResource}
      />

      {/* search results */}
        <section className={`flex-auto shadow-inner grid maxscreen:grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-3.5 shadow-slate-200 min-h-[25rem] transition-all p-1 py-2 w-full`}>
         {searchContent}
        </section>

        <div className="flex-none self-center w-fit h-10 p-1 flex items-center gap-3 text-xs text-gray-700 transition-all">
          {
            [...Array(numberOfPages).keys()]?.map(index => (
              <p 
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`p-0.5 w-6 h-6 text-center cursor-pointer hover:opacity-90 active:opacity-100 transition-all ${currentPage === (index + 1) ? 'bg-blue-500 text-white' : 'text-gray-800'} rounded-full`}>
                {index + 1}
              </p>
            ))
          }
        </div>
    </main>
  );
};

