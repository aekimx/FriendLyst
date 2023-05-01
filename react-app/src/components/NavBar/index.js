import React, { useState } from "react"
import { Link, useHistory, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchUsersThunk } from "../../store/user";
import { logout } from "../../store/session";

import "./NavBar.css"

export default function NavBar() {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(state => state.session.user);

  const [search, setSearch] = useState('');

  let userId;
  if (user) userId = user.id;
  // if (!user) return ( <Redirect to='/' /> )

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(searchUsersThunk(search))
    setSearch("")
    history.push("/search/results")
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout())
    .then(() => history.push("/"))
  };


  return (
    <>
    <div className='home-navbar'>

        <div className='home-logo-search'>
          <Link to={'/home'} > <img src='https://friendlyst-bucket.s3.amazonaws.com/FullLogo_Transparent_NoBuffer.png' className='navbar-logo'/> </Link>

          <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Search FriendLyst'
            className='navbar-searchbar' onChange={(e) => setSearch(e.target.value)} />
            <button type='submit' className='navbar-searchbutton'> <i className="fa-solid fa-magnifying-glass" />  </button>
          </form>

        </div>

        {/* <div className='home-navbar-middle-icons'> */}
          <Link to={'/home'} > <i className="fa-solid fa-house home-home"/> </Link>
          {/* <i className="fa-solid fa-video home-video" />
          <i className="fa-solid fa-store home-store" />
          <i className="fa-solid fa-gamepad home-game" /> */}
        {/* </div> */}

        <div className='navbar-profileimg-container'>
          <div onClick={handleLogout} className='home-navbar-logout'> Logout </div>
          <Link to={`/${user?.firstName}.${user?.lastName}.${user?.id}/profile`} >
            <img src={user?.profilePic} className='home-navbar-profile-link'/>
          </Link>
        </div>

    </div>
    </>
  )
}
