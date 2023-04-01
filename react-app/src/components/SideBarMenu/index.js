import { useSelector } from 'react-redux'
import {  NavLink } from 'react-router-dom'

import './SideBarMenu.css'

export default function SideBarMenu() {
  const user = useSelector(state => state.session?.user)

  const newFeatureAlert = (e) => {
    e.preventDefault();
    window.alert('Feature Coming Soon...');
  }

  return (
    <>
    <div className='sidebar-menu-container'>
      <div className='sidebar-smaller-container'>

        <div className='sidebar-link'>

        <NavLink to={`/${user?.firstName}.${user?.lastName}.${user?.id}/profile`} className='sidebar-link'>
          <i className="fa-solid fa-user" />
          <span> User Profile </span>
        </NavLink>
        </div>

        <div className='sidebar-link'>

          <NavLink to={`/${user?.firstName}.${user?.lastName}.${user?.id}/friends`} className='sidebar-link'>
            <i class="fa-solid fa-users" />
            <span> Friends </span>
          </NavLink>
        </div>

        <div className='sidebar-link'>

          <NavLink to={`/${user?.firstName}.${user?.lastName}.${user?.id}/requests`} className='sidebar-link'>
            <i className="fa-solid fa-user-plus" />
            <span> Friend Requests </span>
          </NavLink>
        </div>

        <div className='sidebar-link' >
          <NavLink to={`/${user?.firstName}.${user?.lastName}.${user?.id}/messages`} className='sidebar-link'>
            <i class="fa-solid fa-comments" />
            <span> Messages </span>
          </NavLink>
        </div>

        <div className='sidebar-link' onClick={newFeatureAlert}>
          {/* <NavLink to={`/${user?.firstName}.${user?.lastName}.${user?.id}/events`} className='sidebar-link'> */}
            <i class="fa-solid fa-calendar-plus" />
            <span> Events </span>
          {/* </NavLink> */}
        </div>

        <div className='sidebar-link' onClick={newFeatureAlert}>
          {/* <NavLink to='placeholder' className='sidebar-link'> */}
            <i class="fa-solid fa-users-rectangle" />
            <span> Groups </span>
          {/* </NavLink> */}
        </div>

        {/* <div className='sidebar-link'> <i class="fa-solid fa-shop" /> Marketplace </div> */}
      </div>
    </div>
    </>
  )
}
