import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getUserThunk } from '../../store/user'

import './UserProfile.css'

export default function UserProfile() {

  const dispatch = useDispatch()
  const {id} = useParams()

  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getUserThunk(id))
  }, [dispatch, id])

  const updateUserProfile = () => {

  }

  if (!user) return null

  // const userPosts = Object.values(user.user?.posts)


  return (
    <>
    <div className='userprofile-container'>
    <div className='userprofile-container-inside'>
    <img src={user.coverPhoto} alt='cover photo' className='userprofile-coverphoto'/>

    <div className='userprofile-profpic-name'>
      <div>
        <img src={user.user?.profilePic} alt='profile' className='userprofile-profpic'/>
      </div>
      <div className='userprof-name-container'>
        <div className='userprof-fname'> {user.user?.firstName} </div>
        <div className='userprof-fname'> {user.user?.lastName} </div>
      </div>
    </div>

    <div className='userprof-bio-posts-container'>
    <div className='userprofile-bio'>
      <div> Intro </div>
      <div> Bio {user.bio} </div>
      <div> Birthday {user.user?.birthday} </div>
      <div> Lives in {user.location} </div>
    </div>


    <div className='userprofile-posts-container'>
      {/* I think I should have a separate post component here */}
      <div> Posts </div>
      {user.user?.posts.map(post => {
        return (
          <div className='userprofile-posts-div' key={`userprofilepost${post.id}`}>
            <div>
              <img src={user.profilePic} className='userprofile-posts-profpic'/>
              <div> {post.createdAt} </div>
            </div>
            <div> {post.caption} </div>
            <img src={post.photo} />
          </div>
        )
      })}
      {/* I think I should have a comment component here */}

    </div>
    </div>

    </div>

    </div>
    </>
  )
}
