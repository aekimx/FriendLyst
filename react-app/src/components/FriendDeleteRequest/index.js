import React from "react"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { acceptRequestThunk, getAllRequestsThunk } from "../../store/friend";


export default function DeleteRequest({request}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session?.user);

  const deleteRequest = (e) => {
    e.preventDefault();
    dispatch(acceptRequestThunk(request.id))
    .then(() => dispatch(getAllRequestsThunk(user?.id)))
  }


  return (
    <>
    <div className='friendrequest-delete' onClick={deleteRequest}>
      <i className="fa-solid fa-x" />
    </div>
    </>
  )
}
