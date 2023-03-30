import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import {createMessageThunk, getDirectMessageThunk} from "../../store/message"
import { io } from 'socket.io-client';


import "./MessageForm.css"

let socket;

export default function MessageForm () {
  const dispatch = useDispatch();

  let {userId, dmId} = useParams();
  userId = +userId.split(".")[2];

  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);

  const user = useSelector(state => state.session.user)

  useEffect(() => {
    // open socket connection - create websocket
    socket = io();

    if (socket && user) {
      socket.emit('join', { dm_id: dmId, first_name: user.firstName })

      socket.on("chat", (chat) => {
        setMessages(messages => [...messages, chat])
      })
  }
    // when component unmounts, disconnect
    return (() => {
      socket.disconnect()
    })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    let newMessage = {dm_id: dmId, message: content, sender_id: user?.id }
    if (socket) {
      socket.emit("chat", newMessage);
    }

    await dispatch(createMessageThunk(newMessage))
    await dispatch(getDirectMessageThunk(+dmId))

    setContent("")
  }

  return (user && (
    <>
    <div className='messageform-container'>
    {/* <div>
        {messages.map((message, ind) => (
            <div key={ind}>{`${message.user}: ${message.msg}`}</div>
        ))}
    </div> */}

        <form onSubmit={handleSubmit}>
          <div> {content.length === 2000 ? 'Messages must be less than 2000 characters' : null}</div>
          <div className='messageform-input-container'>
            <input
            placeholder='Aa'
            type='text'
            value={content}
            maxLength='2000'
            onChange={(e) => setContent(e.target.value)}
            className='messageform-input'/>

            <button type="submit">Send</button>
          </div>
        </form>
    </div>
    </>
    )
  )
};
