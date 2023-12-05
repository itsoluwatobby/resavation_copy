"use client"

import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react"
import { usersDB } from '@/lib/firebase';
import { ErrorStyle } from '@/lib/helperFunction';
import { Conversation } from './Conversation'
import { toast } from 'react-hot-toast';
import { doc, getDoc, onSnapshot, updateDoc } from '@firebase/firestore';
import { SkeletonMessages } from "./skeletonChat/SkeletonMessages"
import { useResavationAppProvider } from '../../../context/useResavationAppProvider'

export default function Message_page({ 
  userConversations, guestUser, setUserConversations, presentConversation, setPresentConversation, 
  currentUser, setCurrentUser, setIsLoadingChat, setMessages, isTyping, setIsTyping, 
  isLoadingCreateConvo, setGuestUser, prevChatId, setPrevChatId, inputRef, setClosePreview, 
  setPhotoInput, setSelectWatcher, isLoadingChat, setIsLoading
}){
  const {isChatPageOpened, currentUserInfo, setIsChatPageOpened, setGuestUserInfo, setRevalidate} = useResavationAppProvider()
  const [isLoadingConversation, setIsLoadingConversation] = useState(false);
  const currentUserEmail = typeof window !== "undefined" ? localStorage.getItem('user_email') : null;
  const [conversationError, setConversationError] = useState('');
  const [error, setError] = useState('');
  const router = useRouter()
  
  // make the current conversation the latest chat
  useEffect(() => {
    if(isTyping){
      const otherConversations = userConversations?.filter(conversation => conversation?.chatId !== presentConversation?.chatId)
      setUserConversations([presentConversation, ...otherConversations])
    }
  }, [isTyping])

  useEffect(() => {
    let isMounted = true
    const getUserConversations = async() => {
      let usersInConversation = []
      let usersConversationDetails= []
      try{
        setIsLoading(true)
        setIsLoadingConversation(true)
        await Promise.all(currentUser?.conversationIds?.map(async(conversationId) => {
          const conversationRef = doc(usersDB, "ChatsDB", conversationId)
          onSnapshot(conversationRef, async(conversations) => {
          // const conversations = await getDoc(conversationRef)
            if(!conversations.exists()) return
            conversations.data()?.conversations?.map(eachConversation => {
              if(!eachConversation?.members?.includes(currentUser?.emailId)) return
              const { members, leftChat } = eachConversation
              members?.filter(singleMember => {
                if(singleMember !== currentUser?.emailId){
                  if(leftChat?.left && leftChat?.emailId === currentUser?.emailId) return
                  if(!usersInConversation?.includes(singleMember)) {
                    usersInConversation.push(singleMember)
                    usersConversationDetails.push(eachConversation)
                  }else return
                } else return
              })
            })
            const formattedConversations = await Promise.all(usersInConversation?.map(async(memberEmail, index) => {
              const getUserRef = doc(usersDB, 'chatUsers', memberEmail)
              const getUserFromConvo = await getDoc(getUserRef)
              const messageRef = doc(usersDB, 'messages',  usersConversationDetails[index]?.chatId)
              const { firstName, lastName, lastMessage, displayPic, lastSeen, presentChatId } = getUserFromConvo.data()
              const messageDoc = await getDoc(messageRef)
              const chatMessage = messageDoc.data()
              const unreadMessages = chatMessage?.messages?.filter(msg => !msg?.isMessageRead)
              const senderId = unreadMessages?.length ? unreadMessages[0]?.senderId : ''
              const last = lastMessage?.find(las => las?.chatId === presentChatId)
              const formattedConversation = {
                ...usersConversationDetails[index], lastSeen, isOnline: guestUser?.isOnline,
                name: `${firstName} ${lastName}`, displayPic, lastMessage: last, presentChatId,
                conversationState: { 
                  ...usersConversationDetails[index]?.conversationState,
                  unread: { senderId, count: unreadMessages?.length } 
                }
              }  
              return formattedConversation
            }))
            formattedConversations?.length ? setUserConversations([...formattedConversations]) : null
          })
        }))
      }
      catch(error) {
        const errorMessage = error?.response?.data?.message ? error?.response?.data?.message : error?.message;
        setConversationError(errorMessage)
        toast.error(errorMessage, ErrorStyle)
      }finally {
        setIsLoadingConversation(false)
        setIsLoading(false)
      }
    }
    if(isMounted && !isLoadingCreateConvo && currentUser?.emailId) getUserConversations()

    return ()=> {
      isMounted = false
    }

  }, [isLoadingCreateConvo, currentUser?.emailId])

  // close previously opened chat
  useEffect(() => {
    let isMounted = true
    const closePreviousChat = async() => {
      if(prevChatId[0]?.chatId === prevChatId[1]?.chatId && prevChatId?.length <= 2) return
      try{
        const conversationRef = doc(usersDB, "ChatsDB", prevChatId[0]?.convoId)
        const conversationsDoc = await getDoc(conversationRef)
        const conversations = conversationsDoc.data()?.conversations
        const otherConversations = conversations?.filter(con => con?.chatId !== prevChatId[0]?.chatId)
        const targetConversation = conversations?.find(con => con?.chatId === prevChatId[0]?.chatId)
        const { conversationState, adminId, members } = targetConversation
        const isGuestUser = members?.find(email => email !== adminId)
        const adminChatOpened = adminId === currentUserEmail ? false : conversationState?.adminChatOpened
        const guestChatOpened = isGuestUser === currentUserEmail ? false : conversationState?.guestChatOpened
        const closedConversation = {
          ...targetConversation, 
          conversationState: { 
            adminChatOpened, guestChatOpened, isChatOpened: adminChatOpened && guestChatOpened, 
            unread: { senderId: conversationState?.unread?.senderId, count: conversationState?.unread?.count}
          }
        }
        await updateDoc(conversationRef, {
          updatedAt: new Date().toString(),
          conversations: [...otherConversations, closedConversation],
        })
        setPrevChatId([prevChatId[1]])
      }
      catch(error){
        const errorMessage = error?.response?.data?.message ? error?.response?.data?.message : error?.message;
        setError(errorMessage)
      }
    }
    (isMounted && prevChatId?.length >= 2) ? closePreviousChat() : null

    return () => {
      isMounted = false
    }
    
  }, [prevChatId?.length])

  const openConversation = async (chatId, convoId) => {
    try{
      setIsLoadingChat(true)
      setSelectWatcher('SWITCH_TRIGGERED')
      const messageRef = doc(usersDB, "messages", chatId)
      let foundConvo = userConversations?.find(conversation => conversation?.chatId === chatId)
      const conversationRef = doc(usersDB, "ChatsDB", convoId)
      const { conversationState, adminId } = foundConvo
      const conversationsDoc = await getDoc(conversationRef)
      typeof window !== "undefined" ? localStorage.setItem('chatOpened', JSON.stringify(true)) : null
      const otherConversations = conversationsDoc.data()?.conversations?.filter(convo => convo?.chatId !== chatId)
      const isGuestUser = foundConvo?.members?.find(email => email !== adminId)
      const adminChatOpened = adminId === currentUserEmail ? true : conversationState?.adminChatOpened
      const guestChatOpened = isGuestUser === currentUserEmail ? true : conversationState?.guestChatOpened
      const count = (adminChatOpened && guestChatOpened) ? 0 : conversationState?.unread?.count
      const senderId = count === 0 ? '' : conversationState?.unread?.senderId
      const { displayPic, lastMessage, lastSeen, presentChatId, name, isOnline, ...rest } = foundConvo
      const updatedTargetConversation = {
        ...rest, conversationState: { 
          adminChatOpened, guestChatOpened, unread: { senderId, count: count },
          isChatOpened: adminChatOpened && guestChatOpened, 
        }
      }
      await updateDoc(conversationRef, {
        updatedAt: new Date().toString(),
        conversations: [updatedTargetConversation, ...otherConversations],
      })
      foundConvo = { ...foundConvo, ...updatedTargetConversation }
      const clientEmail = foundConvo?.members?.filter(email => email != currentUser?.emailId)
      await updateDoc(doc(usersDB, "chatUsers", currentUserEmail), {
        presentChatId: chatId, updatedAt: new Date().toString(),
      })
      const getMessageDoc = await getDoc(messageRef)
      const userMessages = getMessageDoc.data()
      const unreadMessages = userMessages?.messages?.filter(msg => !msg?.isMessageRead)
      const previouslyReadMessages = userMessages?.messages?.filter(msg => msg?.isMessageRead)
      const markAsRead = unreadMessages?.map(msg => {
        const read = { ...msg, isMessageRead: foundConvo?.conversationState?.isChatOpened }
        return read
      })
      const sortedMessages = [...previouslyReadMessages, ...markAsRead]?.slice()?.sort((a,b) => a?.date?.localeCompare(b?.date))
      await updateDoc(messageRef, {
        messages: [...sortedMessages]
      })
      const getGuestUser = await getDoc(doc(usersDB, 'chatUsers', isGuestUser))
      setCurrentUser(prev => ({...prev, presentChatId: chatId}))
      setGuestUser({...getGuestUser.data(), presentChatId: chatId})
      setMessages([...sortedMessages])
      setPresentConversation({...foundConvo, presentChatId: chatId})
      setIsChatPageOpened({isOpen: true, conversationId: chatId})
      setGuestUserInfo({...foundConvo, presentChatId: chatId})
      currentUserInfo?.notification >= 1 ? setRevalidate(prev => prev + 1) : null
      setPhotoInput([])
      setIsTyping(false)
      inputRef?.current?.focus()
      const pushId = { chatId, convoId }
      setPrevChatId(prev => ([...prev, pushId]))
      router.replace(`/chat_page?email=${clientEmail}`, { scroll: false })
    }
    catch(error){
      const errorMessage = error?.response?.data?.message ? error?.response?.data?.message : error?.message;
      setError(errorMessage)
    }
    finally{
      setIsLoadingChat(false)
    }
  }

  let contentConversation;

  // isLoadingConversation ? contentConversation = (
  //   <SkeletonMessages />
  // ) : 
  conversationError ? contentConversation = (
    <div className='w-full h-full pt-10 flex flex-col items-center'>
      <p className="text-center m-auto text-red-400 md:m-auto whitespace-pre-wrap">{conversationError}</p>
    </div>
  ) : contentConversation = (
    userConversations?.length ? (
      userConversations?.map(conversation => (
        <Conversation 
          key={conversation?.chatId}
          conversation={conversation} setError={setError}
          openConversation={openConversation}
          userConversations={userConversations}
          presentConversation={presentConversation}
          setPresentConversation={setPresentConversation}
          setUserConversations={setUserConversations} 
          currentUser={currentUser} setCurrentUser={setCurrentUser}
          setSelectWatcher={setSelectWatcher}
          isLoadingChat={isLoadingChat}
        />
      )) 
    ) : (
        (!userConversations?.length && !isLoadingConversation
             && !isLoadingConversation && !error.length) 
                  ? <p 
                      className='md:w-[70%] text-lg text-xl text-center whitespace-pre-wrap font-sans first-letter:text-[2rem] flex flex-col capitalize m-auto'>Your messages will come up soon<span className="animate-pulse">...</span>
                      <sub className="self-end first-letter:text-lg text-xs after:content-['.'] after:font-bold font-medium">Resavation</sub>
                  </p>
                        :  <p className='text-center m-auto text-gray-600 md:m-auto shadow-lg'>No Messages</p> 
    )
  )

  return (
    <section 
      onClick={() => setClosePreview(false)}
      className={`chatHeights maxscreen:h-full text-xs p-5 pt-0 md:shadow-md md:flex-none md:z-20 md:min-w-[30%] lg:min-w-[25%] pl-0 pr-0 ${isChatPageOpened.isOpen ? 'hidden md:flex' : 'flex'} flex-col gap-2`}>
      <div className="flex-none h-10 bg-white w-full sticky z-20 top-0 md:top-[72px] md:pt-5 pt-12 pl-7 pb-10">
        <h2 
          title='Previous page' className="font-bold capitalize text-lg"
          onClick={() => router.push(-1)}
        >
            Messages
        </h2>
      </div>
      <div className="chatScroll flex-auto h-full pt-1.5 p-3 flex flex-col gap-2 overflow-y-scroll w-full">
        {contentConversation}
      </div>
    </section>
  )
}
