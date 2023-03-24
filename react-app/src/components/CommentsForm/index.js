import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { createCommentThunk } from "../../store/comment";

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
    setComment('')
  }

  return (
    <div className='commentform-input-container'>
      <img src={user.profilePic} className='commentform-userprof'/>
      <form onSubmit={handleSubmit}>
        <input placeholder='Write a comment...'
        className='commentform-input'
        style={{ color: 'rgb(228,230,235)', paddingLeft:'10px'}}
        value={comment}
        onChange={(e) => setComment(e.target.value)}/>
      </form>
      </div>
  )

}
