import React from "react"
import { useDispatch } from "react-redux";
import { deleteCommentThunk, getAllPostsThunk } from "../../store/post";
import { useModal } from "../../context/Modal";

import './CommentDelete.css'

export default function CommentDelete({comment}) {
  const dispatch = useDispatch()
  const { closeModal } = useModal();

  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(deleteCommentThunk(comment))
    dispatch(getAllPostsThunk(comment.userId))
    .then(() => {closeModal()})

  }

  return (
    <>
    <div className='deletecomment-modal-container'>
      <div className='deletecomment-header'>
        <div> </div>
        <div className='deletecomment-confirm-text'> Are you sure you want to delete your comment? </div>
        <div onClick={closeModal}>
        <i class="fa-solid fa-x deletecomment-x-icon" />
        </div>
      </div>

      <div className='deletecomment-action-text'> This action cannot be undone </div>
      <div className='deletecomment-button-container'>
        <button onClick={handleDelete} className='deletecomment-deletebutton'> Delete </button>
        <button onClick={closeModal} className='deletecomment-cancelbutton'> Cancel </button>
      </div>
    </div>
    </>
  )
}
