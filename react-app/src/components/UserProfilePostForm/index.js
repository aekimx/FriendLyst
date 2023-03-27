import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { createPostThunk, getAllPostsThunk } from "../../store/post";
import { getUserPostsThunk} from "../../store/user"

import 'UserProfilePostForm.css'

export default function UserPostForm() {
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
    dispatch(getUserPostsThunk(userId))
    setCaption("")
    setPhoto("")
  }

  const updatePhoto = (e) => {
    setPhoto(e.target.files[0])
  }

  if (!user) return null;

  return (
    <>
    <div className='user-postform-overall-container'>
    <div className='user-postform-container'>
      <img src={user.profilePic} alt='profile' className='user-postform-user-profpic'/>
      <form className='user-post-form'
        onSubmit={handleSubmit}
        encType="multipart/form-data">

          <div className='user-inside-form-container'>

            <input type='text'
            placeholder={`What's on your mind, ${user.firstName}?`}
            onChange={(e) => {setCaption(e.target.value)}}
            value={caption}
            style={{ color: 'rgb(228,230,235)', paddingLeft:'10px', outline:"none"}}
            className='user-postform-inputtext'
            />

          <label htmlFor="user-postform-fileupload" className='user-postform-label'>
          <i class="fa-solid fa-image" />
            <input
                  type="file"
                  accept="image/*"
                  onChange={updatePhoto}
                  id='user-postform-fileupload'
                />
                </label>

            <div onClick={handleSubmit} className='feed-postform-button'> Post </div>
        </div>
      </form>
    </div>
    </div>
    </>
  )

}
