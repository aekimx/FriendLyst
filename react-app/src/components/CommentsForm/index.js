import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { createCommentThunk, getAllPostsThunk } from "../../store/post";

import "./CommentsForm.css"

export default function CommentsForm({postId}) {
  const dispatch = useDispatch()


  const [comment, setComment] = useState("")

  const user = useSelector(state => state.session.user)
  let userId;
  if (user) userId = user.id

  const handleSubmit = (e) => {
    e.preventDefault()
    const newComment = {comment, userId, postId}
    dispatch(createCommentThunk(newComment))
    .then(dispatch(getAllPostsThunk(userId)))
    setComment('')
  }

  return (
    <>
    <div className='commentform-input-container'>
      <img src={user?.profilePic} className='commentform-userprof'/>
      <form onSubmit={handleSubmit}>
        <input placeholder='Write a comment...'
        className='commentform-input'
        maxLength='500'
        style={{ color: 'rgb(228,230,235)', paddingLeft:'10px'}}
        value={comment}
        onChange={(e) => setComment(e.target.value)}>
        </input>
        <button className='commentform-sendbutton'
        disabled={comment.length === 500}> <i className="fa-solid fa-paper-plane"/></button>
      </form>
    </div>

    {comment.length === 500 ? <div className='commentform-error'> Comments must be less than 500 characters </div>: null}
    </>
  )

}
