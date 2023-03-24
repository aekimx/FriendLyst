import React from "react"


import "./Comments.css"

export default function AllComments({comments}) {

  if (!comments.length) return null


  return (
    <>
      {comments.map(comment => {
        return (
          <div key={`postcomment${comment.id}`} className='post-comment-container'>
            <img src={comment.user.profilePic} alt='profilepic' className='post-comment-profpic'/>

            <div className='post-comment-comment'>
              <div> {comment.user.firstName} {comment.user.lastName} </div>
              <div> {comment.comment} </div>
            </div>

          </div>
        )
      })}
    </>
  )
}
