import React, { useState, useEffect } from 'react';
import { dateFormatter } from '../../lib/helperFunction';

export const CheckOption = ({ name, checkName, setCheckName, value, requestData, setRequestData }) => {
  const [currentDate, setCurrentDate] = useState('')
  const [revealDate, setRevealDate] = useState(false)
  const [message, setMessage] = useState('')

  const { bookingType, checkInDate, checkOutDate, isValidCheckInOrOut, duration } = requestData

  useEffect(() => {
    const presentDate = new Date();
    let minimumDate = new Intl.DateTimeFormat("en-US", {
      dayTime: "medium",
    }).format(presentDate);
    minimumDate = dateFormatter(minimumDate)
    setCurrentDate(minimumDate)
  }, [bookingType])

  useEffect(() => {
    /**
     * @params - checkInDate
     * extra date validation in case minDate limit fails | user enters date manually. 
     * Checks if user enters date before present date
     */
    if(checkInDate && checkName === 'checkInDate'){
      const previousDay = new Date().getTime() - 60 * 60 * 24 * 1000 // plus 1 day
      const userDateEntry = new Date(checkInDate).getTime()
      const estimatedDate = userDateEntry - previousDay
      const isAcceptedDate = new Date(estimatedDate + previousDay).getTime()
      isAcceptedDate < previousDay 
                      ? setRequestData(prev => ({...prev, isValidCheckInOrOut: false})) 
                              : setRequestData(prev => ({...prev, isValidCheckInOrOut: true}))
    }
    else if(isValidCheckInOrOut && checkInDate && bookingType === 'daily' && checkName === 'checkInDate'){
      const checkedInDate = new Date(checkInDate).getTime()
      const checkOutEntry = new Date(checkOutDate).getTime()
      const estimatedDate = checkOutEntry - checkedInDate 
      const isGreaterThanCheckedIn = new Date(estimatedDate + checkedInDate).getTime()
      isGreaterThanCheckedIn < checkedInDate 
                      ? setRequestData(prev => ({...prev, isValidCheckInOrOut: false})) 
                              : setRequestData(prev => ({...prev, isValidCheckInOrOut: true}))
    }
    else if(checkOutDate && bookingType === 'daily' && checkName === 'checkOutDate'){
      const checkedInDate = new Date(checkInDate).getTime()
      const checkOutEntry = new Date(checkOutDate).getTime()
      checkOutEntry < checkedInDate 
                      ? setRequestData(prev => ({...prev, isValidCheckInOrOut: false})) 
                              : setRequestData(prev => ({...prev, duration: '', isValidCheckInOrOut: true}))
    }
  }, [checkInDate, checkOutDate])

  useEffect(() => {
    if(!bookingType){
      setRevealDate(false)
      setMessage('')
      setCheckName('')
    }
  }, [bookingType])

  useEffect(() => {
    if(!isValidCheckInOrOut && checkInDate.length){
       setMessage('INVALID DATE')
    }
    else if(isValidCheckInOrOut && checkInDate.length){
      setMessage('')
    }
  }, [isValidCheckInOrOut, checkInDate])

  const handleChange = (event) => {
    const name = event.target.name
    const dateValue = event.target.value
    setRequestData(prev => ({...prev, [name]: dateValue}))
  }

  useEffect(() => {
    /**
     * set checkInDate + 1day as the min date for the checkOutDate
     * @params checkOutDate
     * set the max date with the duration set 
     */
    if(bookingType === 'daily' && checkInDate.length >= 1 && checkName === 'checkOutDate'){
      const checkOutMinDate = new Date(checkInDate).getTime() + 60 * 60 * 24 * 1000 // plus 1 day
      let minimumDate = new Intl.DateTimeFormat("en-US", {
        dayTime: "medium",
      }).format(checkOutMinDate);
      minimumDate = dateFormatter(minimumDate)
      setCurrentDate(minimumDate)
    }
    else if(bookingType === 'daily' && !checkInDate.length && checkName === 'checkOutDate'){
      setRevealDate(false)
      setCheckName('checkInDate')
      setMessage('CHECK-IN-REQUIRED')
    }
    else if(bookingType === 'daily' && checkName === 'checkInDate'){
      const presentDate = new Date();
      let minimumDate = new Intl.DateTimeFormat("en-US", {
        dayTime: "medium",
      }).format(presentDate);
      minimumDate = dateFormatter(minimumDate)
      setCurrentDate(minimumDate)
    }
  }, [bookingType, checkName, checkInDate, duration])

  const handleClick = (tagName) => {
    setMessage('')
    if(tagName == 'Check In'){
      setCheckName('checkInDate')
      setRevealDate(true)
    }
    else if(tagName == 'Check Out'){
      setCheckName('checkOutDate')
      setRevealDate(true)
    }
  }

  return (
    <div 
      onClick={() => handleClick(name)}
      className={`relative flex flex-col cursor-pointer rounded-md hover:opacity-90 active:opacity-100 transition-all ${bookingType === 'daily' ? 'rounded-tr-0 rounded-br-0' : 'rounded-tl-0 rounded-bl-0'} border border-t-0 border-b-0 border-l-0 ${(!isValidCheckInOrOut && value) ? 'border-red-500 bg-red-300 animate-pulse' : ''} border-r-1 w-full p-2 gap-2 border-gray-200`}>
      <p className={` ${(!isValidCheckInOrOut && value) ? 'text-red-500 font-mono' : ''}`}>{(message && name === 'Check In') ? message : (!isValidCheckInOrOut && name === 'Check In') ? message : (!isValidCheckInOrOut && name === 'Check Out') ? message  : name}</p>
      <label htmlFor='dateTime' className={`${revealDate ? 'scale-0' : 'scale-100'} transition-all text-gray-500 cursor-pointer w-fit`}>Add date</label>
      <input  
        type="date" name={checkName}
        id="dateTime" value={value}
        required min={currentDate}
        onChange={handleChange} 
        className={`absolute ${revealDate ? 'scale-100' : 'scale-0'} transition-all bottom-0 left-0 w-fit p-2 pt-0.5 rounded-sm bg-inherit border-none focus:outline-none`}
      />
    </div>
  )
}
