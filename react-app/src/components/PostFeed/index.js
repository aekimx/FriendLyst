import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPostsThunk } from "../../store/post";

import './PostFeed.css'

export default function PostFeed() {
  const dispatch = useDispatch()

  const allPosts = useSelector(state => state.post?.allPosts)

  useEffect(() => {
    dispatch(getAllPostsThunk())
  }, [dispatch])

  if (!allPosts) return null;
  let postsArr;
  if (allPosts) postsArr = Object.values(allPosts)

  return (
    <>
    <div className='postfeed-container'>
    {postsArr.map(post => {
      return (
        <>
        <div className='postfeed-each-post-container'>

        <div key={`feedpost${post.id}`} className=''>
          <img src = {post.user?.profilePic } alt='person' className='postfeed-userpost-pic'/>
          <div> {post.user?.firstName} {post.user?.lastName} </div>
          <div> {post.createdAt} </div>
          <div> Caption: {post.caption} </div>
          {post.photo ? <img src={post.photo} alt='post' className="postfeed-post-pic"/> : null }
        </div>
          <div> WHO LIKED HERE </div>
          <div> OPTION TO LIKE HERE </div>
          <div> HOW MANY COMMENTS  </div>
          <div> COMMENTS GO HERE </div>
          <div> OPTION TO COMMENT GOES HERE </div>

        </div>
        </>
      )
    })}
    </div>
    </>
  )
}
