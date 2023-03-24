import React from "react"
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import "./NavBar.css"

export default function NavBar() {
  const user = useSelector(state => state.session.user)

  return (
    <>
    <div className='home-navbar'>
        <div className='home-logo-search'>
          <Link to={'/home'} > Home </Link>
          <input type='text' placeholder='Search Facebook' className='navbar-searchbar'/>
        </div>
        <div className='home-navbar-middle-icons'>
          <div className='home-home'> <i className="fa-solid fa-house"/> </div>
          <div className='home-video'> <i className="fa-solid fa-video" /> </div>
          <div className='home-store'> <i className="fa-solid fa-store" /> </div>
          <div className='home-game'> <i className="fa-solid fa-gamepad" /> </div>
        </div>
        <div>
          <Link to={`/users/${user?.id}`}> User Profile </Link>
          {/* <div> User Profile</div> */}
        </div>
    </div>
    </>
  )
}
