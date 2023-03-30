import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import {  getAllPostsThunk } from "../../store/post";
import { createUserPostThunk, getUserPostsThunk } from "../../store/user";

import './UserProfilePostForm.css'

export default function UserProfPostForm() {
  const dispatch = useDispatch()

  const user = useSelector(state => state.session.user);

  const [caption, setCaption] = useState("");
  const [photo, setPhoto] = useState('');

  let userId;
  if (user) userId = user.id

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append('user_id', user.id);
    formData.append("photo", photo);

    dispatch(createUserPostThunk(formData))
    dispatch(getUserPostsThunk(userId))
    setCaption("")
    setPhoto("")
  }

  const updatePhoto = (e) => { setPhoto(e.target.files[0]) }

  if (!user) return null;

  return (
    <>
    <div className='userprof-postform-container'>
      <img src={user.profilePic} alt='profile' className='userprof-user-profpic'/>
      <form className='userprof-post-form'
        onSubmit={handleSubmit}
        encType="multipart/form-data">

          <div className='userprof-inside-form-container'>

            <input type='text'
            placeholder={`What's on your mind, ${user.firstName}?`}
            onChange={(e) => {setCaption(e.target.value)}}
            value={caption}
            maxLength='2000'
            style={{ color: 'rgb(228,230,235)', paddingLeft:'10px', outline:"none"}}
            className='userprof-postform-inputtext'
            />

          <div className='userprof-postform-upload-container'>
          <label htmlFor="userprof-postform-fileupload" className='userprof-postform-label'>
          <i className="fa-solid fa-image" />
            <input
                  type="file"
                  accept="image/*"
                  onChange={updatePhoto}
                  id='userprof-postform-fileupload'
                />
                </label>
            {photo ? <div className="userprof-postform-uploaded"> File Attached </div> : null}
            </div>

            <button onClick={handleSubmit}
            disabled={caption.length === 2000 || caption.length === 0}
            className='userprof-postform-button'> Post </button>
        </div>
      </form>
    </div>
    {caption.length === 2000 ? <div className='userprof-postform-error'> Posts cannot be more than 2000 characters </div> : null }
    {/* </div> */}
    </>
    )
  }
