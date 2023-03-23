import React from "react"
import { useSelector } from "react-redux"


export default function PostDetail() {

  const post = useSelector(state => state.post.post)

  return (
    <>
    <div> TESTING </div>
    </>
  )
}
