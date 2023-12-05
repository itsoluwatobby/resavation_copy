"use client"
import React, { useState, useCallback, useEffect } from 'react'
import { format } from "timeago.js"
import { reduceTextLength, checkLength } from '../../../lib/helperFunction'
import { MdMoreHoriz } from 'react-icons/md'
import { BsCheck, BsCheckAll, BsTrash } from 'react-icons/bs'
import { doc, getDoc, updateDoc } from '@firebase/firestore'
import { ref, deleteObject } from '@firebase/storage'
import { usersDB, imageStorage } from '../../../lib/firebase';

export default function ChatBody({ message, messages, setMessages, currentUser, setCurrentUser, scrollRef, messageError, setMessageError, setClosePreview, setShowEmojiPicker, setImageUrl, setIsMessageReferenced, editMessage, setEditMessage, inputRef }) {
  const [viewMore, setViewMore] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [previewImage, setPreviewImage] = useState(false)
  const [deleteloading, setDeleteLoading] = useState(false)
  const [deleteError, setDeleteError] = useState(false)
  const [lastMessageInRoll, setLastMessageInRoll] = useState({})
  const [buttonExpired, setButtonExpired] = useState('ELAPSED')
  const EDITABLE_ALLOWED_TIME = 3 * 60 * 60 * 1000
  
  const chatButton = useCallback((name='GENERAL') => {
    return (
      `${(message?.senderId === currentUser?.emailId && name === 'PRIVATE' && lastMessageInRoll?.id === message?.id && buttonExpired === 'ALLOWED') ? 'block' : name === 'GENERAL' ? 'block' : 'hidden'} p-0.5 hover:bg-gray-400 transition-all acitve:bg-gray-200 bg-gray-200 rounded-sm shadow-sm text-[13px] se mobile:text-sm font-sans focus:outline-none border-none`
    )
  }, [lastMessageInRoll?.id, buttonExpired])

  // extract last message
  useEffect(() => {
    if(messages?.length < 1) return
    const lastMessage = messages[messages?.length - 1]
    setLastMessageInRoll(lastMessage)
  }, [messages?.length])

  useEffect(() => {
    if(!lastMessageInRoll?.id) return
    const { date } = lastMessageInRoll
    const realMessageTime = new Date(date).getTime()
    const allowedTime = realMessageTime + EDITABLE_ALLOWED_TIME
    const currentTime = new Date().getTime()
    if(allowedTime > currentTime) setButtonExpired('ALLOWED')
    else setButtonExpired('ELAPSED')
  }, [lastMessageInRoll?.id])

  const referenceMessage = (message) => {
    const { convoId, chatId, isMessageRead, referencedMessage, receiverId, ...rest } = message
    setEditMessage({})
    setIsMessageReferenced(rest)
    inputRef?.current?.focus()
    setOpenModal(false)
  }

  const edit = (message) => {
    setIsMessageReferenced({})
    setEditMessage(message)
    setOpenModal(false)
    inputRef?.current?.focus()
  }

  const deleteMessage = async(chatId, id, imageName=null, option='ALL') => {
    try{
      setDeleteLoading(true)
      const messageRef = doc(usersDB, 'messages', chatId)
      const userDocRef = doc(usersDB, 'chatUsers', currentUser?.emailId)
      const getMessageDoc = await getDoc(messageRef)
      const presentChatMessages = getMessageDoc.data()
      const otherMessages = presentChatMessages?.messages?.filter(msg => msg?.id !== id)
      if(option === 'ALL'){
        const otherLastMessages = currentUser?.lastMessage?.filter(msg => msg?.id !== id)
        await updateDoc(messageRef, {
          messages: [...otherMessages]
        })
        setMessages([...otherMessages])
        await updateDoc(userDocRef, {
          updatedAt: new Date().toString(), lastMessage: [...otherLastMessages]
        })
        setCurrentUser(prev => ({...prev, lastMessage: [...otherLastMessages]}))
      }
      else if(option === 'PART'){
        if(imageName == null) return
        const targetMessage = presentChatMessages?.messages?.filter(msg => msg?.id === id)
        const otherImages = targetMessage?.imageUrls?.filter(name => name !== imageName)
        const extractName = imageName?.split('chatImages%2F')[1]?.split('?alt')[0]
        const imageRef = ref(imageStorage, `resavationImages/chatImages/${extractName}`);
        deleteObject(imageRef)
        .then(async() => {
          const message = {...targetMessage, imageUrls: [...otherImages]}
          const allMessages = [...otherMessages, message]
          await updateDoc(messageRef, {
            updatedAt: new Date().toString(),
            messages: [...allMessages]
          })
          setMessages([...allMessages])
        })
      }
      setOpenModal(false)
    }
    catch(error){
      setDeleteError(true)
    }
    finally{
      setDeleteLoading(false)
    }
  }

  useEffect(() => {
    let timerId;
    if(messageError?.length || deleteError){
      timerId = setTimeout(() => {
        setDeleteError(false)
      }, 15000);
    }
    return () =>{
      clearTimeout(timerId)
    }
  }, [messageError, deleteError])

  // const enlargePhoto = (url) => {
  //   setTimeout(() => {
  //     setImageUrl(url)
  //   }, 1000);
  // }

  const chatContent = (
    <article
      ref={scrollRef}
      id={message?.id}
      onClick={() => {
        setShowEmojiPicker(false)
        setClosePreview(false)
        setMessageError('')
      }}
      className={`relative flex ${editMessage?.message ? (editMessage?.id === message?.id ? 'opacity-80' : '') : ''} flex-col max-w-[75%] min-w-[55%] md:text-xs mobile:text-sm p-1 pt-3.5 gap-1.5 ${message?.senderId === currentUser?.emailId ? 'self-end' : 'self-start'}`}
    >
      <p className={`${deleteError ? 'block' : 'hidden'} text-red-600 font-sans`}>
        Error deleting message
      </p>
      {
        (message?.message || message?.imageUrls?.length) ? (
          <div 
            onClick={() => setOpenModal(false)}
            className={`relative ${deleteloading ? 'animate-pulse' : 'animate-none'} ${message?.senderId === currentUser?.emailId ? 'bg-blue-700 rounded-br-none rounded-tl-none text-white' : 'bg-gray-200 rounded-bl-none  text-xs mobile:text-sm rounded-tr-none'} p-2.5 pl-1.5 pb-3 rounded-lg text-justify whitespace-pre-wrap w-full`}>

            {/* referenced message */}
            {
              message?.referencedMessage?.message ?
                <ReferencedMessage
                  message={message}
                  currentUser={currentUser}
                  referencedMessage={message?.referencedMessage}
                />
              : null
            }

            <p
              onClick={() => setViewMore(false)}
              onDoubleClick={() => setViewMore(true)}
              className='pb-1.5 cursor-default text-xs mobile:text-sm'
            >
              {(checkLength(message?.message) > 50 && !viewMore) ? reduceTextLength(message?.message, 50, 'word') : message?.message}
            </p>
            <button 
              onClick={() => setViewMore(true)}
              className={`absolute right-1 bottom-0.5 text-xs mobile:text-sm text-right ${(checkLength(message?.message) > 50 && !viewMore) ? 'block' : 'hidden'} cursor-pointer text-gray-300 hover:text-gray-200 transition-all active:text-gray-300 w-fit pt-2`}>continue reading...
            </button>
          </div>
        ) : null
      }

      <p>
        {message?.isMessageRead ?
          <BsCheckAll 
            className='absolute bottom-1 left-2 text-base text-green-700'
          />
          :
          <BsCheck 
            className='absolute bottom-1 left-2 text-base text-black'
          />  
        }
      </p>

      {/* messages modal */}
      <div className={`absolute top-5 ${openModal ? 'flex' : 'hidden'} z-50 rounded-sm bg-slate-300 ${message?.senderId === currentUser?.emailId ? '' : ''} right-1.5 flex-col gap-0.5 p-0.5 shadow-lg`}>

        <button 
          onClick={() => referenceMessage(message)}
          className={chatButton('GENERAL')}>reply
        </button>

        <button 
          onClick={() => edit(message)}
          className={chatButton('PRIVATE')}>edit
        </button>

        <button 
          onClick={() => deleteMessage(message?.chatId, message?.id)}
          className={chatButton('PRIVATE')}>
          delete
        </button>

      </div>

      {
        message?.imageUrls?.length ? 
          message.imageUrls.map((url, index) => (
            <figure key={index}
              className={`relative ${previewImage ? 'h-[75%] w-[80%]' : 'h-32 w-full'}  ${deleteloading ? 'animate-pulse' : 'animate-none'} transition-all rounded-md shadow-lg`}>
              <img src={url} loading='eager' alt='photo' className='relative h-full w-full object-cover rounded-md'/>

              {/* <button
                className={`grid place-centent-center p-1 rounded-sm absolute right-1 top-1 z-20 cursor-pointer hover:scale-[1.04] hover:opacity-80 transition-all active:scale-[1] active:opacity-100 bg-slate-700`}>
                <BsTrash 
                  onClick={() => deleteMessage(message?.chatId, message?.id, url, 'PART')}
                  className={`text-white`}
                />
              </button> */}

              {/* <div className={`absolute left-1 top-1 flex items-center gap-1`}>

                <button
                  title='Close preview'
                  onClick={() => setPreviewImage(false)}
                  className={`p-1 rounded-sm ${previewImage ? 'block' : 'hidden'} shadow-lg bg-slate-500 hover:opacity-80 active:opacity-100 transition-all`}
                >
                  <FiMinimize2 className='text-red-600' />
                </button>
              
                <button
                  title='Open preview'
                  onClick={() => setImageUrl(url)}
                  className={`p-1 rounded-sm ${previewImage ? 'hidden' : 'block'} shadow-lg bg-slate-700 hover:opacity-80 active:opacity-100 transition-all`}
                >
                  <FiMaximize2 className='text-white' />
                </button>

              </div> */}

            </figure>
            )
          ) : null
      }
          <p 
            className={`flex items-center text-[11px] mobile:text-[11px] justify-end gap-2 text-gray-800`
          }>
            <span className={`${message?.edited ? 'block' : 'hidden'}`}>edited</span>
            <span>{format(message?.date)}</span>
          </p>

      <MdMoreHoriz 
        onClick={() => setOpenModal(prev => !prev)}
        className={`absolute ${message?.senderId === currentUser?.emailId ? 'text-white' : 'text-black'} top-2 text-xl .5rem] cursor-pointer hover:opacity-80 right-2`}
      />

    </article>
  )

  return (
    <>
      {chatContent}
    </>
  )
}

