import React from "react"
import { useDispatch } from "react-redux"
import { updatePostThunk } from "../../store/post"
import { useState } from "react"
import { useModal } from "../../context/Modal";

import './PostUpdate.css'

export default function PostUpdate({post}) {
  const dispatch = useDispatch()
  const { closeModal } = useModal();

  const [caption, setCaption] = useState(post.caption)

  let postId;

  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedPost = {caption, photo: post.photo, user_id: post.userId}
    dispatch(updatePostThunk(updatedPost, postId=post.id))
    .then(() => {closeModal()})
  }



  return (
    <>
    <div className='postupdate-modal-container'>

      <div className='postupdate-edit-text'>
        <div> </div>
        <div>Edit Post </div>
        <div onClick={closeModal} className='postupdate-closemodal'>
        <i className="fa-solid fa-x" />
        </div>
      </div>

      <div className='postupdate-modal'>
        <div className='postupdate-profpic-user'>
          <img src={post.user?.profilePic} className='postupdate-modal-profpic'/>
          <div className='postupdate-user-name'>  {post.user?.firstName} {post.user?.lastName} </div>
        </div>

        <div className='postupdate-form-container'>
          <form onSubmit={handleSubmit}>
            <textarea placeholder={`What's on your mind, ${post.user?.firstName}?`}
            value={caption}
            maxLength='2000'
            className='postupdate-textarea'
            onChange={(e) => setCaption(e.target.value)}
            />

            <div className='postupdate-error'>
             {caption.length === 2000 ? 'Caption must be less than 2000 characters' : null}
             {caption.length === 0 ?  'Caption is required' : null}
            </div>

            <button className='postupdate-update-button' type='submit'
            disabled={caption.length < 1 || caption.length === 2000}> Save </button>
          </form>
        </div>

      </div>
    </div>
    </>
  )
}
