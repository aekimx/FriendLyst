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
    dispatch(logout());
    history.push("/");
  };

  // 1. Once you come up with a logo for the site, it would be cool if you could change the Home button to the logo and perhaps
  // use some padding or margin to move it in from the far left side.
  // 2. When I type in a bogus email and a weak password for the login, there is an error message that renders 'password: No such user exists'.
  //Seems like an odd prefix for that message. 3. I think there should be some kind of constarint on the password. It allowed me to enter a 1 character password to signup!
  // 4. I notice that I can signup as a new user without entering age or gender. Not sure if you meant these to be required.
  // Additionally, the signup form needs some styling, but you already know that!!
  //4. Are we doing anything to verify that the input to the email box is an email address? For example, checking that the string contains an '@' symbol, etc.?
  // Additionally there are some cool regexs out there that you can use to validate form data. If yuo google 'email regex' you'll find plenty of cool examples!
  //5. NOTE: I marked Logout Functionality as NO, because... wait for it.... i CAN'T FIND THE LOGOUT BUTTON!! Maybe I'm missing something obvious!


  return (
    <>
    <div className='home-navbar'>

        <div className='home-logo-search'>
          <Link to={'/home'} > Home </Link>

          <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Search FriendLyst'
            className='navbar-searchbar' onChange={(e) => setSearch(e.target.value)} />
            <button type='submit' className='navbar-searchbutton'> <i className="fa-solid fa-magnifying-glass" />  </button>
          </form>

        </div>

        <div className='home-navbar-middle-icons'>
          <Link to={'/home'} > <i className="fa-solid fa-house home-home"/> </Link>
          <i className="fa-solid fa-video home-video" />
          <i className="fa-solid fa-store home-store" />
          <i className="fa-solid fa-gamepad home-game" />
        </div>

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
