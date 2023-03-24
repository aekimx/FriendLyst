import React from "react"
import { Link } from "react-router-dom"


import "./Comments.css"

export default function AllComments({comments}) {

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

          </div>
        )
      })}
      </div>
    </>
  )
}
