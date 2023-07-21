import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { getDirectMessageThunk, clearMessages, getAllDirectMessagesThunk } from "../../store/message"

import "./MessagesCurrent.css"


export default function MessagesCurrent() {
  const dispatch = useDispatch()

  let {userId, dmId} = useParams();
  userId = +userId.split(".")[2]

  const directMessages = useSelector(state => state.messages.currentMessages)
  // if (messages.senderId) directMessages[messages.id] = messages
  const directMessagesArr = Object.values(directMessages)

  const allMessages = useSelector(state => state.messages.allMessages)
  const currentDM = Object.values(allMessages).find(el => el.id === +dmId)

  let currentFriend;
  if (currentDM?.userId === userId) currentFriend = currentDM?.userTwo
  else currentFriend = currentDM?.user

  useEffect(() => {
    dispatch(getDirectMessageThunk(+dmId))
    // return () => dispatch(clearMessages())
  }, [dispatch, dmId])

  // if (!messages) return null;

  return (
    <>
    <div className='currmessages-chattingfriend-container'>
      <div className='currmessages-chattingfriend-name-container'>
        <img src={currentFriend?.profilePic} alt='currmessages-curr' className='currmessages-currfriend'/>
        <div className='currmessages-currfriend-name'> {currentFriend?.firstName} {currentFriend?.lastName} </div>
      </div>

      <div className='currmessages-chattingfriend-icons'>
        <i className="fa-solid fa-phone"/>
        <i className="fa-solid fa-video" />
        <i class="fa-solid fa-circle-info" />
      </div>
    </div>
    <div className='currmessages-container' id='scroller'>
    {directMessagesArr.map(message => {
      return (
        <div className='currmessages-each-message-container' key={`currmessages${message.id}`}>
          {+message.senderId === +userId ?
          <div className='currmessages-own-message'>
            <div className='currmessages-msg-content'> {message.message} </div>
          </div>
          :
          <div className='currmessages-friend-message'>
           <img src={message.user?.profilePic} alt='currmessages-pic' className='currmessages-profpic'/>
           <div className='currmessages-friend-content'> {message.message} </div>
          </div> }

        </div>
      )
    })}
    <div id='anchor'></div>
    </div>

    </>
  )
}
