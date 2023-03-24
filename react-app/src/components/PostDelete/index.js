import React from "react"
import { useDispatch } from "react-redux";
import { deletePostThunk } from "../../store/post";
import { useModal } from "../../context/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faXmark } from '@fortawesome/free-solid-svg-icons'

import "./PostDelete.css"

export default function PostDelete(postId) {
  const dispatch = useDispatch()
  const { closeModal } = useModal();

  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(deletePostThunk(postId))
    .then(() => {closeModal()})

  }

  return (
    <>
    <div className='deletepost-modal-container'>
      <div className='deletepost-header'>
        <div> </div>
        <div className='deletepost-confirm-text'> Are you sure you want to delete your post? </div>
        <div onClick={closeModal}> <FontAwesomeIcon icon={faXmark} className='postdelete-x-icon' /> </div>
      </div>

      <div className='deletepost-action-text'> This action cannot be undone </div>
      <div className='deletepost-button-container'>
        <button onClick={handleDelete} className='deletepost-deletebutton'> Delete </button>
        <button onClick={closeModal} className='deletepost-cancelbutton'> Cancel </button>
      </div>
    </div>
    </>
  )
}
