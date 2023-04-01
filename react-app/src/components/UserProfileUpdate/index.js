import React from "react"
import { useDispatch } from "react-redux"
import { getUserThunk, updateUserThunk } from "../../store/user";
import { useState } from "react"
import { useModal } from "../../context/Modal";
import "./UserProfileUpdate.css"


export default function UserProfileUpdate({user}) {
  const dispatch = useDispatch()
  const { closeModal } = useModal();

  const [bio, setBio] = useState(user.bio)
  const [location, setLocation] = useState(user.location)
  // const [coverPhoto, setCoverPhoto] = useState(user.coverPhoto)

  const handleSubmit = (e) => {
    e.preventDefault()
    let updatedUserProfile = {userId: user.id, bio, location}
    dispatch(updateUserThunk(updatedUserProfile))
    dispatch(getUserThunk(user.id))
    .then(() => {closeModal()})
  }

  return (
    <>
    <div className='userprof-update-modal-container'>

      <div className='postupdate-edit-text'>
          <div> </div>
          <div>Edit User Profile </div>
          <div onClick={closeModal} className='userupdate-closemodal'>
            <i className="fa-solid fa-x" />
          </div>
      </div>

      <div className='userprof-update-form-container'>
          <form onSubmit={handleSubmit}>

          <div className='userprof-update-form-inputs-container'>
            <div className='userprof-solo-inputs-container'>
              <label> Biography </label>
              <textarea type='text'
              placeholder='Biography'
              value={bio}
              className='userprof-update-bio-text'
              onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <div className='userprof-solo-inputs-container'>
              <label> Location </label>
              <input type='text'
              placeholder='Location'
              value={location}
              className='userprof-update-location-text'
              onChange={(e) => setLocation(e.target.value)}
              />
            </div>

              <button className='userupdate-update-button' type='submit'
              disabled={bio.length < 1 || location.length < 1}> Save </button>
          </div>

          </form>
        </div>

    </div>
    </>
  )
}
