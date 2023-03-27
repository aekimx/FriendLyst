import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getUserThunk } from '../../store/user'
import NavBar from "../NavBar"
import UserProfilePosts from '../UserProfilePosts'
import { getUserPostsThunk } from '../../store/user'

import './UserProfile.css'
import '../UserProfilePosts/UserProfilePosts.css'

export default function UserProfile() {
  const dispatch = useDispatch()
  const url = useParams()
  const userId = url.userId.split(".")[2]

  const user = useSelector(state => state.user.user)
  const sessionUser = useSelector(state => state.session.user)

  console.log('are we properly doing the ternary? ', sessionUser.id === user.id)


  useEffect(() => {
    dispatch(getUserThunk(userId))
    dispatch(getUserPostsThunk(userId))
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
          <div className='userprof-friends'> 5 friends </div>

        </div>
      </div>

      {/* SECTION THREE */}
      <div className='userprof-bio-posts-container'>
      <div>
        <div className='userprofile-bio'>
          <div className='userprofile-intro-text'> Intro </div>
          <div className='userprofile-bio-text'> <i className="fa-solid fa-address-card" /> {user.bio} </div>
          <div> <i className="fa-solid fa-cake-candles" /> Birthday {user.user?.birthday} </div>
          <div> <i className="fa-solid fa-house" /> Lives in {user.location} </div>
        </div>

        <div className='userprofile-photos'>
          Photos
        </div>

      </div>


      <div className='userprofile-posts-container'>

        {/* {sessionUser.id === userId ? <div> POST FORM </div> : null} */}

        <div> Posts </div>
        <UserProfilePosts userId={userId}/>


      </div>
      </div>


      </div>
      </>
  )
}
