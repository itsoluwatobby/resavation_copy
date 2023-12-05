"use client"
import React, { useCallback, useState, useEffect, useRef } from 'react'
import { BsFillEmojiSmileFill, BsFillCameraFill, BsMicFill, BsSend } from 'react-icons/bs';
import { MdOutlineAttachment } from 'react-icons/md';
import { ReferencedMessage } from './ReferenceMessage'
import EmojiPicker from 'emoji-picker-react'
import { imageUpload } from '../../../lib/fileUpload'
import { doc, updateDoc, arrayUnion, getDoc } from '@firebase/firestore'
import { nanoid } from "nanoid";
import { sub } from 'date-fns'
import { usersDB } from '@/lib/firebase';
import Filter from 'bad-words'

export default function ChatBase({ 
  showEmojiPicker, currentUser, guestUser, setShowEmojiPicker, setMessageError, message, setMessage, isTyping, setIsTyping, presentConversation, isMessageReferenced, setMessages, setIsMessageReferenced, editMessage, setEditMessage, inputRef, photoInput, setPhotoInput, setClosePreview, setCurrentUser
}) {
  const [prevMessageLength, setPrevMessageLength] = useState(0);
  const [documents, setDocuments] = useState('');
  const [cursorPosition, setCursorPosition] = useState('');
  const MAX_PHOTO_SIZE = 1_553_000 // 2.4mb
  const MAX_DOCUMENT_SIZE = 1_000_000 // 1mb
  const customFilter = new Filter()

  const handleChange = (event) => {
    setMessage(event.target.value)
    setIsTyping(true)
  }
  const onPhotoChange = (event) => {
    const files = event.target.files;
    const max_allowed = [...files]
    setPhotoInput([...photoInput, ...max_allowed?.slice(0,5)])
  }
  const onDocumentChange = (event) => setDocuments(event.target.files[0])

  const buttonIcons = useCallback((type='REST') => {
    return (`${type == 'MIC' ? 'text-blue-600 w-full text-lg text-right' : 'text-gray-600'} ${type == 'PIN' ? '-rotate-45 text-xl' : ''} cursor-pointer hover:opacity-80 active:opacity-100 transition-all ${type == 'SUBMIT' ? 'text-xl text-right w-full text-gray-800' : ''}`)
  }, [])

  useEffect(() => {
    if(photoInput.length){
      photoInput.map(photo => {
        if(photo && photo.size > MAX_PHOTO_SIZE){
          alert("MAX ALLOWED SIZE IS 1.55MB")
          setPhotoInput([])
        }
        else if(documents && documents.size > MAX_DOCUMENT_SIZE){
          alert("MAX ALLOWED SIZE IS 1MB")
        }
      })
    }
  }, [photoInput, documents])
  
  useEffect(() => {
    inputRef && inputRef?.current?.focus()
  }, [editMessage?.id])

  // paused typing
  useEffect(() => {
    let timerId;
    setPrevMessageLength(message?.length)
    timerId = setTimeout(() => {
      if(isTyping && prevMessageLength === message?.length){
        setIsTyping(false)
        setPrevMessageLength(0)
      }
      else setPrevMessageLength(message?.length)
    }, 10000)

    return () => {
      clearTimeout(timerId)
    }
  }, [isTyping, message])

  const onEmojiPick = (emojiObject, event) => {
    let ref = inputRef?.current 
    let posStart = message.substring(0, ref?.selectionStart)
    let posEnd = message.substring(ref?.selectionStart)
    let text = posStart + emojiObject?.emoji + posEnd
    setMessage(text)
    setCursorPosition(posStart.length + emojiObject?.emoji?.length)
  }

  useEffect(() => {
    if(editMessage?.message) setMessage(editMessage?.message) 
  }, [editMessage?.message])

  const canSendMessage = [Boolean(photoInput?.length), message].some(Boolean)

  const sendMessage = async() => {
    if(!canSendMessage) return
    let imageUrls = []
    setShowEmojiPicker(false)
    try{
      // customFilter.addWords(selectedEmoji)
      //documents upload
      const { convoId, presentChatId, conversationState } = presentConversation
      const messageDocRef = doc(usersDB, "messages", presentChatId)
      const userRef = doc(usersDB, "chatUsers", currentUser?.emailId)
      // const text = message ? customFilter.clean(message) : ''
      const otherLastMessages = currentUser?.lastMessage?.filter(msg => msg?.chatId !== presentChatId)
      const date = sub(new Date(), { minutes: 0 }).toISOString()
      const id = nanoid(8)
      
      if(photoInput?.length){
        await Promise.all(photoInput?.map(async(image) => {
          const result = await imageUpload(image, 'chatImages')
          imageUrls.push(result?.url)
        }))
        setPhotoInput([])
      }
      const newMessage = editMessage?.message
                 ? {...editMessage, message, edited: true, updatedAt: date} 
                 : {
                    id, message, convoId: convoId, chatId: presentChatId,
                    date, isMessageRead: conversationState?.isChatOpened, 
                    edited: false, displayName: currentUser?.firstName, updatedAt: date, referencedMessage: isMessageReferenced, 
                    senderId: currentUser?.emailId, receiverId: guestUser?.emailId,
                    imageUrls: imageUrls?.length ? [...imageUrls] : [],
                  }
      if(editMessage?.message){
        const getMessageDoc = await getDoc(messageDocRef)
        const presentChatMessages = getMessageDoc.data()
        const otherMessages = presentChatMessages?.messages?.filter(msg => msg?.id !== editMessage?.id)
        const updatedMessages = [...otherMessages, newMessage]?.sort((a,b) => a?.date.localeCompare(b?.date))
        await updateDoc(messageDocRef, {
          messages: [...updatedMessages]
        })
        setMessages([...updatedMessages])
      }
      else{
        await updateDoc(messageDocRef, { 
          updatedAt: new Date().toString(),
          messages: arrayUnion({...newMessage})
        })
      }
      const lastMsg = [...otherLastMessages, { chatId: presentChatId, id, date, message }]  
      await updateDoc(userRef, {
        updatedAt: new Date().toString(), lastMessage: [...lastMsg]
      })
      setCurrentUser(prev => ({...prev, lastMessage: [...lastMsg]}))
      setMessage('')
      setEditMessage({})
      setIsTyping(false)
      setDocuments(null)
      setClosePreview(false)
      setIsMessageReferenced({})
      imageUrls = []
    }
    catch(error){
      const errorMessage = error?.response?.data?.message 
                                    ? error?.response?.data?.message : error?.message;
      setMessageError(errorMessage)
    }
  }

  let emoji = (
    <div className='absolute bottom-12 left-0.5'>
      <EmojiPicker 
        height={'20rem'} width={'18rem'}
        theme={'dark'} emojiStyle={'google'}
        previewConfig={
          {showPreview: false}
        }
        lazyLoadEmojis={true}
        searchDisabled={true}
        searchPlaceHolder={'pick one'}
        suggestedEmojisMode={'recent'}
        onEmojiClick={onEmojiPick}
      />
    </div>
  )

  return (
    <div
      onKeyUpCapture={event => event.key === 'Enter' ? sendMessage() : null}
      className={`relative flex-none h-[9%] p-1.5 shadow-lg pl-1 pr-0.5 bg-gray-100 w-[95%] self-center border-2 rounded-md border-gray-300 flex items-center mdxl:text-sm`}>
      <p 
        className='relative flex-none w-[8%] h-full grid place-content-center'>
        <BsFillEmojiSmileFill 
          onClick={() => setShowEmojiPicker(prev => !prev)}
          className={buttonIcons('REST')} 
        />
        {showEmojiPicker ? emoji : null}
      </p>
      <input 
        type="text" 
        ref={inputRef}
        key={presentConversation?.presentChatId}
        value={message}
        placeholder='Start conversation...'
        onChange={handleChange}
        className={`bg-inherit placeholder:text-gray-500 p-1.5 rounded-sm focus:outline-none border-none focus:border-none h-full text-black text-sm flex-grow lg:w-[78%] w-[75%] maxmobile:w-[65%]`}
      />
     
      <input type="file" hidden multiple size={MAX_DOCUMENT_SIZE} accept=".pdf,.doc,.docx" id="documentInput" onChange={onDocumentChange} />
      <input type='file' hidden multiple accept="image/*.{png,jpg,jpeg}" id='pictureInput' onChange={onPhotoChange} />
      
      <div className='flex-none lg:w-[14%] w-[17%] maxmobile:w-[25%] h-full flex items-center gap-2'>

        <div className='flex-none lg:w-[45%] px-1 w-[55%] maxmobile:w-[60%] flex items-center justify-between h-full'>

          <label htmlFor="documentInput">
            <MdOutlineAttachment 
              title='pdf/docs'
              onClick={() => setShowEmojiPicker(false)}
              className={buttonIcons('PIN')} 
            />
          </label>

          <label htmlFor='pictureInput'>
            <BsFillCameraFill 
              title='Photos'
              onClick={() => setShowEmojiPicker(false)}
              className={buttonIcons('REST')} 
            />
          </label>

        </div>
        {
          canSendMessage ? 
            <button
              type='submit'
              onClick={sendMessage}
              className='flex-auto maxmobile:w-10 border-none h-full focus:outline-0 grid place-content-center'
            >
              <BsSend className={buttonIcons('SUBMIT')} />
            </button>
            :     
            <BsMicFill 
              title='coming soon'
              className={buttonIcons('MIC')} 
            />
        }
      </div>
        {
          presentConversation?.leftChat?.left 
              ? <p className={`absolute -top-10 translate-x-1/2 animate-pulse text-gray-900 font-sans capitalize`}>{presentConversation?.name} Exited Chat</p> : null
        }
      <ReferencedMessage
        isMessageReferenced={isMessageReferenced}
        setIsMessageReferenced={setIsMessageReferenced}
        editMessage={editMessage} setEditMessage={setEditMessage}
        setMessage={setMessage}
      />
    </div>
  )
}
