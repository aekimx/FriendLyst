import NavBar from "../NavBar"
import SideBarMenu from "../SideBarMenu"
import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import "./SearchResults.css"


export default function SearchResults() {

  const results = useSelector(state => state.user.search)

  const resultsArr = Object.values(results)

  return (
    <>
    <NavBar />
    <SideBarMenu />
    <div className='searchresults-overall-container'>
      <div className='searchres-text'> Search Results </div>
      <div className='searchres-people'> People </div>

      {resultsArr.length === 0 ? <div className='searchres-none'> No Results Found! Please try again. </div> :
      <>
      {resultsArr.map(user => {
        return (
          <div key={`searchuser${user.id}`} className='searchres-each-user'>
            <img src={user.profilePic} className='searchres-userprof'/>

            <div className="searchres-username">
              <Link to={`/${user.firstName}.${user.lastName}.${user.id}/profile`} className='searchres-user-link'>
                {user.firstName} {user.lastName}
              </Link>
            </div>
          </div>
        )
      })}
      </>
      }
    </div>
    </>
  )
}
