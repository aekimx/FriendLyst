import React from "react"
import { useDispatch } from "react-redux"
import { updatePostThunk } from "../../store/post"
import { useState } from "react"
import { useHistory } from "react-router-dom"

import './PostUpdate.css'

export default function PostUpdate({post}) {
  const dispatch = useDispatch()
  const history = useHistory()

  const [caption, setCaption] = useState(post.caption)

  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedPost = {caption, photo: post.photo, userId: post.userId}
    dispatch(updatePostThunk(updatedPost))
    .then(() => history.push("/home"))
  }

  return (
    <>
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder='Edit Post Here'
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        />
      </form>
    </div>
    </>
  )
}
