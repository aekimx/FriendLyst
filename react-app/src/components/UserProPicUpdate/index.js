import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserThunk, updateUserThunk } from "../../store/user";
import { useModal } from "../../context/Modal";

import "./UserProPicUpdate.css"

export default function UserProPicUpdate() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [profilePic, setProfilePic] = useState("");
  const [preview, setPreview] = useState();

  const user = useSelector(state => state.session.user)

  useEffect(() => {
    if (!profilePic) {
      setPreview(null)
      return
    }

    const picUrl = URL.createObjectURL(profilePic)
    setPreview(picUrl)
    return () => URL.revokeObjectURL(picUrl)
  }, [profilePic])


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append("user_id", user?.id)
    formData.append("photo", profilePic)

    dispatch(updateUserThunk(formData))
    dispatch(getUserThunk(user?.id))
    .then(() => {closeModal()})
  }

  const setPhoto = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setProfilePic(null)
      return
  }
    setProfilePic(e.target.files[0])
  }


  return (
    <>
    <div className='user-propic-update-container'>
      <div className='user-profpic-update-text'> Update profile picture </div>
      <div>
      <form className='userprof-update-form'
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        >
          <div className='userprof-inner-form-container'>
            <div className='userprof-pic-input-container'>
              <label htmlFor="userprof-update-pic" className='userprof-form-label'>
              <i className="fa-solid fa-image" /> Choose a photo
                  <input type="file"
                  accept="image/*"
                  onChange={setPhoto}
                  id='userprof-update-pic'
                  />
              </label>
            </div>
            <div className='userprof-preview-container'>
              {profilePic && <img src={preview} className='userprof-preview'/>
              || <img src={user.profilePic} className='userprof-preview'/>}
            </div>

            <div>
              <button type='submit' className='profpic-submit-button'> Save </button>
            </div>
        </div>
      </form>


      </div>


    </div>
    </>
  )
}
