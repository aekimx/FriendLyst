import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { createPostThunk } from "../../store/post";

import './PostForm.css'

export default function PostForm() {
  const dispatch = useDispatch()


  const user = useSelector(state => state.session.user);

  const [caption, setCaption] = useState("")
  const [photo, setPhoto] = useState("")
  const [photoLoading, setPhotoLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append("photo", photo)
    formData.append("caption", caption)
    formData.append('userId', userId)

    // Set to true as AWS may be slow to load ??
    setPhotoLoading(true)

    dispatch(createPostThunk(formData))
    .then(() => setPhoto(""))
    .then(() => setCaption(""))
    .catch((res) => console.log(res))

  }


  let userId;
  if (user) userId = user.id
  if (!user) return null;


  return (
    <>
    <div className='feed-postform-container'>
      <img src={user.profilePic} alt='profile' className='feed-user-profpic'/>
      <form className='feed-post-form'
        onSubmit={handleSubmit}
        encType="multipart/form-data">
          <div className='feed-inside-form-container'>
            <input placeholder={`What's on your mind, ${user.firstName}?`}
            onChange={(e) => {setCaption(e.target.value)}}/>
            <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {setPhoto(e.target.files[0])}}
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
