import React, { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { createUserCommentThunk, getUserPostsThunk, likeUserPostThunk, unlikeUserPostThunk } from "../../store/user";

import "../Comments/Comments.css"
import "../Comments/CommentsForm.css"
import "./UserProfileCommentForm.css"


export default function UserProfileComments({comments, postId}) {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user)
  const likes = useSelector(state => state.user.posts[postId]?.likes)

  const url = useParams()
  const userId = url.userId.split(".")[2]

  const [content, setContent] = useState("")

  let sessionUserId;
  if (user) sessionUserId = user.id

  let currentLike;
  if (likes) currentLike = likes.find(el => el.user?.id === sessionUserId)

  const inputRef = useRef(null);
  const handleClick = () => {
    inputRef.current.focus()
  }

  const handleChange = (e) => {
    e.preventDefault()
    setContent(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height =  `${e.target.scrollHeight}px`
  }

  const handleBlur = (e) => {
    e.preventDefault()
    e.target.style.height = 'auto'
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    const newComment = {comment: content, userId: sessionUserId, postId}
    dispatch(createUserCommentThunk(newComment))
    dispatch(getUserPostsThunk(userId))
    setContent('')
  }

  const likePost = async () => {
    const like = {postId, userId: sessionUserId}
    dispatch(likeUserPostThunk(like))
  }

  const unlikePost = async () => {
    dispatch(unlikeUserPostThunk(currentLike))
  }


  return (
    <>

    <div className='feed-like-comment-buttons'>
      {currentLike ?
        <div className='feed-liked' onClick={unlikePost}>
          <i class="fa-solid fa-thumbs-up" />
          <div className='feed-like-text'> Like </div>
        </div>  :
        <div className='feed-like-button' onClick={likePost}>
          <i className="fa-regular fa-thumbs-up" />
          <div className='feed-like-text'> Like </div>
        </div>
      }
      <div className='feed-comment-button' onClick={handleClick}>
        <i className="fa-regular fa-message" />
        <div className='feed-comment-text'> Comment </div>
      </div>
    </div>

    <div className='postcomments-overall-container'>
      {comments.map(comment => {
        return (
          <div key={`postcomment${comment.id}`} className='post-comment-container'>
            <img src={comment.user.profilePic} alt='profilepic' className='post-comment-profpic'/>
            <div className='post-comment-comment'>
              <div className='post-comment-name-time'>
                <Link to={`/${comment.user?.firstName}.${comment.user?.lastName}.${comment.user.id}/profile`} className='post-comment-link'>
                  <div> {comment.user.firstName} {comment.user.lastName} </div>
                </Link>
                <div className='post-comment-createdat'> {comment.createdAt.slice(0,11)} </div>
              </div>
              <div className='post-comment-content'> {comment.comment} </div>
            </div>
          </div>
        )
      })}
      </div>

      <>
        <div className='commentform-input-container'>
          <img src={user?.profilePic} className='commentform-userprof'/>
          <form onSubmit={handleSubmit} className='userprof-commentform-form'>

            <textarea
            placeholder='Write a comment...'
            ref={inputRef}
            className='commentform-input'
            maxLength='500'
            style={{ color: 'rgb(228,230,235)', paddingLeft:'10px'}}
            value={content}
            onBlur={handleBlur}
            onChange={handleChange} />

            <button className='user-commentform-sendbutton' disabled={content.length === 500}>
              <i className="fa-solid fa-paper-plane"/>
            </button>
          </form>

        </div>
          {content.length === 500 ? <div className='userprof-commentform-error'> Comments must be less than 500 characters </div>: null}

      </>




    </>
  )
}
