import React from "react"
import { useDispatch } from "react-redux";
import { deletePostThunk } from "../../store/post";
import { useModal } from "../../context/Modal";

export default function PostDelete(postId) {
  const dispatch = useDispatch()
  const { closeModal } = useModal();

  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(deletePostThunk(postId))
    .t

  }

  return (
    <>
    <div>
      <div> Are you sure you want to delete? </div>
      <button onClick={handleDelete}> Delete </button>
      <button onClick={closeModal}> Cancel </button>
    </div>
    </>
  )
}
