import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { getAllMessagesThunk } from "../../store/message"
import AllMessages from "../Messages"

import "./MessagesCurrent.css"


export default function MessagesCurrent() {
  const dispatch = useDispatch()

  const {userId, friendId} = useParams();

  const messages = useSelector(state => state.messages)

  useEffect(() => {
    dispatch(getAllMessagesThunk(userId, friendId))
  }, [dispatch, friendId])

  let messagesArr;
  if (messages) messagesArr = Object.values(messages);

  return (
    <>
    <AllMessages />
    <div className='messages-conversation'>
      <div>
        <div> Chatting user prof pic </div>
        <div> Chatting user first name last name </div>
      </div>

      {messagesArr.map(message => {
        return (
        <>
        <div className='message-item-container' key={`messageitem${message.id}`}>
          <div className='message-item'>
            <img src={message.chattingUser.profilePic} className='message-item-chatting-profpic'/>
            <div> {message.chattingUser.firstName} {message.chattingUser.lastName} </div>
          </div>
        </div>
        </>
        )
      })}
    </div>
    </>
  )
}
