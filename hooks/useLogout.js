"use client"

import { sub } from 'date-fns'
import { useResavationAppProvider } from '../context/useResavationAppProvider'
import { usersDB } from '../lib/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { SuccessStyle } from '../lib/helperFunction'

/**
 * @description logout hook
 * @returns the logout function
 */
export const useLogout = () => {
  const { currentUserInfo, setCurrentUserInfo, setCredentials, setGuestUserInfo, setIsChatPageOpened, setApartmentProfileData } = useResavationAppProvider()
  const router = useRouter()

  const userLogout = async() => {
    try{
      const emailId = currentUserInfo?.emailId
      const convoIds = currentUserInfo?.conversationIds
      const userDocRef = doc(usersDB, "chatUsers", emailId)
      const date = sub(new Date(), { minutes: 0 }).toISOString() 
      if(convoIds?.length){
        await Promise.all(convoIds?.map(async(convoId) => {
          const conversationRef = doc(usersDB, "ChatsDB", convoId)
          const allConversation = await getDoc(conversationRef)
          const conversationsPerId = allConversation.data()?.conversations?.map(conversation => {
            const  { conversationState, adminId, ...rest } = conversation
            const isGuestUser = rest?.members?.find(email => email !== adminId)
            const adminChatOpened = adminId === emailId ? false : conversationState?.adminChatOpened
            const guestChatOpened = isGuestUser === emailId ? false : conversationState?.guestChatOpened
            const updatedTargetConversation = {
              ...rest, conversationState: { 
                ...conversationState, adminChatOpened, guestChatOpened,
                isChatOpened: adminChatOpened && guestChatOpened, 
              }
            }
            return updatedTargetConversation
          })
          await updateDoc(conversationRef, {
            updatedAt: new Date().toString(), conversations: [...conversationsPerId]
          })
        }))
      }
      if(emailId){
        await updateDoc(userDocRef, { lastSeen: date, isOnline: false, updatedAt: new Date()?.toString() })
      }
      setCredentials({})
      setCurrentUserInfo({})
      setGuestUserInfo({})
      setIsChatPageOpened({ isOpen: false, conversationId: '' })
      setApartmentProfileData({})
      clearLocalStorage()
      toast.success('Successfully logged out', SuccessStyle) 
      router.push('/login')
    }
    catch(error){
      console.log(error)
      clearLocalStorage()
      toast.success('Successfully logged out', SuccessStyle)
      router.push('/login')
    }
  }

  return userLogout
}

function clearLocalStorage(){
  if(typeof window !== 'undefined'){
    localStorage.setItem('chatOpened', JSON.stringify(false))
    localStorage.removeItem('loggedIn_User')
    localStorage.removeItem('user_email')
    localStorage.removeItem('user_token')
    localStorage.removeItem('user_refresh')
  }
}
