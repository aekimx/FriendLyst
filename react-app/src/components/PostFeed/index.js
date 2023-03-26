import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPostsThunk} from "../../store/post";
import { Link } from "react-router-dom";
import CommentsForm from "../CommentsForm";
import AllComments from "../Comments"
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
        <div className='postfeed-each-post-container' key={`feedpostpost${post.id}`}>

          <div className="postfeed-propic-name-time">

            <img src = {post.user?.profilePic } alt='person' className='postfeed-userpost-pic'/>
            <div>
              <div className='postfeed-name'> {post.user?.firstName} {post.user?.lastName} </div>
              <div className='postfeed-time'> {post.createdAt.split(" ")[4].slice(0,5)} </div>
            </div>

          </div>

          <div className='postfeed-edit-delete'>
          {user?.id === post.userId ?
          <>
          <OpenModalButton
          className='postfeed-editpost'
          buttonText={<i class="fa-solid fa-gear postfeed-gear-icon" />}
          modalComponent={<PostUpdate post={post} />}
          />

          <OpenModalButton
          className='postfeed-editpost'
          buttonText= {<i class="fa-solid fa-xmark postfeed-x-icon" />}
           modalComponent={<PostDelete postId={post.id} />}
          />
          </>
          : null }
          </div>

          <div className='feedpost-caption-photo'>
            <Link to={`/posts/${post.id}`} className='postfeed-user-prof-link'>
              <div> Caption: {post.caption} </div>
              {post.photo ? <img src={post.photo} alt='post' className="postfeed-post-pic"/> : null }
            </Link>
          </div>


          <div className='feed-like-comment-count'>
            { post.likes.length > 0 ? <div> {post.likes.length} {post.likes.length === 1 ? "like" : "likes "} </div> : <div></div>}
            <div className='feed-comments'> {post.comments?.length > 0 ? `${post.comments.length} ${post.comments.length === 1 ? 'comment' : 'comments'}` : null }</div>
          </div>

          <div className='feed-like-comment-buttons'>
            <div className='feed-like-button'>
            <i className="fa-regular fa-thumbs-up" />
              <div className='feed-like-text'> Like </div>
            </div>

            <div className='feed-comment-button'>
              <i className="fa-regular fa-message" />
              <div className='feed-comment-text'> Comment </div>
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
