"use client"

import { doc, getDoc } from "@firebase/firestore"
import { usersDB } from "./firebase"

/**
 * @description FetchUnreadMessages fetches the loggedInUser unreadmessages
 * @param {*} userEmail currentUser email address
 * @param {*} chatIds arrays of chatIds the currentUser is presently participating in
 * @returns the currentUser unreadMessages and displays the count on the notification bell
 */

export const fetchUnreadMessages = async(userEmail, chatIds) => {
  if(!chatIds?.length) return []
  const allUnreadMessages = await Promise.all(chatIds?.map(async(chatId) => {
    const messageRef = doc(usersDB, 'messages', chatId)
    const messageDoc = await getDoc(messageRef)
    const chatMessage = messageDoc.data()
    const unreadMessages = chatMessage?.messages?.filter(msg => !msg?.isMessageRead)
    const senderId = unreadMessages?.length ? unreadMessages[0]?.senderId : ''
    if (senderId !== userEmail) return [...unreadMessages]
    return
  }))
  const filteredUnread = allUnreadMessages?.filter(unread => Array.isArray(unread) && unread?.length >= 1)
  return filteredUnread
}
