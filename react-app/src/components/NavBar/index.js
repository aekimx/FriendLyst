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
          <Link to={'/home'} > <i className="fa-solid fa-house home-home"/> </Link>
          <i className="fa-solid fa-video home-video" />
          <i className="fa-solid fa-store home-store" />
          <i className="fa-solid fa-gamepad home-game" />
        </div>
        <div>
          <Link to={`/${user.firstName}.${user.lastName}.${user.id}/profile`} userId={user?.id}> User Profile </Link>
          {/* <div> User Profile</div> */}
        </div>
    </div>
    </>
  )
}
