import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { createPostThunk, getAllPostsThunk } from "../../store/post";

import './PostForm.css'

export default function PostForm() {
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

    dispatch(createPostThunk(formData))
    dispatch(getAllPostsThunk(userId))
    setCaption("")
    setPhoto("")
  }

  const updatePhoto = (e) => { setPhoto(e.target.files[0]) }

  if (!user) return null;

  return (
    <>
    <div className='feed-postform-overall-container'>
    <div className='feed-postform-container'>
      <img src={user.profilePic} alt='profile' className='feed-user-profpic'/>
      <form className='feed-post-form'
        onSubmit={handleSubmit}
        encType="multipart/form-data">

          <div className='feed-inside-form-container'>

            <textarea type='text'
            placeholder={`What's on your mind, ${user.firstName}?`}
            onChange={(e) => {setCaption(e.target.value)}}
            value={caption}
            maxLength='2000'
            style={{ color: 'rgb(228,230,235)', paddingLeft:'10px', outline:"none"}}
            className='feed-postform-inputtext'
            />

          <div className='feed-postform-upload-container'>
          <label htmlFor="feed-postform-fileupload" className='postform-label'>
          <i className="fa-solid fa-image" />
            <input
                  type="file"
                  accept="image/*"
                  onChange={updatePhoto}
                  id='feed-postform-fileupload'
                />
                </label>
            {photo ? <div className="feed-postform-uploaded"> File Attached </div> : null}
            </div>

            <button onClick={handleSubmit}
            disabled={caption.length === 2000 || caption.length === 0}
            className='feed-postform-button'> Post </button>
        </div>
      </form>
    </div>
    {caption.length === 2000 ? <div className='feed-postform-error'> Posts cannot be more than 2000 characters </div> : null }
    </div>
    </>
  )
}
