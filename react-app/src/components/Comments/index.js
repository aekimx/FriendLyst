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

              <Link to={`/${comment.user?.firstName}.${comment.user?.lastName}.${comment.user.id}/profile`} className='post-comment-link'>
                <div> {comment.user.firstName} {comment.user.lastName} </div>
              </Link>

              <div className='post-comment-content'> {comment.comment} </div>

            </div>

              {user?.id == comment.userId ?  <div className='post-comment-options-div'> <CommentOptions comment={comment}/> </div> : null}


          </div>
        )
      })}
      </div>
    </>
  )
}
