import { MdExpandMore, MdOutlineCheck, MdOutlineCancel } from "react-icons/md"
import { doc, deleteDoc, getDoc, updateDoc } from '@firebase/firestore';
import { reduceTextLength } from "../../../lib/helperFunction"
import { useRouter } from "next/navigation";
import { usersDB } from "@/lib/firebase";
import { format } from "timeago.js";
import { useState } from "react"

export const Conversation = ({ 
  openConversation, conversation, presentConversation, userConversations, setSelectWatcher, 
  setUserConversations, setError, setPresentConversation, currentUser, setCurrentUser, isLoadingChat
}) => {
  const [expand, setExpand] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const deleteConversation = async(chatId, convoId) => {
    try{
      setIsLoading(true)
      setSelectWatcher('DELETE_TRIGGERED')
      const messageRef = doc(usersDB, "messages", chatId)
      const conversationRef = doc(usersDB, "ChatsDB", convoId)
      const targetConversation = userConversations?.find(conversation => conversation?.chatId === chatId)
      const otherConversations = userConversations?.filter(conversation => conversation?.chatId !== chatId)
      const nextChatEmail = otherConversations[0]?.members?.find(emailId => emailId !== currentUser?.emailId)
      const nextChat = otherConversations[0] ?? {}
      const properConversationData = otherConversations.map(convo => {
        const {lastMessage, name, displayPic, lastSeen, presentChatId, isOnline, ...rest} = convo
        return rest
      })
      if(targetConversation?.leftChat?.left){
        const userRef = doc(usersDB, "chatUsers", currentUser?.emailId)
        const chatIds = currentUser?.chatIds?.filter(id => id !== chatId)
        let conversationIds; // admin user retains the conversation id
        if(currentUser?.pid !== convoId){
          conversationIds = currentUser?.conversationIds?.filter(id => id !== convoId)
        }
        else conversationIds = [...currentUser?.conversationIds]
        const lastMessage = currentUser?.lastMessage?.filter(msg => msg?.chatId !== chatId)
        await updateDoc(userRef, {
          updatedAt: new Date().toString(),
          chatIds, conversationIds, lastMessage
        })

        await deleteDoc(messageRef)
        await updateDoc(conversationRef, {
          updatedAt: new Date().toString(),
          conversations: [...properConversationData]
        })
      }
      else{
        const userRef = doc(usersDB, "chatUsers", currentUser?.emailId)
        const chatIds = currentUser?.chatIds?.filter(id => id !== chatId)
        let conversationIds; // admin user retains the conversation id
        if(currentUser?.pid !== convoId){
          conversationIds = currentUser?.conversationIds?.filter(id => id !== convoId)
        }
        else conversationIds =  [...currentUser?.conversationIds]
        const lastMessages = currentUser?.lastMessage?.filter(msg => msg?.chatId !== chatId)
        await updateDoc(userRef, {
          updatedAt: new Date().toString(),
          chatIds, conversationIds, lastMessage: lastMessages
        })
        const {lastMessage, name, displayPic, lastSeen, presentChatId, ...rest} = targetConversation
        const isGuestUser = rest?.members?.find(email => email !== rest?.adminId)
        const adminChatOpened = rest?.adminId === currentUser?.emailId ? false : rest?.conversationState?.adminChatOpened
        const guestChatOpened = isGuestUser === currentUser?.emailId ? false : rest?.conversationState?.guestChatOpened
        const updatedTargetConversation = {
          ...rest, conversationState: { 
            adminChatOpened, guestChatOpened, unread: { senderId, count: count },
            isChatOpened: adminChatOpened && guestChatOpened, 
          }
        }
        await updateDoc(conversationRef, {
          updatedAt: new Date().toString(),
          conversations: [...properConversationData, {...updatedTargetConversation, leftChat: { left: true, emailId: currentUser?.emailId }}]
        })
      }

      setPresentConversation({...nextChat})
      setCurrentUser(prev => ({...prev, presentChatId: nextChat?.presentChatId}))
      setUserConversations([...otherConversations])
      setExpand(false)
      nextChatEmail ? router.replace(`/chat_page?email=${nextChatEmail}`, { scroll: false }) : router.back()
    }
    catch(error){
      const errorMessage = error?.response?.data?.message ? error?.response?.data?.message : error?.message;
      setError(errorMessage)
    }
    finally{
      setIsLoading(false)
    }
  }

  return (
    <article 
      className={`relative cursor-default flex items-center mobile:text-sm w-full ${(isLoading || isLoadingChat) ? 'animate-pulse' : 'animate-none'} ${presentConversation?.chatId === conversation?.chatId ? 'bg-gray-300' : 'bg-gray-100'} gap-0.5 p-0.5 rounded-md transition-all hover:bg-gray-200`}>

      <div
        onClick={() => openConversation(conversation?.chatId, conversation?.convoId)}
        className={`flex-auto w-[90%] flex items-center gap-1.5 p-2.5 pl-2.5 mobile:p-2 h-full`}
      >

        <figure className="flex-none rounded-full w-8 h-8 bg-slate-400">
          {conversation?.displayPic ?
            <img src={conversation?.displayPic} alt="Profile picture" 
              className="object-cover h-full w-full"
            /> : null
          }
        </figure>

        <div className="flex-auto w-[85%] flex items-center gap-2.5">

          <div className="flex-auto w-[90%] cursor-default flex flex-col ">
            <p className="font-medium">{reduceTextLength(conversation?.name, 18, 'letter')}</p>
            <p className="text-gray-600 first-letter:capitalize">
              {reduceTextLength(conversation?.lastMessage?.message, 5, 'word')}
            </p>
          </div>
          <p className="flex-none flex flex-col gap-1 items-center">
            {
              conversation?.isOnline ? 
              <span title='online' className='w-2 h-2 rounded-full bg-green-500' />
              :  
              <span title='Last seen' className="text-gray-400 text-[10px]">{format(conversation?.lastSeen)}</span>
            }
            {
              !conversation?.conversationState?.isChatOpened ? (
                conversation?.conversationState?.unread?.senderId !== currentUser?.emailId ? 
                  (
                    conversation?.conversationState?.unread?.count > 0 ?
                        <span 
                          role="Unread messages count"
                          title={`${conversation?.conversationState?.unread?.count} Unread message${conversation?.conversationState?.unread?.count > 1 ? 's' : ''}`}
                          className="bg-blue-600 rounded-full p-0.5 h-4 text-white w-4 text-[10px] font-medium grid place-content-center">{0 || conversation?.conversationState?.unread?.count}</span>
                    : null
                  ) 
                : null
                ) : null
            }
          </p>

        </div>

      </div>

      <button 
        onClick={() => setExpand(prev => !prev)}
        className={`flex-none ${expand ? 'bg-gray-400' :  presentConversation?.chatId === conversation?.chatId ? 'bg-gray-300' : 'bg-gray-100'} w-8 h-full grid text-gray-700 place-content-center p-0.5 rounded-lg text-xl cursor-pointer hover:scale-[1.03] active:scale-[1] transition-all ${expand ? 'rotate-180' : 'rotate-0'}`}
      >
        <MdExpandMore 
        />
      </button>

      {/* DELETE CONVERSATION MODAL */}
      <div className={`absolute top-8 z-40 bg-gray-100 text-xs right-8 ${expand ? 'scale-1 flex' : 'scale-0 hidden'} items-center flex-col p-1.5 text-xs rounded-sm justify-center shadow-2xl`}>

        <span className="font-medium text-[11px] mobile:text-[13px] capitalize font-sans flex items-center gap-1">
            <MdOutlineCheck className="text-lg" /> to delete</span>
        <div className="flex items-center gap-2 w-10 text-white text-xs p-0.5">
          <button
            onClick={() => setExpand(false)}
            className="rounded-md bg-gray-300 cursor-pointer opacity-95 border border-gray-500 focus:outline-none p-2 pt-1 pb-1 text-red-500 hover:text-opacity-60 transition-all"
          >
            <MdOutlineCancel 
              className='text-lg'
            />
          </button>
          <button
            onClick={() => deleteConversation(conversation?.chatId, conversation?.convoId)}
            className="rounded-md border border-gray-500 bg-gray-300 focus:outline-none cursor-pointer p-2 pt-1 pb-1 text-green-600 hover:text-opacity-60 transition-all active:opacity-100"
          >
            <MdOutlineCheck
              className='text-lg'
            />
          </button>
        </div>

      </div>

    </article>
  )
}
