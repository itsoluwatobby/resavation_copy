"use client"

import ChatBody from './components/ChatBody';
import ChatBase from  './components/ChatBase';
import ChatBodyNav from  './components/ChatBodyNav';

import Message_page from  './components/Message_page';
import PhotoInputPreview from  './components/PhotoInputPreview';
import React, { useCallback, useState, useEffect, useRef } from 'react';

import { ErrorStyle, returnObjectOrString } from '../../lib/helperFunction';
import { useResavationAppProvider } from '../../context/useResavationAppProvider';
import { toast } from 'react-hot-toast';

import { nanoid } from "nanoid";
import { useSearchParams, useRouter } from 'next/navigation';

import { usersDB } from '@/lib/firebase';
import { doc, setDoc, getDoc, updateDoc, onSnapshot, arrayUnion } from '@firebase/firestore';
import { ChatLoading } from './components/skeletonChat/ChatLoading';

import { LoadingContent } from './components/skeletonChat/LoadingContent';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import Image from 'next/image';
import { SkeletonNav } from './components/skeletonChat/SkeletonNav';

export default function page() {
  const axiosPrivate = useAxiosPrivate()
  const { isChatPageOpened, currentUserInfo, setGuestUserInfo, setRevalidate } = useResavationAppProvider();
  
  const [guestUser, setGuestUser] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  
  const searchParams = useSearchParams();
  const guestUserEmail = searchParams.get('email');
  const currentUserEmail = typeof window !== "undefined" ? localStorage.getItem('user_email') : null;
  
  const [error, setError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [hideComponents, setHideComponents] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [isLoadingCreateConvo, setIsLoadingCreateConvo] = useState(false);

  const [presentConversation, setPresentConversation] = useState({});
  const [userConversations, setUserConversations] = useState([])
  const [prevChatId, setPrevChatId] = useState([])

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [editMessage, setEditMessage] = useState({})
  const [isMessageReferenced, setIsMessageReferenced] = useState({})
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const [imageUrl, setImageUrl] = useState(null)
  const [photoInput, setPhotoInput] = useState([]);
  const [closePreview, setClosePreview] = useState(false)
  
  const [isTyping, setIsTyping] = useState(false)
  const [selectWatcher, setSelectWatcher] = useState('NIL')
  const [reload, setReload] = useState(0)

  const router = useRouter()
  const inputRef = useRef();

  const RELOAD_TIMER = 10_000

  const scrollRef = useCallback((node) => {
    node ? node.scrollIntoView({ behavior: 'smooth' }) : null
  }, [])

  // useEffect(() => {
  //   if(!currentUserInfo?.pid){
  //     router.push('/login')
  //   }
  // }, [])

  // reload on error
  useEffect(() => {
    let timerId;
    if(!error && !currentUser?.emailId && !guestUser?.emailId && reload <= 5){
      timerId = setTimeout(() => {
        setReload(prev => prev + 1)
      }, RELOAD_TIMER);
    }
    return () => {
      clearTimeout(timerId)
    }
  }, [error, currentUser, guestUser])

  useEffect(() => {
    if(!guestUserEmail && currentUserInfo){
      setCurrentUser({...currentUserInfo})
    }
  }, [currentUserInfo])

  useEffect(() => {
     let isMounted = true
    const getCurrentUser = async() => {
      if(!guestUserEmail) return
      setIsLoading(true)
      try{
        // if(!guestUserEmail) throw new Error('Guest User Email Required')
        if(currentUserEmail === guestUserEmail) throw new Error('You can\'t chat with yourself, Please provide guest email')
        
        const docRef = doc(usersDB, "chatUsers", currentUserEmail)
        const guestDocRef = doc(usersDB, "chatUsers", guestUserEmail)
        const userDoc = await getDoc(docRef)
        const getUserDoc = userDoc.data()
        const guestDoc = await getDoc(guestDocRef)
        const guestUserDoc = guestDoc.data()

        let foundConversation;
        foundConversation = await Promise.all(getUserDoc?.conversationIds?.map(async(id) => {
          const chatsDBDocRef = doc(usersDB, "ChatsDB", id)
          const foundConvo = await getDoc(chatsDBDocRef)
          if(!foundConvo.exists()) return null
          const target = foundConvo.data()
          const targetConvo = target?.conversations
            if(targetConvo?.length){
              if(target?.admin?.id === id && target?.admin.email === currentUserEmail){
                // for creating new or check if a prev existed
                  const exactConvo = targetConvo?.find(eachConversation => eachConversation?.members[1] === guestUserEmail)
                  if(exactConvo) return exactConvo
                  else return id
              }
              else{
                const exactConvo = targetConvo?.find(eachConversation => eachConversation?.members[1] === currentUserEmail)
                return exactConvo
              }
            }
            else return id
          })
        )
        foundConversation = returnObjectOrString(foundConversation, guestUserEmail)
        // checks if loggedInUser details already contains a firstName or DisplayPicture
        if(!getUserDoc?.firstName?.length || !getUserDoc?.displayPic?.length){
          const user = await axiosPrivate.post(`/user/profile/get-user?email=${currentUserEmail}`)
          await updateDoc(doc(usersDB, 'chatUsers', currentUserEmail), {
            displayPic: user?.data?.imageUrl, firstName: user?.data?.firstName,
            lastName: user?.data?.lastName, updatedAt: new Date().toString(),
          })
          .then(async() => {
            const updatedInfo = await getDoc(docRef) 
            setCurrentUser(updatedInfo.data())
          })
        }
        else setCurrentUser(getUserDoc)

        if(guestDoc.exists()){
          // check if guestUser details already contains a firstName or DisplayPicture
          let conversationIds;
          if(!foundConversation?.leftChat?.left){
            const removedConflictingIds = guestUserDoc?.conversationIds.filter(id => id !== getUserDoc?.pid)
            conversationIds = foundConversation !== null ?  [...guestUserDoc?.conversationIds] : [...removedConflictingIds, getUserDoc?.pid]
          }
          else conversationIds = [...guestUserDoc?.conversationIds]
          if (!guestUserDoc?.firstName?.length || !guestUserDoc?.displayPic?.length){
            const guestUser = await axiosPrivate.post(`/user/profile/get-user?email=${guestUserEmail}`)
            await updateDoc(doc(usersDB, 'chatUsers', guestUserEmail), {
              displayPic: guestUser?.data?.imageUrl, firstName: guestUser?.data?.firstName,
              lastName: guestUser?.data?.lastName, updatedAt: new Date().toString(),
              conversationIds,
            })
            .then(async() => {
              const updatedInfo = await getDoc(guestDocRef) 
              setGuestUser(updatedInfo.data())
            })
          }
          else {
            await updateDoc(doc(usersDB, 'chatUsers', guestUserEmail), {
              updatedAt: new Date().toString(),
              conversationIds,
            })
            .then(async() => {
              const updatedInfo = await getDoc(guestDocRef) 
              setGuestUser(updatedInfo.data())
            })
          }
        }
        else{
          const pid = nanoid(15)
          const guestUser = await axiosPrivate.post(`/user/profile/get-user?email=${guestUserEmail}`)
          await setDoc(doc(usersDB, "chatUsers", guestUserEmail), {
            emailId: guestUserEmail, firstName: guestUser?.data?.firstName, pid,
            lastName: guestUser?.data?.lastName, displayPic: guestUser?.data?.imageUrl, 
            updatedAt: new Date().toString(), isOnline: false, createdAt: new Date().toString(),
            conversationIds: [pid], lastMessage: [],
            chatIds: [], presentChatId: ''
          })
          .then(async() => {
            await setDoc(doc(usersDB, 'ChatsDB', pid), {
              admin: {
                email: guestUserEmail,
                id: pid
              }, conversations: [], 
              createdAt: new Date().toString(), 
              updatedAt: new Date().toString(), 
            })
            const updatedInfo = await getDoc(guestDocRef) 
            setGuestUser(updatedInfo.data())
          })
        }
      }
      catch(error){
        const errorMessage = error?.response?.data?.message ? error?.response?.data?.message : error?.message;
        if(error?.name === "FirebaseError" && error?.code === "unavailable"){
          let msg = "PLease check your network"
          setError(msg)
          toast.error(msg, ErrorStyle)
        }
        else{
          setError(errorMessage)
          toast.error(errorMessage, ErrorStyle)
        }
      }
      finally{
        setIsLoading(false)
      }
    }
    if(isMounted && currentUserInfo?.pid && selectWatcher === 'NIL') getCurrentUser()
    return () => {
      isMounted = false
    }
  }, [reload, selectWatcher])

  // create new conversation or get old conversation
  useEffect(() => {
    let isMounted = true
    const createConversation = async() => {
      if(!guestUserEmail) return
      setIsLoadingCreateConvo(true)
      try{
        // find conflict before creating a new one
        let foundConversation; 
          foundConversation = await Promise.all(currentUser?.conversationIds?.map(async(id) => {
            const chatsDBDocRef = doc(usersDB, "ChatsDB", id)
            const foundConvo = await getDoc(chatsDBDocRef)
            if(!foundConvo.exists()) return null
            const target = foundConvo.data()
            const targetConvo = target?.conversations
            if(targetConvo?.length){
              if(target?.admin?.id === id && target?.admin.email === currentUserEmail){
                  const exactConvo = targetConvo?.find(eachConversation => eachConversation?.members[1] === guestUserEmail)
                  if(exactConvo) return exactConvo
                  else return id
              }
              else{
                const exactConvo = targetConvo?.find(eachConversation => eachConversation?.members[1] === currentUserEmail)
                return exactConvo
              }
            }
            else return id
          })
        )
        foundConversation = returnObjectOrString(foundConversation, guestUserEmail)
    
        if(typeof foundConversation === 'string'){
          const newConvoId = foundConversation
          const conversationMembers = [currentUser?.emailId, guestUser?.emailId]
          const newConvo = {
            convoId: newConvoId, chatId: nanoid(12), members: conversationMembers, 
            adminId: currentUserEmail, createdAt: new Date().toString(),
            leftChat: { left: false, emailId: '' },
            conversationState: { 
              adminChatOpened: true, guestChatOpened: false, 
              isChatOpened: false, unread: { senderId: '', count: 0 }
            }
          }
          await updateDoc(doc(usersDB, "ChatsDB", newConvoId), {
            updatedAt: new Date().toString(),
            conversations: arrayUnion({ ...newConvo })
          })
          const removedConflictingIds = guestUser?.conversationIds.filter(id => id !== newConvoId)
          const removedConflictingChatIds = guestUser?.chatIds.filter(id => id !== newConvo?.chatId)
          const removedConflictingChatIdsForCurrent = currentUser?.chatIds.filter(id => id !== newConvo?.chatId)
          await updateDoc(doc(usersDB, "chatUsers", currentUserEmail), {
            chatIds: [...removedConflictingChatIdsForCurrent, newConvo?.chatId],
            presentChatId: newConvo?.chatId,
            updatedAt: new Date().toString(),
          })
          await updateDoc(doc(usersDB, "chatUsers", guestUserEmail), {
            conversationIds: [...removedConflictingIds, newConvoId], 
            chatIds: [...removedConflictingChatIds, newConvo?.chatId], presentChatId: newConvo?.chatId,
            updatedAt: new Date().toString(),
          })
          await setDoc(doc(usersDB, 'messages', newConvo?.chatId), { 
            uuid: nanoid(12), messages: [],
            createdAt: new Date().toString(), 
            updatedAt: new Date().toString(), 
          })
          // await setDoc(doc(usersDB, 'chatEvents', newConvo?.chatId), { 
          //   events: []
          // })
          const { firstName, lastName, displayPic, lastSeen, isOnline } = guestUser
          const newConversation = {
            ...newConvo, lastSeen, isOnline,
            name: `${firstName} ${lastName}`,
            displayPic, lastMessage: {}
          }
          if(newConversation?.name){ 
            setPresentConversation(newConversation)
            setGuestUser(prev => ({...prev, convoId: newConvoId, presentChatId: newConvo?.chatId}))
            setCurrentUser(prev => ({...prev, presentChatId: newConvo?.chatId}))
            setGuestUserInfo({...newConversation, presentChatId: newConvo.chatId})
          }
          else return
        }
        else if(typeof foundConversation === 'object') {
          const { firstName, lastName, lastMessage, displayPic, lastSeen, isOnline } = guestUser
          const updateRef = doc(usersDB, 'ChatsDB',  foundConversation?.convoId)
          const messageRef = doc(usersDB, 'messages',  foundConversation?.chatId)
          const { chatId, conversationState, adminId } = foundConversation
          const conversationsDoc = await getDoc(updateRef)
          const otherConversations = conversationsDoc.data()?.conversations?.filter(convo => convo?.chatId !== chatId)
          const isGuestUser = foundConversation?.members?.filter(email => email !== adminId)
          const adminChatOpened = adminId === currentUserEmail ? true : conversationState?.adminChatOpened
          const guestChatOpened = isGuestUser[0] === currentUserEmail ? true : conversationState?.guestChatOpened
          const count = (adminChatOpened && guestChatOpened) ? 0 : conversationState?.unread?.count
          const messageDoc = await getDoc(messageRef)
          const chatMessage = messageDoc.data()
          const unreadMessages = chatMessage?.messages?.filter(msg => !msg?.isMessageRead)
          const senderId = unreadMessages?.length ? unreadMessages[0]?.senderId : ''
          const updatedTargetConversation = {
            ...foundConversation, 
            conversationState: { 
              adminChatOpened, guestChatOpened, 
              isChatOpened: adminChatOpened && guestChatOpened, 
              unread: { senderId, count }
            }
          }
          await updateDoc(updateRef, {
            updatedAt: new Date().toString(),
            conversations: [updatedTargetConversation, ...otherConversations],
          })
          foundConversation = { ...updatedTargetConversation }
          const last = lastMessage?.find(las => las?.chatId === chatId)
          const newConversation = {
            ...foundConversation, lastSeen,isOnline,
            presentChatId: foundConversation?.chatId,
            name: `${firstName} ${lastName}`,
            displayPic, lastMessage: last
          }
          if(newConversation?.name){
            setPresentConversation(newConversation)
            setGuestUser(prev => ({...prev, presentChatId: foundConversation?.chatId}))
            setCurrentUser(prev => ({
              ...prev, presentChatId: foundConversation?.chatId, 
              unread: {...foundConversation?.conversationState?.unread}
            }))
            setGuestUserInfo(
              {...newConversation, unread: {...foundConversation?.conversationState?.unread}}
            )
            currentUserInfo?.notification >= 1 ? setRevalidate(prev => prev + 1) : null
          }
          else return
        }
        else if(foundConversation === null){
          const newConvoId = currentUser?.pid
          const conversationMembers = [currentUser?.emailId, guestUser?.emailId]
          const newConvo = {
            convoId: currentUser?.pid, chatId: nanoid(12), members: conversationMembers, 
            adminId: currentUserEmail, createdAt: new Date().toString(),
            leftChat: { left: false, emailId: '' },
            conversationState: { 
              adminChatOpened: true, guestChatOpened: false, 
              isChatOpened: false, unread: { senderId: '', count: 0 }
            }
          }
          await updateDoc(doc(usersDB, "ChatsDB", newConvoId), {
            updatedAt: new Date().toString(),
            conversations: arrayUnion({ ...newConvo })
          })
          const removedConflictingIds = guestUser?.conversationIds.filter(id => id !== newConvoId)
          await updateDoc(doc(usersDB, "chatUsers", currentUserEmail), {
            chatIds: [...guestUser?.chatIds, newConvo?.chatId],
            updatedAt: new Date().toString(), presentChatId: newConvo?.chatId
          })
          await updateDoc(doc(usersDB, "chatUsers", guestUserEmail), {
            conversationIds: [...removedConflictingIds, newConvoId], 
            chatIds: [...guestUser?.chatIds, newConvo?.chatId],
            updatedAt: new Date().toString(), presentChatId: newConvo?.chatId
          })
          await setDoc(doc(usersDB, 'messages', newConvo?.chatId), { 
            uuid: nanoid(12), messages: [],
            createdAt: new Date().toString(), 
            updatedAt: new Date().toString(), 
          })
          // await setDoc(doc(usersDB, 'chatEvents', newConvo?.chatId), { 
          //   chatId: '', isTyping: false, 
          // })
          const { firstName, lastName, displayPic, lastSeen } = guestUser
          const newConversation = {
            ...newConvo, lastSeen,
            name: `${firstName} ${lastName}`,
            displayPic, lastMessage: {}
          }
          setPresentConversation(newConversation)
          setGuestUser(prev => ({...prev, presentChatId: newConvo?.chatId}))
          setCurrentUser(prev => ({...prev, presentChatId: newConvo?.chatId}))
          setGuestUserInfo({...newConversation})
        }
      }
      catch(error){
        const errorMessage = error?.response?.data?.message ? error?.response?.data?.message : error?.message;
        setError(errorMessage)
        toast.error(errorMessage, ErrorStyle)
      }
      finally{
        setIsLoadingCreateConvo(false)
      }
    }
    if(!isLoading && isMounted && guestUser?.emailId && selectWatcher === 'NIL') createConversation()

    return () => {
      isMounted = false
    }
  }, [guestUser?.emailId, isLoading, guestUserEmail, selectWatcher])

  useEffect(() => {
    let timerId;
    if(error?.length){
      timerId = setTimeout(() => {
        setError('')
      }, 15000);
    }
    return () => {
      clearTimeout(timerId)
    }
  }, [error])

  // getMessages
  useEffect(() => {
    if(presentConversation?.chatId){
      try{
        const messageRef = doc(usersDB, 'messages', presentConversation?.presentChatId)
        onSnapshot(messageRef, (snapshot) => {
          if(!snapshot.exists()) return
          const messages = snapshot.data()
          setMessages([...messages.messages])
        })
      }
      catch(error){
        const errorMessage = error?.response?.data?.message ? error?.response?.data?.message : error?.message;
        setMessageError(errorMessage)
      }
    }
  }, [presentConversation?.chatId])

  useEffect(() => {
    if(!isLoading && !isLoadingCreateConvo && !error?.length) setHideComponents(true)
    else setHideComponents(false)
  }, [isLoading, isLoadingCreateConvo, messages?.length, error])

  const sortedMessages = messages.slice().sort((a, b) => a?.date.localeCompare(b?.date))

  let chatContent;

  isLoading || isLoadingCreateConvo 
      ? chatContent = <ChatLoading />
      : error ? chatContent = (
        <div className='w-full h-full pt-10 flex flex-col items-center'>
          <p className='text-red-500 text-xl whitespace-pre-wrap font-bold'>{error}</p>
        </div>
      ) 
      : chatContent = (
        <>
           <div className={`relative h-full md:mt-0 mt-2 md:flex-grow md:w-full ${isChatPageOpened.isOpen ? 'flex' : 'hidden md:flex'} flex-col pr-0 pb-3`}>
            
            <>
            {
              (!presentConversation?.chatId || hideComponents) ? (
                <>
                  {
                    isLoadingChat ? 
                      <>
                        <SkeletonNav />
                      </>
                    :
                    (
                      presentConversation?.chatId ?
                        <ChatBodyNav 
                          setMessages={setMessages}
                          presentConversation={presentConversation}
                          setPresentConversation={setPresentConversation}
                        />
                      : null
                    )
                  } 

                  <section 
                    onClick={() => setMessageError('')}
                    className={`chatScroll flex-auto relative w-full flex flex-col gap-3 overflow-y-scroll p-8 pt-3 pl-2 pr-2 border border-gray-100 border-r-0 border-l-0 border-t-0 border-b-[16px]`}>
                      {
                        isLoadingChat ? (
                          <>
                            <LoadingContent />
                          </> 
                        )
                        : messageError ?
                        (
                          <div className='w-full h-full pt-10 flex flex-col items-center'>
                            <p className="text-center m-auto text-red-400 md:m-auto whitespace-pre-wrap">{messageError}</p>
                          </div>
                        )
                        : 
                        (
                          (sortedMessages?.length && (presentConversation?.chatId === messages[0]?.chatId)) ? (
                            sortedMessages?.map(message => (
                              <ChatBody key={message?.id}
                                message={message} setShowEmojiPicker={setShowEmojiPicker}
                                currentUser={currentUser} setCurrentUser={setCurrentUser} 
                                scrollRef={scrollRef} messageError={messageError} 
                                setMessageError={setMessageError} inputRef={inputRef}
                                editMessage={editMessage} setEditMessage={setEditMessage} 
                                messages={messages} setClosePreview={setClosePreview}
                                setMessages={setMessages} setImageUrl={setImageUrl} 
                                setIsMessageReferenced={setIsMessageReferenced}
                              />
                            ))
                          ) 
                          : 
                          (!presentConversation?.chatId || !isChatPageOpened?.isOpen) ?
                            <figure className='m-auto w-fit h-10'>
                              <Image
                                width={150}
                                height={80}
                                src={'/assets/resavation-logo-3x.png'}
                                alt='Resavation...'
                                className='w-full h-full object-cover'
                              />
                              <span className='animate-pulse'>...</span>
                            </figure>
                          :
                          <p className='text-center m-auto text-gray-600'>Empty Chat!</p>
                        )
                      }
                  </section>
                  <> 
                  {
                    <>
                      {
                        photoInput?.length ?
                          <PhotoInputPreview 
                            photoInput={photoInput} setPhotoInput={setPhotoInput}
                            closePreview={closePreview} setClosePreview={setClosePreview}
                          />
                        : 
                        null
                      }
                      {
                        presentConversation?.chatId ?
                          <ChatBase 
                            showEmojiPicker={showEmojiPicker} setShowEmojiPicker={setShowEmojiPicker}
                            currentUser={currentUser} guestUser={guestUser} inputRef={inputRef}
                            message={message} setMessageError={setMessageError} setCurrentUser={setCurrentUser}
                            presentConversation={presentConversation} setMessage={setMessage} 
                            isTyping={isTyping} setIsTyping={setIsTyping} setMessages={setMessages} 
                            editMessage={editMessage} setEditMessage={setEditMessage}
                            photoInput={photoInput} setPhotoInput={setPhotoInput} 
                            isMessageReferenced={isMessageReferenced} setClosePreview={setClosePreview}
                            setIsMessageReferenced={setIsMessageReferenced}
                          />
                        : null
                      }
                    </>  
                  }
                  </>
                </>
              )
              : 
              // <p className='font-bold text-xl tracking-wide font-sans first-letter:text-4xl m-auto'>
                // Resavation
                <figure className='m-auto w-fit h-10'>
                  <img 
                    // width={150}
                    // height={80}
                    src={'../../image/resavation-logo-3x.png'}
                    alt='Resavation...'
                    className='w-full h-full object-cover'
                  />
                  <span className='animate-pulse'>...</span>
                </figure>
              // </p>
            }
            </>
          </div>

          <Message_page  
            userConversations={userConversations} setUserConversations={setUserConversations}
            presentConversation={presentConversation} setPresentConversation={setPresentConversation}
            setIsLoadingChat={setIsLoadingChat} setMessages={setMessages} inputRef={inputRef}
            isTyping={isTyping} setIsTyping={setIsTyping} currentUser={currentUser} 
            setCurrentUser={setCurrentUser} isLoadingCreateConvo={isLoadingCreateConvo}
            guestUser={guestUser} setGuestUser={setGuestUser} prevChatId={prevChatId} setClosePreview={setClosePreview} setSelectWatcher={setSelectWatcher} isLoadingChat={isLoadingChat}
            setPrevChatId={setPrevChatId} setPhotoInput={setPhotoInput} setIsLoading={setIsLoading}
          />
        </>
      )
// ${isChatPageOpened.isOpen ? '' : 'h-full'} 
  return (
    <main className={`md:h-[90%] ${isChatPageOpened?.isOpen ? "maxscreen:h-[89%]" : "maxscreen:h-full"} maxscreen:flex-col flex md:flex-row-reverse md:align-top box-border md:flex-grow max-w-full`}>
      {chatContent}
    </main>
  )
}

// 