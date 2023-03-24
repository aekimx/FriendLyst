import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPostsThunk } from "../../store/post";
import { Link } from "react-router-dom";
import CommentsForm from "../CommentsForm";
import AllComments from "../Comments"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faXmark } from '@fortawesome/free-solid-svg-icons'
import PostUpdate from "../PostUpdate/index"
import OpenModalButton from "../OpenModalButton"

import './PostFeed.css'

export default function PostFeed() {
  const dispatch = useDispatch()

  const allPosts = useSelector(state => state.post?.allPosts)
  const user = useSelector(state => state.session.user)

  let userId;
  if (user) userId = user.id

  useEffect(() => {
    dispatch(getAllPostsThunk(userId))
  }, [dispatch])

  if (!allPosts) return null;

  let postsArr;
  if (allPosts) postsArr = Object.values(allPosts)

  // Newest posts first!
  postsArr.reverse()


  return (
    <>
    <div className='postfeed-container'>
    {postsArr.map(post => {
      return (
        <>
        <div className='postfeed-each-post-container' key={`feedpost${post.id}`}>

          <div className="postfeed-propic-name-time">

            <img src = {post.user?.profilePic } alt='person' className='postfeed-userpost-pic'/>
            <div>
              <div className='postfeed-name'> {post.user?.firstName} {post.user?.lastName} </div>
              <div className='postfeed-time'> {post.createdAt.split(" ")[4].slice(0,5)} </div>
            </div>

          </div>

          <div className='postfeed-edit-delete'>

          <OpenModalButton buttonText={<FontAwesomeIcon icon={faGear} className='postfeed-gear-icon'
            />} modalComponent={<PostUpdate post={post} />} />

            <FontAwesomeIcon icon={faXmark} className='postfeed-x-icon' />
          </div>

          <div className='feedpost-caption-photo'>
            <Link to={`/posts/${post.id}`} className='postfeed-user-prof-link'>
              <div> Caption: {post.caption} </div>
              {post.photo ? <img src={post.photo} alt='post' className="postfeed-post-pic"/> : null }
            </Link>
          </div>


          <div className='feed-like-comment-count'>
            <div> WHO LIKED HERE </div>
            <div className='feed-comments'> HOW MANY COMMENTS  </div>
          </div>

          <div className='feed-like-comment-buttons'>
            <div className='feed-like-button'> LIKE BUTTON </div>
            <div className='feed-comment-button'> COMMENT BUTTON </div>
          </div>

          <CommentsForm postId={post.id}/>
          <AllComments comments={post.comments} />

        </div>
        </>
      )
    })}
    </div>
    </>
  )
}
