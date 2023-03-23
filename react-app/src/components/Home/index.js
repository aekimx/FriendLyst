import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import PostForm from "../PostForm";
import PostFeed from "../PostFeed";
import NavBar from "../NavBar";
import SideBarMenu from "../SideBarMenu";

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


  return (
    <>
    <div className='home-feed-overall-container'>
      <NavBar />
      <SideBarMenu />

      <div className='home-feed-middle-container'>
        <PostForm />
        <PostFeed />

      </div>

      <div className='home-feed-right-contacts'>
        <div>USER</div>
        <div>USER</div>
        <div>USER</div>
        <div>USER</div>
        <div>USER</div>
      </div>

    {/* <div onClick={handleLogout}> Logout </div> */}

    </div>
    </>
  )
}
