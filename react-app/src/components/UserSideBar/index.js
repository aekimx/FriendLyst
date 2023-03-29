import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllFriendsThunk } from "../../store/friend";

import './UserSideBar.css'

export default function UserSideBar() {

  const dispatch = useDispatch();

  const allFriends = useSelector(state => state.friends?.allFriends)
  const sessionUser = useSelector(state => state.session?.user)

  const allFriendsArr = Object.values(allFriends)


  useEffect(() => {
    dispatch(getAllFriendsThunk(sessionUser?.id))
  }, [dispatch])


  return (
    <>
    <div className="usersidebar-bday-container">
      <div className='usersidebar-bday-text'> Birthdays</div>
      <div className='usersidebar-bday-content'>
        <i className="fa-solid fa-cake-candles" />
        <div> Who has a bday today? </div>
      </div>

    </div>

    <div className='usersidebar-container'>
      <div className='usersidebar-friends-text'> Contacts </div>

      {allFriendsArr.map(user => {
        return (
          <div className='usersidebar-name-container'>
            <img src ={user.friend.profilePic} alt='friendlist-pic' className='usersidebar-pic'/>
            <div className='usersidebar-name'> {user.friend.firstName} {user.friend.lastName} </div>
          </div>
        )
      })}

    </div>
    </>
  )
}
