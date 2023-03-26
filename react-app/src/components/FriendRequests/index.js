import NavBar from "../NavBar"
import SideBarMenu from "../SideBarMenu"
import AcceptRequest from "../FriendAcceptRequest";
import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllRequestsThunk, acceptRequestThunk } from "../../store/friend";

import './FriendRequests.css'
import { Link } from "react-router-dom";

export default function FriendRequests() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session?.user);
  const allRequests = useSelector(state => state.friends?.allRequests);

  useEffect(() => {
    dispatch(getAllRequestsThunk(user?.id));
  }, [dispatch])

  const allRequestsArr = Object.values(allRequests);

  return (
    <>
      <NavBar />
      <SideBarMenu />
      <div className='friendrequests-overall-container'>
      <div className='friendrequests-allfriends-text'> All Requests </div>
      {allRequestsArr.length ?
        <>
          {allRequestsArr.map(friend => {
            return (
              <div className='friendrequests-each-container' key={`friendrequest${friend.id}`}>

                <img src={friend.friend.profilePic} className='friendrequests-friend-profpic'/>

                 <div className='friendrequests-name'>
                    <Link to={`/${friend.friend.firstName}.${friend.friend.lastName}.${friend.friend.id}/profile`}
                    className='friendrequests-userprof-link'>
                      {friend.friend.firstName} {friend.friend.lastName}
                    </Link>
                </div>
                <div className='accept-delete-container'>

                  <AcceptRequest request={friend}/>

                  <div className='friendrequest-delete'>
                    <i className="fa-solid fa-x" />
                  </div>
              </div>
              </div>
            )
          })}
      </>
      :
      <>
        <div className='friendrequests-none'> You don't have any pending friend requests! </div>
      </>

      }

    </div>
    </>
  )
}
