import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import NavBar from "../NavBar"
import SideBarMenu from "../SideBarMenu"
import { getAllDirectMessagesThunk } from "../../store/message"
import { NavLink } from "react-router-dom"

import "./Messages.css"


export default function AllMessages() {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user)
  const directMessages = useSelector(state => state.messages?.allMessages)
  const directMessagesArr = Object.values(directMessages)


  useEffect(() => {
    dispatch(getAllDirectMessagesThunk(sessionUser?.id))
  }, [dispatch])

  // if (!directMessagesArr) return null;

  return (
    <>
    <NavBar />
    <SideBarMenu />

      <div className='messages-each-convo-container'>
        <div className='messages-chats-text'> Chats </div>
        {directMessagesArr.map(dm => {
          return (
            <NavLink to={`/${sessionUser?.firstName}.${sessionUser?.lastName}.${sessionUser?.id}/messages/${dm.id}`} className='messages-convo-link'>
            <div key={`dmchannel${dm.id}`} className='messages-each-convo'>
              <div className='messages-user-container'>
                <img src={dm?.userId === sessionUser?.id ? dm?.userTwo.profilePic : dm?.user.profilePic}
                className='dms-userprofpic'/>
                <div className='dms-user-preview'>
                  <div className='dms-user-name'>
                  <div className='dms-user-firstname'> {dm.userId === sessionUser?.id  ?  dm.userTwo.firstName : dm.user.firstName} </div>
                  <div className='dms-user-lastname'> {dm.userId === sessionUser?.id  ?  dm.userTwo.lastName : dm.user.lastName} </div>
                  </div>

                  {dm.messages?.length > 0 ? <div className='messages-msg-preview'> {dm.messages[dm.messages.length-1].message} </div> :  <div className='messages-msg-preview'> Start a conversation! </div> }
                </div>
              </div>
            </div>
            </NavLink>
          )
        })}
    </div>
    <div className='messages-right-container'> Choose someone to message with! </div>


    </>
  )
}
