import NavBar from "../NavBar"
import SideBarMenu from "../SideBarMenu"
import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllFriendsThunk } from "../../store/friend";

import './FriendsList.css'



export default function FriendsList() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session?.user)
  const allFriends = useSelector(state => state.friends)

  useEffect(() => {
    dispatch(getAllFriendsThunk(user?.id))
  }, [dispatch])

  const allFriendsArr = Object.values(allFriends)
  console.log('what does allfriends array look like', allFriendsArr)
  allFriendsArr.map(friend => console.log(friend))

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
            <div className='friendslist-name'> {friend.friend.firstName} {friend.friend.lastName} </div>
          </div>
        )
      })}
    </div>


    </>
  )
}
