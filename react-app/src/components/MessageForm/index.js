import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
// import {createMessageThunk } from "../../store/message"
import { createMessage } from "../../store/message";
import { io } from 'socket.io-client';
import MessagesCurrent from "../MessagesCurrent"
import "./MessageForm.css"
let socket;

export default function MessageForm () {
  const dispatch = useDispatch();

  let {userId, dmId} = useParams();
  userId = +userId.split(".")[2];
  const user = useSelector(state => state.session.user)

  const [content, setContent] = useState("");
  const [messages, setMessages] = useState({});

  useEffect(() => {
    // open socket connection - create websocket
    socket = io();

    if (socket && user) {
      // join the DM room
      socket.emit('join', { dm_id: +dmId, first_name: user.firstName }, (res) => {
        console.log('Response from joining room: ', res)
      })

      socket.on("chat", (chat) => setMessages(chat) )
    }
    // when component unmounts, disconnect
    return ( () => {
      socket.emit('leave', { dm_id: +dmId, username: user.username }, (res) => {
        console.log("Response from leave room", res)
      })
      socket.disconnect()
    }
      )
  }, [dmId])

  const handleSubmit = async (e) => {
    e.preventDefault()

    let data = {dm_id: dmId, message: content, sender_id: userId };
    // let createdMessage = await dispatch(createMessageThunk(newMessage));

    if (socket) socket.emit("chat", data, (res) => {
      console.log('Response from sending chat: ', res)
      dispatch(createMessage(res))
    })
    setContent("")
  }

  return (user && (
    <>
    <MessagesCurrent messages={messages}/>
    <div className='messageform-container'>

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

            <button type="submit" className='messageform-button'><i class="fa-solid fa-paper-plane" /></button>
          </div>
        </form>
    </div>
    </>
    )
  )
};
