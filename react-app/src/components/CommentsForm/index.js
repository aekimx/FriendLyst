import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { createCommentThunk } from "../../store/comment";


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
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder='comment' value={comment}
        onChange={(e) => setComment(e.target.value)}/>
      </form>
      </div>
  )

}
