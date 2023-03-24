import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { createCommentThunk, getAllPostsThunk } from "../../store/post";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots, faPaperPlane } from '@fortawesome/free-solid-svg-icons'

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
    .then(dispatch(getAllPostsThunk()))
    setComment('')
  }

  return (
    <div className='commentform-input-container'>
      <img src={user.profilePic} className='commentform-userprof'/>
      <form onSubmit={handleSubmit}>
        <input placeholder='Write a comment...'
        className='commentform-input'
        maxLength='2000'
        style={{ color: 'rgb(228,230,235)', paddingLeft:'10px'}}
        value={comment}
        onChange={(e) => setComment(e.target.value)}>
        </input>
        <FontAwesomeIcon icon={faPaperPlane} className='commentform-sendbutton'/>

      </form>
      </div>
  )

}
