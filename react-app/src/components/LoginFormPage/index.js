import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/home" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoUserLogin = async (e) => {
		e.preventDefault();
		await dispatch(login('demo@aa.io', 'password'))
			.catch(
				async (res) => {
					const errData = await res.json();
					console.log(errData)
				}
			)
	};



  return (
    <>
      <div>FriendLyst Logo Here </div>
      <div>Connect with friends and the world around you on FriendLyst </div>
      <div>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>

          <input
            type="text"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

        <button type="submit" onClick={handleSubmit}>Log In</button>
        <button type='submit' onClick={demoUserLogin}> Demo User</button>
        <Link to ='/signup'> Create new account </Link>
      </form>
      </div>
    </>
  );
}

export default LoginFormPage;
