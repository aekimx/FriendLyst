import React from "react"
import { useDispatch } from "react-redux"
import { getAllPostsThunk, updateCommentThunk } from "../../store/post"
import { useState } from "react"
import { useModal } from "../../context/Modal";

import './CommentUpdate.css'

export default function CommentUpdate({comment}) {
  const dispatch = useDispatch()
  const { closeModal } = useModal();

  const [content, setContent] = useState(comment.comment)

  let commentId = comment?.id

  const handleSubmit = (e) => {
    e.preventDefault()
    let updatedComment = {comment: content, userId: comment.user.id, postId: comment.postId}

    dispatch(updateCommentThunk(updatedComment, commentId))
    dispatch(getAllPostsThunk(comment.user.id))
    .then(() => {closeModal()})
  }



  return (
    <>
    <div className='commentupdate-modal-container'>

      <div className='postupdate-edit-text'>
        <div> </div>
        <div>Edit Comment </div>
        <div onClick={closeModal} className='commentupdate-closemodal'>
        <i className="fa-solid fa-x" />
        </div>
      </div>

      <div className='commentupdate-modal'>

        <div className='commentupdate-profpic-user'>
          <img src={comment.user?.profilePic} className='commentupdate-modal-profpic'/>
          <div className='commentupdate-user-name'>  {comment.user?.firstName} {comment.user?.lastName} </div>
        </div>

        <div className='commentupdate-form-container'>
          <form onSubmit={handleSubmit}>
            <textarea placeholder={`What's on your mind, ${comment.user?.firstName}?`}
            value={content}
            className='commentupdate-textarea'
            maxLength='500'
            onChange={(e) => setContent(e.target.value)}
            />
            <div className='commentupdate-error'> {content.length === 500 ? 'Comments must be less than 500 characters' : null}</div>
            <div className='commentupdate-error'> {content.length === 0 ? 'Comment is required' : null}</div>

            <button className='commentupdate-update-button' type='submit'
            disabled={content.length < 1 || content.length === 500}> Save </button>
          </form>
        </div>


      </div>
    </div>
    </>
  )
}
