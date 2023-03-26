import React from "react"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { acceptRequestThunk, getAllRequestsThunk } from "../../store/friend";


export default function AcceptRequest({request}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session?.user);

  const acceptRequest = (e) => {
    e.preventDefault();
    dispatch(acceptRequestThunk(request.id))
  }


  return (
    <>
    <div className='friendrequest-accept' onClick={acceptRequest}>
      <i className="fa-solid fa-check" />
    </div>
    </>
  )
}
