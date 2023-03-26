import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import CommentOptions from "../CommentOptions"


import "./Comments.css"

export default function AllComments({comments}) {

  const user = useSelector(state => state.session.user)

  if (!comments.length) return null


  return (
    <>
    <div className='postcomments-overall-container'>
      {comments.map(comment => {
        return (
          <div key={`postcomment${comment.id}`} className='post-comment-container'>
            <img src={comment.user.profilePic} alt='profilepic' className='post-comment-profpic'/>

            <div className='post-comment-comment'>

              <Link to={`/users/${comment.user.id}`} className='post-comment-link'>
                <div> {comment.user.firstName} {comment.user.lastName} </div>
              </Link>

              <div className='post-comment-content'> {comment.comment} </div>

            </div>

            <div className='post-comment-options-div'>
              {user?.id == comment.userId ? <CommentOptions comment={comment}/> : null}
            </div>


          </div>
        )
      })}
      </div>
    </>
  )
}
