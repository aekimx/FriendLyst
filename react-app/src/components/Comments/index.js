import React, { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import CommentOptions from "../CommentOptions"
import { createCommentThunk, getAllPostsThunk, likePostThunk, unlikePostThunk } from "../../store/post";

import "./Comments.css"
import "./CommentsForm.css"


export default function AllComments({comments, postId}) {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user)
  const likes = useSelector(state => state.post.allPosts[postId]?.likes)

  const [content, setContent] = useState("")

  const currentLike = likes.find(el => el.user?.id === user?.id)


  const inputRef = useRef(null);
  const handleClick = () => {
    inputRef.current.focus()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newComment = {comment: content, userId, postId}
    dispatch(createCommentThunk(newComment))
    dispatch(getAllPostsThunk(userId))
    setContent('')
  }

  let userId;
  if (user) userId = user.id

  const likePost = async () => {
    const like = {postId, userId}
    dispatch(likePostThunk(like))
  }

  const unlikePost = async () => {
    dispatch(unlikePostThunk(currentLike))
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

              {user?.id == comment.userId ?  <div className='post-comment-options-div'> <CommentOptions comment={comment}/> </div> : null}


          </div>
        )
      })}
      </div>

      <>
        <div className='commentform-input-container'>
          <img src={user?.profilePic} className='commentform-userprof'/>
          <form onSubmit={handleSubmit}>

            <input
            placeholder='Write a comment...'
            ref={inputRef}
            className='commentform-input'
            maxLength='500'
            style={{ color: 'rgb(228,230,235)', paddingLeft:'10px'}}
            value={content}
            onChange={(e) => setContent(e.target.value)}>
            </input>

            <button className='commentform-sendbutton'
            disabled={content.length === 500}> <i className="fa-solid fa-paper-plane"/></button>
          </form>
        </div>

        {content.length === 500 ? <div className='commentform-error'> Comments must be less than 500 characters </div>: null}
      </>
    </>
  )
}
