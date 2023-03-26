import React, { useState, useRef, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import OpenModalButton from "../OpenModalButton"
import CommentDelete from "../CommentDelete"
import CommentUpdate from "../CommentUpdate"

import './CommentOptions.css'

export default function CommentOptions({comment}) {
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

  const ulClassName = 'emojismodal-openmodalmenu' + (showMenu ? "" : " hidden")

  return (
    <>
    <div className='commentoptions-container'>

      <FontAwesomeIcon icon={faEllipsis} className='post-comment-options'
      onClick={openMenu} />
    </div>

    <div className={ulClassName} ref={ulRef}>
      <div className='commentoptions-dropdown'>

        <OpenModalButton
        buttonText='Edit'
        modalComponent={<CommentUpdate comment={comment}/>}
        className='commentoptions-edit'/>

          <OpenModalButton
          buttonText='Delete'
          modalComponent={<CommentDelete comment={comment}/>}
          className='commentoptions-delete'
          />

      </div>
    </div>
    </>
  )
}
