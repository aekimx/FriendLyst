import React, { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import CommentOptions from "../CommentOptions"


import "./Comments.css"

export default function AllComments({comments}) {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  if (!comments.length) return null

  const ulClassName = 'emojismodal-openmodalmenu' + (showMenu ? "" : " hidden")

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
              <CommentOptions />
            </div>


          </div>
        )
      })}
      </div>
    </>
  )
}
