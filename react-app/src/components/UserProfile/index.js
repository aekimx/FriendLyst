import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getUserThunk } from '../../store/user'
import NavBar from "../NavBar"
import UserProfilePosts from '../UserProfilePosts'
import OpenModalButton from '../OpenModalButton'
import UserProfileUpdate from '../UserProfileUpdate'

import './UserProfile.css'
// import '../UserProfilePosts/UserProfilePosts.css'
import { getAllFriendsThunk } from '../../store/friend'

export default function UserProfile() {
  const dispatch = useDispatch()
  const url = useParams()
  const userId = url.userId.split(".")[2]

  const user = useSelector(state => state.user.user)
  const friends = useSelector(state => state.friends.allFriends)

  const friendsArr = Object.values(friends)

  useEffect(() => {
    dispatch(getUserThunk(userId))
    dispatch(getAllFriendsThunk(userId))
  }, [dispatch])

  // if (!user) return null


  return (
    <>
    <NavBar />
    <div className='userprofile-container'>

      {/* SECTION ONE */}
      <div className='userprofile-coverphoto-container'>
        <img src={user.coverPhoto} alt='cover photo' className='userprofile-coverphoto'/>
      </div>

      {/* SECTION TWO */}
      <div className='userprofile-profpic-name'>
        <div>
          <img src={user.user?.profilePic} alt='profile' className='userprofile-profpic'/>
        </div>
        <div className='userprof-name-container'>
          <div className='userprof-name'> {user.user?.firstName} {user.user?.lastName} </div>
          <div className='userprof-friends'> {friendsArr.length} Friends </div>

        </div>
      </div>

      {/* SECTION THREE */}
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
