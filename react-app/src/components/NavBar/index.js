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
          <div> LOGO </div>
          <input type='text' placeholder='Search Facebook' />
        </div>
        <div className='home-navbar-middle-icons'>
          <div> House </div>
          <div> Watch </div>
          <div> Marketplace </div>
          <div> Groups </div>
          <div> Gaming </div>
        </div>
        <div>
          <Link to={`/users/${user?.id}`}> User Profile </Link>
          {/* <div> User Profile</div> */}
        </div>
    </div>
    </>
  )
}