const ReferencedMessage = ({ referencedMessage, message, currentUser }) => {
 
  return (
    // <a href={`#${referencedMessage?.id}`}>
    <article className={`mb-1.5 p-1 pt-0.5 pb-0.5 h-14 xt-xs se mobile:text-sm text-black rounded-md rounded-b-none w-full -top-[58px] left-0 right-1 flex items-center gap-0.5 transition-all ${message?.senderId === currentUser?.emailId ? 'bg-gray-300' : 'bg-slate-400'}`}>
      <div className='flex-auto bg-gray-200 w-full h-full p-1 pt-0.5 pb-0.5 rounded-sm flex flex-col shadow-inner'>
        <p className='se text-gray-800 text-[10px] bg-gray-300 w-fit font-medium rounded-md p-0.5 pt-0 pb-0'>. {referencedMessage?.displayName}
        </p>

      { 
        !referencedMessage?.imageUrls?.length ?
          <div className='relative h-full w-full rounded-sm text-[11px] mobile:text-xs'>
            <span>
              {reduceTextLength(referencedMessage?.message, 45, 'letter')}
            </span>
            <span className='absolute right-0 bottom-0.5  text-[9px] mobile:text-[10px] text-gray-600'>
              {format(referencedMessage?.date)}
            </span>
          </div>
          :
          <div className='relative h-full w-full rounded-sm text-xs mobile:text-xs flex items-center gap-2'>
            <span className='flex-none w-[75%]'>
              {
                reduceTextLength(referencedMessage?.message, 35, 'letter')
              }
            </span>
            <div className='flex-auto absolute right-0 -top-4 flex items-center gap-0.5'>
              {
                referencedMessage?.imageUrls?.slice(0,2)?.map((image, index) => (
                  <figure
                    key={index}
                    className='w-12 h-12 rounded-md border border-gray-300'
                  >
                    <img 
                      src={image}
                      loading='eager'
                      className='w-full h-full object-cover rounded-md'
                      alt='image'
                    />
                  </figure>
                ))
              }
            </div>
          </div>
      }

      </div>
    </article>
  )
}
