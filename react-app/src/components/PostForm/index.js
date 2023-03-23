import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

export default function PostForm() {
  const dispatch = useDispatch()

  const user = state.session.user

  return (
    <>
    <input placeholder={`What's on your mind, ${user.firstName}?`} />
    </>
  )

}
