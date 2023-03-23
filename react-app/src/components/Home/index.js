import React from "react"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";

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




  return (
    <>
    <div className='home-navbar'>
        <div> FL Logo Here</div>
        <input type='text' placeholder='Search Facebook' />
        <div>
        <div> House </div>
        <div> Watch </div>
        <div> Marketplace </div>
        <div> Groups </div>
        <div> Gaming </div>
      </div>

      <div className='home-feed-container'>
      <div className='sidebar-menu'>
        <div> User Profile </div>
        <div> Friends </div>
        <div> Friend Requests </div>
        <div> Groups </div>
        <div> Events </div>
        <div> Marketplace </div>

      </div>

      </div>
    </div>
    <div onClick={handleLogout}> Logout </div>
    </>
  )
}
