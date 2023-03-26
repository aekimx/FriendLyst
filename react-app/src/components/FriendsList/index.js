import NavBar from "../NavBar"
import SideBarMenu from "../SideBarMenu"
import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllFriendsThunk } from "../../store/friend";
import { Link } from "react-router-dom";

import './FriendsList.css'



export default function FriendsList() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session?.user)
  const allFriends = useSelector(state => state.friends?.allFriends)

  useEffect(() => {
    dispatch(getAllFriendsThunk(user?.id))
  }, [dispatch])

  if (!allFriends) return null;
  const allFriendsArr = Object.values(allFriends)

  return (
    <>
    <NavBar />
    <SideBarMenu />
    <div className='friendslist-overall-container'>
      <div className='friendslist-allfriends-text'> All Friends </div>
      {allFriendsArr.map(friend => {
        return (
          <div className='friendslist-each-container' key={`friendlist${friend.id}`}>
            <img src={friend.friend.profilePic} className='friendlist-friend-profpic'/>
            <div className='friendslist-name'>
              <Link to={`/${friend.friend.firstName}.${friend.friend.lastName}.${friend.friend.id}/profile`}
              className='friendslist-name-link'>
              {friend.friend.firstName} {friend.friend.lastName}
              </Link>
            </div>
          </div>
        )
      })}
    </div>


    </>
  )
}
