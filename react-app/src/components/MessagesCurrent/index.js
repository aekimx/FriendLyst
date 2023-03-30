import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllMessagesThunk } from "../../store/message"
import MessageForm from "../MessageForm"

export default function MessagesCurrent() {

  const messages = useSelector(state => state.messages.currentConvo)

  return (
    <>
    <div className='messages-conversation'>
      <div> MESSAGE </div>
      <div> MESSAGE </div>
      <div> MESSAGE </div>
      <div> MESSAGE </div>
      <div> MESSAGE </div>
      <div> MESSAGE </div>
      </div>

      <MessageForm />
    </>
  )
}
