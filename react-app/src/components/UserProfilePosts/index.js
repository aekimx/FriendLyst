import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllPostsThunk } from '../../store/post';
import "./UserProfilePosts.css"

export default function UserProfilePosts({userId}) {
  const dispatch = useDispatch();
  console.log("what is the user id???", userId);

  useEffect(() => {
    dispatch(getAllPostsThunk(userId))
  }, [dispatch])

  return (
    <>
    <div className='userprofileposts-container'>
      USER POSTS!
    </div>


    </>
  )
}
