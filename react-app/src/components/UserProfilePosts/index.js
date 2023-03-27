import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUserPostsThunk } from '../../store/user';
import "./UserProfilePosts.css"

export default function UserProfilePosts({userId}) {
  const dispatch = useDispatch();

  const posts = useSelector(state => state.user.posts)

  const postsArr = Object.values(posts)

  useEffect(() => {
    dispatch(getUserPostsThunk(userId))
  }, [dispatch, posts])

  // if (!postsArr) return null

  return (
    <>
    <div className='userprofileposts-container'>
      {postsArr.map(post => {
        return (
          <div key={`userprofilepost${post.id}`} className='userprofileposts-each-post'>
            <div className='userpost-name-container'>
              <img src={post.user.profilePic} className='userpost-profpic'/>
              <div className='userpost-name-date-container'>
                <div className='userpost-name-text'> {post.user.firstName} {post.user.lastName} </div>
                <div className='userpost-date-text'> {post.createdAt.slice(0,11)} </div>

              </div>

            </div>
            <div>
              <div className='userpost-caption'> {post.caption} </div>
              <img src={post.photo} className='userpost-photo'/>
            </div>
          </div>
        )
      })}
    </div>


    </>
  )
}
