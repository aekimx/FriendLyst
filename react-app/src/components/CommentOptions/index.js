import React, { useState, useRef, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'

import './CommentOptions.css'

export default function CommentOptions( ) {

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
        <div className='commentoptions-edit'> Edit </div>
        <div className='commentoptions-delete'> Delete </div>
      </div>
    </div>
    </>
  )
}
