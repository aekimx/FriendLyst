import React from "react"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";

export default function HomePage() {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout())
    .then(() => {
      history.push("/")
    });
  };




  return (
    <>
    <h1> home! </h1>
    <div onClick={handleLogout}> Logout </div>
    </>
  )
}
