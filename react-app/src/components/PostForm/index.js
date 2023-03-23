import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { createPostThunk } from "../../store/post";

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
    console.log('-------------photo---------', photo)
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append('user_id', user.id);
    formData.append("photo", photo);

    dispatch(createPostThunk(formData))
    setCaption("")
    setPhoto("")
  }

  const updatePhoto = (e) => {
    console.log('--------- e target files --------' , e.target.files[0])
    setPhoto(e.target.files[0])
  }



  if (!user) return null;


  return (
    <>
    <div className='feed-postform-container'>
      <img src={user.profilePic} alt='profile' className='feed-user-profpic'/>
      <form className='feed-post-form'
        onSubmit={handleSubmit}
        encType="multipart/form-data">

          <div className='feed-inside-form-container'>

            <input type='text'
            placeholder={`What's on your mind, ${user.firstName}?`}
            onChange={(e) => {setCaption(e.target.value)}}
            value={caption}
            />

            <input
                  type="file"
                  accept="image/*"
                  onChange={updatePhoto}
                />

            <button type='submit'> Post </button>
        </div>
      </form>
    </div>
    </>
  )

}


// const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("image", image);

//     // aws uploads can be a bit slow—displaying
//     // some sort of loading message is a good idea
//     setImageLoading(true);

//     const res = await fetch('/api/images', {
//         method: "POST",
//         body: formData,
//     });
//     if (res.ok) {
//         await res.json();
//         setImageLoading(false);
//         history.push("/images");
//     }
//     else {
//         setImageLoading(false);
//         // a real app would probably use more advanced
//         // error handling
//         console.log("error");
//     }
// }

// return (
//     <form
//         onSubmit={handleSubmit}
//         encType="multipart/form-data")
//     >
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files[0])}
//         />
//         <button type="submit">Submit</button>
//         {(imageLoading)&& <p>Loading...</p>}
//     </form>
// )
// }

// export default UploadPicture;
