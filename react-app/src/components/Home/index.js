import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../store/session";

import './HomePage.css'

export default function HomePage() {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout())
    .then(() => {
      history.push("/")
    });
  };

  const user = useSelector(state => state.session.user)



  return (
    <>
    <div className='home-feed-overall-container'>
    <div className='home-navbar'>
        <input type='text' placeholder='Search Facebook' />
        <div className='home-navbar-middle-icons'>
          <div> House </div>
          <div> Watch </div>
          <div> Marketplace </div>
          <div> Groups </div>
          <div> Gaming </div>
        </div>
        <div>
          <Link to={`/users/${user.id}`}> User Profile </Link>
          {/* <div> User Profile</div> */}
        </div>
    </div>

      <div className='home-feed-container'>
      <div className='sidebar-menu'>
        <div> User Profile </div>
        <div> Friends </div>
        <div> Friend Requests </div>
        <div> Groups </div>
        <div> Events </div>
        <div> Messages </div>
        <div> Marketplace </div>
      </div>

      <div className='home-feed-middle-container'>
        <div> POST FORM COMPONENT GOES HERE </div>
        <div> ALL POSTS HERE </div>
        <div> ALL POSTS HERE </div>
        <div> ALL POSTS HERE </div>
      </div>

      <div className='home-feed-right-contacts'>
        <div>USER</div>
        <div>USER</div>
        <div>USER</div>
        <div>USER</div>
        <div>USER</div>
      </div>


      </div>

    {/* <div onClick={handleLogout}> Logout </div> */}

    </div>
    </>
  )
}
