import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import NavBar from "../NavBar"
import SideBarMenu from "../SideBarMenu"
import MessageForm from "../MessageForm"

import "./Messages.css"


export default function AllMessages() {


  return (
    <>
    <NavBar />
    <SideBarMenu />
    <div className='messages-overall-container'>
      <div className='messages-sidebar'> ALL MESSAGES HERE PER USER! </div>
      <div className='messages-conversation'> CURRENTCONVO! </div>
    </div>
    <MessageForm />
    </>
  )
}
