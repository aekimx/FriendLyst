import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPostsThunk} from "../../store/post";
import { Link } from "react-router-dom";
import CommentsForm from "../CommentsForm";
import AllComments from "../Comments"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faXmark, faMessage, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import PostUpdate from "../PostUpdate/index"
import OpenModalButton from "../OpenModalButton"
import PostDelete from "../PostDelete";

import './PostFeed.css'

export default function PostFeed() {
  const dispatch = useDispatch()

  const allPosts = useSelector(state => state.post?.allPosts)
  const user = useSelector(state => state.session?.user)


  useEffect(() => {
    dispatch(getAllPostsThunk(user?.id))
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

          <OpenModalButton buttonText={<FontAwesomeIcon icon={faXmark} className='postfeed-x-icon'
            />} modalComponent={<PostDelete postId={post.id} />} />


          </div>

          <div className='feedpost-caption-photo'>
            <Link to={`/posts/${post.id}`} className='postfeed-user-prof-link'>
              <div> Caption: {post.caption} </div>
              {post.photo ? <img src={post.photo} alt='post' className="postfeed-post-pic"/> : null }
            </Link>
          </div>


          <div className='feed-like-comment-count'>
            <div> 1 Like </div>
            <div className='feed-comments'> {post.comments?.length > 0 ? `${post.comments.length} Comments` : null }</div>
          </div>

          <div className='feed-like-comment-buttons'>
            <div className='feed-like-button'>
              <FontAwesomeIcon icon={faThumbsUp} />
              <div> Like </div>
            </div>

            <div className='feed-comment-button'>
              <FontAwesomeIcon icon={faMessage} />
              <div> Comment </div>
            </div>
          </div>

          <AllComments comments={post.comments} />
          <CommentsForm postId={post.id}/>

        </div>
        </>
      )
    })}
    </div>
    </>
  )
}
