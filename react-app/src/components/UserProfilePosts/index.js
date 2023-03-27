import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUserPostsThunk } from '../../store/user';
import { Link } from 'react-router-dom';
import "./UserProfilePosts.css"

export default function UserProfilePosts({userId}) {
  const dispatch = useDispatch();

  const posts = useSelector(state => state.user?.posts)

  const postsArr = Object.values(posts)
  postsArr.reverse();

  useEffect(() => {
    dispatch(getUserPostsThunk(userId))
  }, [dispatch])


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


              { post.likes.length > 0 ?
              <div className='userpost-like-comment-count'>
                <div> {post.likes.length} {post.likes.length === 1 ? "like" : "likes "} </div>
              </div>
              : null}

            <div className='userpost-comments-container'>
              { post.comments.length ?
              <>
              <div className='userpost-comments-text'> Comments </div>
              {post.comments.map(comment => {
                return (
                  <div className='userpost-each-comment-container'>

                    <div className='userpost-comment-name-container'> <img src={comment.user.profilePic} className='userpost-comment-profpic'/> </div>
                    <div className='userpost-each-comment'>
                      <div className='userpost-comment-name-time'>
                        <Link to={`/${comment.user?.firstName}.${comment.user?.lastName}.${comment.user.id}/profile`} className='userpost-comment-link'>
                          {comment.user.firstName} {comment.user.lastName}
                        </Link>
                        <span className='userpost-comment-createdat'> {comment.createdAt.slice(0,11)} </span>
                      </div>
                      <div className='userpost-comment-content'> {comment.comment} </div>
                    </div>


                  </div>
                )
              })}
              </>
              : null}

            </div>
          </div>
        )
      })}
    </div>


    </>
  )
}
