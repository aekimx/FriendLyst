import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserPostsThunk, getUserThunk } from '../../store/user'
import NavBar from "../NavBar"
import UserProfilePosts from '../UserProfilePosts'
import OpenModalButton from '../OpenModalButton'
import UserProfileUpdate from '../UserProfileUpdate'
import { getAllFriendsThunk, deleteFriendThunk, addFriendThunk, getAllRequestsThunk } from '../../store/friend'


import './UserProfile.css'

export default function UserProfile() {
  const dispatch = useDispatch()
  const url = useParams()
  const userId = url.userId.split(".")[2]

  const user = useSelector(state => state.user?.user)
  const friends = useSelector(state => state.friends?.allFriends)
  const sessionUser = useSelector(state => state.session?.user)
  const allRequests = useSelector(state => state.friends?.allRequests)

  const friendsArr = Object.values(friends)
  const currentFriend = friendsArr.find(el => el.friendId === sessionUser?.id)

  const requestsArr = Object.values(allRequests)
  const currentRequest = requestsArr.find(el => el.friendId === sessionUser?.id)


  useEffect(() => {
    dispatch(getUserThunk(userId))
    dispatch(getAllFriendsThunk(userId))
    dispatch(getAllRequestsThunk(sessionUser.id))
    dispatch(getUserPostsThunk(userId))
  }, [dispatch, userId])

  const removeFriend = async () => {
    dispatch(deleteFriendThunk(currentFriend.id))
    dispatch(getAllFriendsThunk(userId))
  }

  const addFriend = async () => {
    const request = {userId: +userId, friendId: sessionUser.id}
    dispatch(addFriendThunk(request))
    // dispatch(getAllRequestsThunk(userId))
    // dispatch(getAllRequestsThunk(sessionUser?.id))
  }


  return (
    <>
    <NavBar />
    <div className='userprofile-container'>

      <div className='userprofile-coverphoto-container'>
        <img src={user.coverPhoto} alt='cover photo' className='userprofile-coverphoto'/>
      </div>

      <div className='userprofile-profpic-name'>

        <div className='userprof-name-pic-container'>
            <img src={user.user?.profilePic} alt='profile' className='userprofile-profpic'/>
          <div className='userprof-name-container'>
            <div className='userprof-name'> {user.user?.firstName} {user.user?.lastName} </div>
            <div className='userprof-friends'> {friendsArr.length} Friends </div>
          </div>
        </div>

         {currentFriend !== undefined ? <div className='userprofile-remove' onClick={removeFriend}>  Remove Friend </div>
         : <div>
            {sessionUser?.id === +userId ? null :
              <>{currentRequest ? <div className='userprofile-pending'> Friend Request Pending </div> :
              <div className='userprofile-add' onClick={addFriend}>  Add Friend </div> } </> }
           </div> }

        </div>



      <div className='userprof-bio-posts-container'>
      <div>
        <div className='userprofile-bio'>

          <div className='userprofile-intro-text'>
            <div> Intro  </div>
            <OpenModalButton
            buttonText={<i className="fa-solid fa-gear"/>}
            modalComponent={<UserProfileUpdate user={user}/>}
            className='userprof-update-bio'/>
          </div>

          <div className='userprof-bio-bio'>
            <i className="fa-solid fa-address-card" />
            <div className='userprofile-bio-text'> {user.bio} </div>
          </div>

          <div className='userprof-bio-bio'>
            <i className="fa-solid fa-cake-candles" />
            <div className='userprofile-bio-text'> {user.user?.birthday} </div>
          </div>

          <div className='userprof-bio-bio'>
            <i className="fa-solid fa-house" />
            <div className='userprofile-bio-text'>  Lives in {user.location} </div>
          </div>
        </div>

        <div className='userprofile-photos'>
          Photos
        </div>

        <div className='userprofile-friends-list'>
          Friends
        </div>

      </div>


      <div className='userprofile-posts-container'>
        <div className='userprofile-posts-text'> Posts </div>
        <UserProfilePosts userId={userId}/>


      </div>
      </div>


      </div>
      </>
  )
}
