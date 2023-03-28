import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchUsersThunk } from "../../store/user";

import "./NavBar.css"

export default function NavBar() {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(state => state.session.user);

  const [search, setSearch] = useState('');

  let userId;
  if (user) userId = user.id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(searchUsersThunk(search))
    .then(() => history.push("/search/results"))
    .catch((res) => console.log('error!', res))

    setSearch("")

  }


  return (
    <>
    <div className='home-navbar'>

        <div className='home-logo-search'>
          <Link to={'/home'} > Home </Link>

          <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Search FriendLyst'
            className='navbar-searchbar' onChange={(e) => setSearch(e.target.value)} />
            <button type='submit'> search </button>
          </form>

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
