"use client"

import React, { useState, useEffect } from 'react';
import { MdKeyboardArrowDown, MdOutlineCancelPresentation } from 'react-icons/md'
import { useRouter } from 'next/navigation';
import { formatPrice, ErrorStyle } from '../../lib/helperFunction';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { CheckOption } from './CheckOption';
import { toast } from 'react-hot-toast';
import { IsLoadingModal } from '../../components/IsLoading';

const baseClass = 'flex w-full items-center font-medium justify-between'

const expected = { 
  checkInDate: '', checkOutDate: '', durationLength: 0, 
  fee: 0, priceType: '', rent: 0, total: 0, vat: 0, 
}
const responseState = { isLoading: false, proceed: false, error: '', data: expected }
const requestState = { 
  duration: 0, openDuration: false, isValidCheckInOrOut: true, 
  bookingType: '', checkInDate: '', checkOutDate: '', totalPrice: 0 
}
export const CheckingComponent = ({ apartmentProfileData, large, requestData, setRequestData, checkingType, setCheckingType }) => {
  const { roommateDetails: { apartmentRequest, lengthOfStay } } = apartmentProfileData
  const [defaultAmount, setDefaultAmount] = useState({
    dailyPrice: 'NA', monthlyPrice: 'NA'
  })
  const axiosPrivate = useAxiosPrivate()
  const [responseData, setResponseData] = useState(responseState);
  const [checkName, setCheckName] = useState('checkInDate')
  const [rejectInput, setRejectInput] = useState(false)
  const router = useRouter();

  const { duration, openDuration, isValidCheckInOrOut, bookingType, checkInDate, checkOutDate } = requestData
  const { dailyCheck, monthlyCheck } = checkingType
  const { dailyPrice: defaultDailyPrice, monthlyPrice: defaultMonthlyPrice } = defaultAmount
  const { isLoading, error, data } = responseData
  const token = typeof window !== 'undefined' ? localStorage.getItem('user_token') : null

  const handleBookingPrice = (stayPeriod) => {
    const period = stayPeriod + 1;
    setRequestData(prev => ({...prev, duration: period}))
  }

  useEffect(() => {
      const defaultPrice = apartmentRequest?.price?.priceType === 'MONTHLY' 
          ? apartmentRequest?.price?.amount : apartmentRequest?.price?.amount
      setDefaultAmount({ dailyPrice: defaultPrice, monthlyPrice: defaultPrice })
  }, [apartmentRequest?.price?.priceType])

  useEffect(() => {
    if(duration < parseInt(lengthOfStay[0]) || duration > parseInt(lengthOfStay[1])) setRejectInput(true)
    else setRejectInput(false)
  }, [duration])

  const handleChange = (event) => {
    const name = event.target.name;
    const checked = event.target.checked;
    if(name === 'daily'){
      !dailyCheck 
          ? setCheckingType({dailyCheck: checked, monthlyCheck: false})
              :  setCheckingType({dailyCheck: !dailyCheck, monthlyCheck: false})
      setRequestData(prev => ({...prev, bookingType: name}))
    }  
    else if(name === 'monthly'){
      !monthlyCheck
          ? setCheckingType({dailyCheck: false, monthlyCheck: checked})
              : setCheckingType({dailyCheck: false, monthlyCheck: !monthlyCheck})
      setRequestData(prev => ({...prev, bookingType: name}))
    }
  }

  useEffect(() => {
    let timerId;
    if(responseData?.error?.length){
      timerId = setTimeout(() => {
                    setResponseData(prev => ({...prev, error: ''}))
                }, 8000)
    }
    return () => clearTimeout(timerId)
  }, [responseData?.error])

  const canMakeRequest = bookingType === 'monthly' 
                          ? [checkInDate, duration, isValidCheckInOrOut].every(Boolean) 
                            : [checkInDate, isValidCheckInOrOut, checkOutDate].every(Boolean)

    useEffect(() => {
      let isMounted = true
      const handleSubmit = async() => {
        if(responseData?.isLoading) return
        setResponseData(prev => ({...prev, isLoading: true}))
        try{
          let reqObject;
          const profileId =  apartmentProfileData?.roommateDetails?.id 
          if(bookingType === 'monthly'){
            const { duration, isValidCheckInOrOut, openDuration, checkOutDate, ...rest } = requestData
            const date = rest?.checkInDate.split('-')
            const formattedDate = `${date[2]}-${date[1]}-${date[0]}`
            reqObject = { 
              checkInDate: formattedDate, checkOutDate: '', profileId, duration, priceType: 'MONTHLY'
            }
          }
          else if(bookingType === 'daily'){
            const { openDuration, isValidCheckInOrOut, ...rest } = requestData
            const dateIn = rest?.checkInDate.split('-')
            const dateOut = rest?.checkOutDate.split('-')
            const formattedDateIn = `${dateIn[2]}-${dateIn[1]}-${dateIn[0]}`
            const formattedDateOut = `${dateOut[2]}-${dateOut[1]}-${dateOut[0]}`
            reqObject = { 
              duration, priceType: 'DAILY', profileId, checkInDate: formattedDateIn, checkOutDate: formattedDateOut 
            }
          }
          const res = await axiosPrivate.post('/roommates/payment/breakdown', reqObject)
          setResponseData(prev => ({...prev, proceed: true, data: res?.data}))
        }
        catch(error){
          const errorMessage = error?.response?.data?.message ? error?.response?.data?.message : error?.message;
          setResponseData(prev => ({...prev, error: errorMessage}))
          toast.error(`${errorMessage}`, ErrorStyle)
        }
        finally{
          setResponseData(prev => ({...prev, isLoading: false}))
        }
      }
      (isMounted && canMakeRequest && !rejectInput) ? handleSubmit() : null

    return () => {
      isMounted = false
    }  
  }, [canMakeRequest, rejectInput])

  const sendRequest = async() => {
    setResponseData(prev => ({...prev, isLoading: true}))
    try{
      const profileId =  apartmentProfileData?.roommateDetails?.id 
      // `/roommates/profile/process-request/{requestId}
      const res =  await axiosPrivate.get(`/roommates/payment/process-request?isAccepted=${true}&profileId=${profileId}`)
      
      setResponseData(prev => ({...prev, proceed: true, data: res?.data}))
      setCheckingType({dailyCheck: false, monthlyCheck: false})
      setRequestData(requestState)
    }
    catch(error){
      const errorMessage = error?.response?.data?.message ? error?.response?.data?.message : error?.message;
      setResponseData(prev => ({...prev, error: errorMessage}))
      toast.error(`${errorMessage}`, ErrorStyle)
    }
    finally{
      setResponseData(prev => ({...prev, isLoading: false}))
    }
  }

  return (
    <article className={`${large ? 'hidden lg:flex' : 'flex lg:hidden'} flex-col w-full mobile:text-sm text-xs border border-gray-200 rounded-md gap-3 p-2`}>
        
       {
        apartmentRequest?.price?.priceType === 'DAILY' ? 
        <div className='p-1 flex items-center w-full justify-between'>
          
          <div className='relative flex items-center align-top gap-1 pl-4'>
            <input 
              type="checkbox"
              name='daily'
              id='daily'
              checked={checkingType?.dailyCheck}
              onChange={handleChange}
              className='absolute left-0 border rounded-full top-1 w-3 h-3 focus:outline-none cursor-pointer' 
            />
            <label htmlFor='daily' className='flex flex-col gap-1 cursor-pointer'>
               <p>Daily</p>
              <p className='text-gray-500'>This is your daily rent</p>
            </label>
          </div>
          
          <p className='flex items-center gap-1'>
            <span className='text-gray-500'>from</span>
            <span>#{formatPrice(defaultDailyPrice)}/</span>
            <span className='text-gray-500'>day</span></p>
        
        </div>
        :
        <div className='p-1 flex items-center w-full justify-between'>

          <div className='relative flex items-center align-top gap-1 pl-4'>
            <input 
              type="checkbox"
              name='monthly'
              id='monthly'
              checked={checkingType?.monthlyCheck}
              onChange={handleChange}
              className='absolute left-0 top-1 w-3 h-3 border rounded-full focus:outline-none cursor-pointer' 
            />
            <label htmlFor='monthly' className='flex flex-col gap-1 cursor-pointer'>
              <p>Monthly</p>
              <p className='text-gray-500'>This is your monthly rent</p>
            </label>
          </div>
          <p className='flex items-center gap-1'>
            <span className='text-gray-500'>from</span>
            <span>#{formatPrice(defaultMonthlyPrice)}/</span>
            <span className='text-gray-500'>month</span>
          </p>
      
        </div>
        }

        <div className={`relative ${monthlyCheck ? 'flex' : 'hidden'} focus:outline-none cursor-pointer box-border flex-col justify-center transition-all w-full p-1 bg-gray-100 border border-gray-300 rounded-md pt-2 pb-2`}>
          <p 
            onClick={() => setRequestData(prev => ({...prev, openDuration: !openDuration}))}
            className={`relative z-50 ${openDuration ? 'bg-gray-100' : 'bg-gray-50'} w-full border text-center p-2 flex items-center justify-center font-medium hover:opacity-90 transition-all`}>
            {
              (rejectInput && duration !== 0) ? <span className='text-red-600'>
                {`Length Of Stay- Min: ${lengthOfStay[0]} | Max: ${lengthOfStay[1]}`}
                </span> : 'Stay Duration'
            }

            {
              openDuration ?
                <MdOutlineCancelPresentation 
                  className='absolute right-1 text-xl cursor-pointer text-gray-700' 
                />
                :
                <MdKeyboardArrowDown 
                  className='absolute right-1 text-xl cursor-pointer' 
                />      
            }
          </p>
          <div
            className={`absolute ${openDuration ? 'scale-100' : 'scale-0'} transition-all gap-2 w-full flex items-center overflow-x-scroll scr scroll-m-2 bg-gray-100 top-14 p-2 z-30 shadow-lg left-0 rounded-md`}>
            {
              [...Array(12).keys()]?.map(index => (
                <p 
                  key={index + 1}
                  role='duration'
                  title={(index + 1) === 1 ? 'Month' : 'Months'}
                  onClick={() => handleBookingPrice(index)}
                  className={`min-w-[78px] ${(index + 1) < parseInt(lengthOfStay[0]) ? 'opacity-40' : (index + 1) > parseInt(lengthOfStay[1]) ? 'opacity-40' : ''}  ${duration < parseInt(lengthOfStay[0]) ? 'bg-red-400' : duration > parseInt(lengthOfStay[1]) ? 'bg-red-400' : ''} max-w-20 w-18 ${duration === (index + 1) ? 'bg-blue-600 text-white' : 'bg-slate-200'} text-black font-bold text-center p-2 rounded-md hover:scale-[1.03] hover:bg-opacity-900 transition-all cursor-pointer`}
                  >{index + 1}
                </p>
              ))
            }
          </div>
        </div>
          
          <div className='flex items-center transition-all border border-gray-300 rounded-md w-full'>
              <CheckOption 
                name='Check In' 
                checkName={checkName}
                setCheckName={setCheckName}
                value={checkInDate}
                requestData={requestData}
                setRequestData={setRequestData} />
              {
                dailyCheck 
                    ? <CheckOption 
                        name='Check Out'
                        checkName={checkName}
                        setCheckName={setCheckName}
                        value={checkOutDate}
                        requestData={requestData}
                        setRequestData={setRequestData}
                      /> 
                          : null
              }
          </div>
      <>
      {/* WORKING ON THIS */}

        <div 
          onClick={() => setRequestData(prev => ({...prev, openDuration: false}))}
          className={`${(responseData?.isLoading || responseData?.proceed) ? 'flex' : 'hidden'} flex-col p-2 gap-3.5 w-full`}>

            {
              responseData?.isLoading ?
                <IsLoadingModal position={'others'}/>
                :
                <>
                  <div className={`${bookingType.length ? 'flex' : 'hidden'} w-full items-center font-medium justify-between`}>
                    <p>Duration</p>
                    {/* EDITING THIS TOO */}
                    <p className='text-gray-500 flex items-center gap-1'>
                      <span>{bookingType === 'daily' ? 'A' : data?.durationLength}</span> 
                      {
                        bookingType === 'daily' ?
                          <span>day</span>
                          :
                          <span>{data?.durationLength == 1 ? 'month' : 'months'}</span>
                      }
                    </p>
                  </div>
                  <p className={baseClass}>
                    <span>Rent</span>
                    <span className='text-gray-500'>#{formatPrice(data?.rent) || 'NA'}
                    </span>
                  </p>
                  <p className={baseClass}>
                    <span>Reservation Fee</span>
                    <span className='text-gray-500'>{`#${formatPrice(data?.fee)}` || 'NA'}</span>
                  </p>
                  <p className={baseClass}>
                    <span>VAT</span>
                    <span className='text-gray-500'>{`#${formatPrice(data?.vat)}` || 'NA'}</span>
                  </p>
                </>
            }

        </div>

        <div 
          onClick={() => setRequestData(prev => ({...prev, openDuration: false}))}
          className='flex flex-col gap-6 mt-2 p-2'>

          {
            responseData?.proceed ? 
              <>
                <p className={baseClass}>
                  <span>Total</span>
                  <span className=''>#{formatPrice(data?.total) || 'NA'}</span>
                </p>
            
                <button
                  role="send request"
                  disabled={error?.length ? Boolean(error) : (isLoading && isLoading)}
                  onClick={sendRequest}
                  className={`${(!isLoading && !error?.length) ? "bg-blue-700 hover:bg-blue-600 active:bg-blue-700" : "bg-gray-500"} ${isLoading ? 'animate-pulse' : 'animate-none'} ${error?.length ? 'bg-red-500' : ''} p-4 transition-all text-white rounded-md w-full`}
                  >
                  {
                    error?.length ? (error?.substring(0, 25)+'...') :
                    isLoading ? 'In Progress...' : 'Send request'
                  }
                </button>
              </>
              : null
          }

        </div>
      </>

      </article>

  )
}

