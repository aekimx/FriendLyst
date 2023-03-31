import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getUserPostsThunk, getUserThunk } from '../../store/user'
import NavBar from "../NavBar"
import UserProfilePosts from '../UserProfilePosts'
import OpenModalButton from '../OpenModalButton'
import UserProfileUpdate from '../UserProfileUpdate'
import { getAllFriendsThunk, deleteFriendThunk, addFriendThunk, getAllRequestsThunk} from '../../store/friend'
import UserProfPostForm from '../UserProfilePostForm'
import { clearUser } from '../../store/user'



import './UserProfile.css'

export default function UserProfile() {
  const dispatch = useDispatch()
  const url = useParams()
  const userId = url.userId.split(".")[2]

  const user = useSelector(state => state.user?.user)
  const friends = useSelector(state => state.friends?.allFriends)
  const sessionUser = useSelector(state => state.session?.user)
  const allRequests = useSelector(state => state.friends?.allRequests)
  const posts = useSelector(state => state.user.posts)

  const friendsArr = Object.values(friends)
  const currentFriend = friendsArr.find(el => el.friendId === sessionUser?.id)

  console.log("what is in friends arr", friendsArr)
  console.log("what is current friend?", currentFriend)

  const requestsArr = Object.values(allRequests)
  const currentRequest = requestsArr.find(el => el.friendId === sessionUser?.id)

  const postsArr = Object.values(posts)
  let photosArr = postsArr.filter(post => post.photo.length > 0)

  useEffect(() => {
    dispatch(getUserThunk(userId))
    dispatch(getAllFriendsThunk(userId))
    dispatch(getAllRequestsThunk(sessionUser.id))
    dispatch(getUserPostsThunk(userId))
    return () => dispatch(clearUser())
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
  photosArr.reverse();
  if (photosArr.length >= 9) { photosArr = photosArr.slice(0,9)}

  console.log('photos arr', photosArr)


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

            {+userId === sessionUser?.id ?
            <OpenModalButton
            buttonText={<i className="fa-solid fa-gear"/>}
            modalComponent={<UserProfileUpdate user={user}/>}
            className='userprof-update-bio'/> :
            null
          }

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
          <div className='userprof-photos-text'> Photos </div>
          <div className='userprof-photos-grid'>
          {photosArr.map(post => {
            return (
              <div className='userprof-photo-container'>
              {post.photo.length ? <img src={post.photo} className='userprofile-each-photo'/> : null}
              </div>
            )
          })}
          </div>
        </div>

        <div className='userprofile-photos'>
          <div className='userprof-photos-text'> Friends </div>
          <div className='userprof-photos-grid'>
          {friendsArr.map(friend => {
            return (
              <div className='userprof-photo-container'>
                <Link to={`/${friend.friend.firstName}.${friend.friend.lastName}.${friend.friend.id}/profile`} className='userprof-user-link'>
                  <img src={friend.friend.profilePic} className='userprofile-each-photo'/>
                  {friend.friend.firstName} {friend.friend.lastName}
                </Link>
              </div>
            )
          })}
          </div>
        </div>

      </div>


      <div className='userprofile-posts-container'>
        {+userId === sessionUser.id ? <UserProfPostForm /> : null}
        <div className='userprofile-posts-text'> Posts </div>
        <UserProfilePosts userId={userId}/>


      </div>
      </div>


      </div>
      </>
  )
}
