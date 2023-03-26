import NavBar from "../NavBar"
import SideBarMenu from "../SideBarMenu"
import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllRequestsThunk } from "../../store/friend";

import './FriendRequests.css'

export default function FriendRequests() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session?.user)
  const allRequests = useSelector(state => state.friends?.allRequests)

  useEffect(() => {
    dispatch(getAllRequestsThunk(user?.id))
  }, [dispatch])

  const allRequestsArr = Object.values(allRequests)

  return (
    <>
      <NavBar />
      <SideBarMenu />
      <div className='friendrequests-overall-container'>
      <div className='friendrequests-allfriends-text'> All Requests </div>
      {!allRequestsArr.length ?
      <>
        <div className='friendrequests-none'> You don't have any pending friend requests! </div>
      </>
      :
      <>
        {allRequestsArr.map(friend => {
          return (
            <div className='friendrequests-each-container' key={`friendrequest${friend.id}`}>
              <img src={friend.friend.profilePic} className='friendrequests-friend-profpic'/>
              <div className='friendrequests-name'> {friend.friend.firstName} {friend.friend.lastName} </div>
            </div>
          )
        })}
      </>
      }

    </div>
    </>
  )
}
