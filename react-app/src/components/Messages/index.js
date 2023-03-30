import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import NavBar from "../NavBar"
import SideBarMenu from "../SideBarMenu"
import MessageForm from "../MessageForm"
import { getAllFriendsThunk } from "../../store/friend"
import MessagesCurrent from "../MessagesCurrent"


import "./Messages.css"
import { Link } from "react-router-dom"


export default function AllMessages() {
  const dispatch = useDispatch();

  const allFriends = useSelector(state => state.friends.allFriends)
  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(getAllFriendsThunk(sessionUser?.id))
  }, [dispatch])

  const allFriendsArr = Object.values(allFriends)


  return (
    <>
    <NavBar />
    <SideBarMenu />

    <div className='messages-overall-container'>
      <div className='messages-each-convo-container'>
        {allFriendsArr.map(friend => {
          return (
            <Link to={`/messages/${sessionUser.id}/${friend.id}`} key={`messagefriend${friend.id}`}>
            <div className='messages-each-convo' >
              <img src={friend.friend?.profilePic} className='messages-user-profpic'/>
              <div className='messages-user-container'>
                <div className='messages-user-name'> {friend.friend?.firstName} {friend.friend?.lastName} </div>
                <div className='messages-user-last-message'> LAST MESSAGE  </div>
              </div>
            </div>
            </Link>

          )
        })}

      </div>
    </div>

    </>
  )
}
