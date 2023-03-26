import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import './SideBarMenu.css'

export default function SideBarMenu() {
  const user = useSelector(state => state.session?.user)

  return (
    <>
    <div className='sidebar-menu-container'>
      <div className='sidebar-smaller-container'>

        <div className='sidebar-link'>
        <i className="fa-solid fa-user" />
        <Link to={`/${user.firstName}.${user.lastName}.${user.id}/profile`} className='sidebar-link'> User Profile </Link>
        </div>

        <div className='sidebar-link'>
          <i class="fa-solid fa-users" />
          <Link to={`/${user.firstName}.${user.lastName}.${user.id}/friends`} className='sidebar-link'> Friends </Link>
        </div>

        <div className='sidebar-link'>
          <i className="fa-solid fa-user-plus" />
          <Link to={`/${user.firstName}.${user.lastName}.${user.id}/requests`} className='sidebar-link'> Friend Requests </Link>
        </div>


        <div className='sidebar-link'> <i class="fa-solid fa-users-rectangle" /> Groups </div>
        <div className='sidebar-link'> <i class="fa-solid fa-calendar-plus" /> Events </div>
        <div className='sidebar-link'> <i class="fa-solid fa-comments" /> Messages </div>
        <div className='sidebar-link'> <i class="fa-solid fa-shop" /> Marketplace </div>
      </div>
    </div>
    </>
  )
}
