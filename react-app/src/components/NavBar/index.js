import React from "react"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./NavBar.css"

export default function NavBar() {
  const user = useSelector(state => state.session.user)

  let userId;
  if (user) userId = user.id;

  return (
    <>
    <div className='home-navbar'>

        <div className='home-logo-search'>
          <Link to={'/home'} > Home </Link>
          <input type='text' placeholder='Search Facebook' className='navbar-searchbar'/>
        </div>

        <div className='home-navbar-middle-icons'>
          <Link to={'/home'} > <i className="fa-solid fa-house home-home"/> </Link>
          <i className="fa-solid fa-video home-video" />
          <i className="fa-solid fa-store home-store" />
          <i className="fa-solid fa-gamepad home-game" />
        </div>

        <div className='navbar-profileimg-container'>
          <Link to={`/${user.firstName}.${user.lastName}.${user.id}/profile`} >
            <img src={user.profilePic} className='home-navbar-profile-link'/>
          </Link>
        </div>

    </div>
    </>
  )
}
