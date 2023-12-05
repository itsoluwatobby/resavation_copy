"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BsArrowLeftShort, BsCameraVideo } from 'react-icons/bs'
import { useResavationAppProvider } from '../../../context/useResavationAppProvider'

export default function ChatBodyNav({ currentUser, presentConversation, setMessages, setPresentConversation }){
  const { setIsChatPageOpened } = useResavationAppProvider()
  const router = useRouter()

  const closeChat = () => {
    typeof window !== "undefined" ? localStorage.setItem('chatOpened', JSON.stringify(false)) : null
    setIsChatPageOpened({isOpen: false, conversationId: ''})
    setPresentConversation({})
    setMessages([])
    router.replace(`/chat_page`, { scroll: false })
  }

  return (
    <nav className="sticky top-0 bg-inherit hidden flex-none h-16 w-full md:flex items-center justify-between p-3 pr-5 text-sm z-50 pb-0 pt-0">

      <div className='flex-none w-72 flex items-center p-3 py-4 gap-1'>

        <button 
          title='Close chat' 
          onClick={closeChat}
          className='flex-none cursor-pointer rounded-full w-8 transition-all grid place-centent-center focus:outline-0 border-none hover:opacity-90 active:opacity-100'>
            <BsArrowLeftShort className='text-gray-600 text-[2rem] hover:text-gray-900 ' />
        </button>

        <div className='flex-auto flex items-center gap-3'>
          <figure className="flex-none cursor-pointer rounded-full w-10 h-10 bg-slate-300">
          {    
          // TODO: Conditional rendering for the loggedIn user picture
            presentConversation?.displayPic ?
              <img
                src={presentConversation?.displayPic} 
                alt="Profile picture" 
                className="object-cover h-full w-full rounded-full"
              />
              : null
          }
          </figure>
          <div className="flex-auto flex justify-between w-full items-center ">
            <div className='flex flex-col gap-0'>
              {/* navigate to user profile */}
              <p className='cursor-pointer hover:underline hover:underline-offset-1 transition-all hover:opacity-80 active:opacity-100'>{presentConversation?.name}</p>
              {presentConversation?.isOnline ?
                  <span className="first-letter:text-lg text-gray-500 flex items-center gap-1 relative text-xs after:content-[''] after:w-2 after:h-2 after:bg-green-500 after:rounded-full after:mt-1">online</span>
                  :
                  <span className="first-letter:text-xl text-xs capitalize text-gray-400 flex items-center gap-1 relative after:content-[''] after:w-2 after:h-2 after:bg-gray-400 after:rounded-full after:mt-1">offline</span>
              }
            </div>
          </div>
        </div>
      </div>

      <p className="text-center">
        <BsCameraVideo title='Coming soon' className="text-lg cursor-pointer"/>
      </p>

    </nav>
  )
}
