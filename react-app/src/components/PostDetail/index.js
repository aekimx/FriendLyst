import React, { useEffect }  from "react"
import { useSelector, useDispatch } from "react-redux"
import { getPostDetailThunk, clearPost } from "../../store/post"
import { useParams } from "react-router-dom"
import NavBar from "../NavBar"

import "./PostDetail.css"

export default function PostDetail() {
  const dispatch = useDispatch()
  const {id} = useParams()

  const post = useSelector(state => state.post.post)

  useEffect(() => {
    dispatch(getPostDetailThunk(id))
    return () => dispatch(clearPost())
  }, [dispatch, id])

  const commentsArr = post?.comments



  return (
    <>
    <NavBar />
    <div className='postdetail-container'>
      <div className='postdetail-photo-container'>
        <img src={post.photo} className='postdetail-photo'/>
      </div>

        <div className='postdetail-userinfo'>
          <div className='postdetail-user-name'>
            <img src={post.user?.profilePic} alt='userimage' className='postdetail-userprof'/>
            <div>
              <div> {post.user?.firstName} {post.user?.lastName} </div>
              <div> {post.createdAt} </div>
            </div>
          </div>
          <div className='postdetail-caption'> {post.caption} </div>
          </div>

        <div className='postdetail-comments-overall-container'>
          <div className='postdetail-comments-text'> Comments </div>
          {commentsArr?.map(comment => {
            return (
              <div key={`comment${comment.id}`} className='postdetail-each-comment'>

                <img src={comment.user.profilePic} className='postdetail-comment-userprof'/>
                <div className='postdetail-comment-userinfo'>

                  <div className='postdetail-comment-name-time'>
                    <div> {comment.user.firstName} {comment.user.lastName} </div>
                    <div className='postdetail-comment-createdat'> {comment.createdAt.slice(0,11)} </div>
                  </div>

                  <div className='postdetail-comment-content'> {comment.comment} </div>

                </div>

              </div>
            )
          })}
        </div>



    </div>
    </>
  )
}
