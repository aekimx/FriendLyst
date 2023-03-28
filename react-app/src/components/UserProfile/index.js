import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserThunk } from '../../store/user'
import NavBar from "../NavBar"
import UserProfilePosts from '../UserProfilePosts'
import OpenModalButton from '../OpenModalButton'
import UserProfileUpdate from '../UserProfileUpdate'
import { getAllFriendsThunk } from '../../store/friend'


import './UserProfile.css'

export default function UserProfile() {
  const dispatch = useDispatch()
  const url = useParams()
  const userId = url.userId.split(".")[2]
  const [option, setOption] = useState("Add")

  const user = useSelector(state => state.user?.user)
  const friends = useSelector(state => state.friends?.allFriends)
  const sessionUser = useSelector(state => state.session?.user)

  const friendsArr = Object.values(friends)

  for (let i = 0; i < friendsArr.length; i++) {
    let friend = friendsArr[i];
    if (friend.friendId === sessionUser.id) {
      console.log("Hitting this!!! this is a friend!!!")
      setOption("Remove")
  }
}


  useEffect(() => {
    dispatch(getUserThunk(userId))
    dispatch(getAllFriendsThunk(userId))
  }, [dispatch])


  // evnet listening on comment button that would set class onfocus and cursor will go inside input
  // use ref hook for comment set var that uses a use ref hook and on comment input ref = { refvar }
  // when you click on that other ting you reference that variable and set it to on focus

  // Navlink is a side bar thing className and active class name
  // or use location key = pathname

  const buttonClassName = (option === "Add" ? "userprofile-add" : "userprofile-remove")

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

         {userId === sessionUser.id ? null : <div className={buttonClassName}> ADD FRIEND REMOVE FRIEND HERE?</div> }
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
