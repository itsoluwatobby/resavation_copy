"use client"

import { createContext, useState, useEffect } from 'react'
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { fetchUnreadMessages } from '../lib/fetchUnreadMessages'
import { usersDB } from '../lib/firebase'
import { doc, getDoc } from '@firebase/firestore'

export const ResavationDataContext = createContext({})

export const ResavationAppProvider = ({ children }) => {
  const axiosPrivate = useAxiosPrivate()
  const [credentials, setCredentials] = useState()
  const [apartmentProfileData, setApartmentProfileData] = useState({})
  const [guestUserInfo, setGuestUserInfo] = useState({})
  const [revalidate, setRevalidate] = useState(0)
  
  const  currentUserEmail = typeof window !== 'undefined' ? localStorage.getItem("user_email") : null;
  const [currentUserInfo, setCurrentUserInfo] = useState({})
  const [reloadOnError, setReloadOnError] = useState({
    error: false, reload: 0
  })
  const [isChatPageOpened, setIsChatPageOpened] = useState({ 
    isOpen: (typeof window !== "undefined" ? JSON.parse(localStorage.getItem('chatOpened')) : null) || false, 
    conversationId: '' 
  })

  useEffect(() => {
    let isMounted = true
    let timerId;
    if(isMounted && reloadOnError?.error) {
      timerId = setTimeout(() => {
        setReloadOnError(prev => (
          { ...prev, error: false, reload: reloadOnError?.reload + 1 }
        ))
      }, 10000)
    }
    return () => {
      isMounted = false
      clearTimeout(timerId)
    }
  }, [reloadOnError?.error])

  useEffect(() => {
    let isMounted = true
    const getUser = async() => {
      try {
        const res = await axiosPrivate.post(`/user/profile/get-user?email=${currentUserEmail}`)
        const userDocRef = doc(usersDB, "chatUsers", res?.data?.email)
        const getUserDoc = await getDoc(userDocRef)
        const rest = getUserDoc.data()
        const unreadCount = await fetchUnreadMessages(currentUserEmail, rest?.chatIds) 
        setCurrentUserInfo(prev => (
          {...prev, notification: unreadCount?.length, ...res?.data, ...rest }
        ))
      }
      catch(error){
        setReloadOnError(prev => ({ ...prev, error: true }))
      }
    }
    (isMounted && currentUserEmail) ? getUser() : null

    return () => {
      isMounted = false
    }
  }, [currentUserEmail, reloadOnError?.reload, revalidate]);


  const resavationData = {
    apartmentProfileData, setApartmentProfileData, isChatPageOpened, setIsChatPageOpened, 
    guestUserInfo, setGuestUserInfo, currentUserInfo, setCurrentUserInfo, credentials, 
    setCredentials, setRevalidate
  }

  return (
    <ResavationDataContext.Provider value={resavationData}>
      {children}
    </ResavationDataContext.Provider>
  )
}