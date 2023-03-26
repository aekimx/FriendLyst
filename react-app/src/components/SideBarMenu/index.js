import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import './SideBarMenu.css'

export default function SideBarMenu() {
  const user = useSelector(state => state.session?.user)

  return (
    <>
    <div className='sidebar-menu-container'>
        <div> User Profile </div>
        <div> <Link to={`/${user.firstName}${user.lastName}${user.id}/friends`}> Friends </Link></div>
        <div> Friend Requests </div>
        <div> Groups </div>
        <div> Events </div>
        <div> Messages </div>
        <div> Marketplace </div>
      </div>
    </>
  )
}
