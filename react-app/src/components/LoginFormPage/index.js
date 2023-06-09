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
  const demoUserLogin2 = async (e) => {
		e.preventDefault();
		await dispatch(login('akim@gmail.com', 'password'))
			.catch(
				async (res) => {
					const errData = await res.json();
					console.log(errData)
				}
			)
	};

  function portfolio() {
    window.open('https://aekimx.github.io/')
  }

  function github() {
    window.open('https://github.com/aekimx/FriendLyst')
  }

  function linkedIn() {
    window.open('https://www.linkedin.com/in/aekimx/')
  }



  return (
    <>
    <div className='loginform-container'>
      <div className='loginform-signin'>
      <div className='loginform-logo'> <img src="https://friendlyst-bucket.s3.amazonaws.com/FullLogo_Text_NoBuffer.png" className='loginform-logo'/> </div>
      <div className='loginform-title'>Connect with friends and the world around you on FriendLyst!</div>
      <div className='loginform-input-container'>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx} className='loginform-error'>
                {error}
                </li>
            ))}
          </ul>

            <input
              className="loginform-input-email"
              type="text"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              className="loginform-input-password"
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          <div className='loginform-submit-div'  onClick={handleSubmit}> Log In </div>
          <div className='loginform-demo-container'>
              <div className='loginform-demouser-div' onClick={demoUserLogin}> Demo User 1 </div>
              <div className='loginform-demouser-div' onClick={demoUserLogin2}> Demo User 2 </div>
          </div>
          <div> <Link to ='/signup' className='loginform-signup'> Create new account </Link></div>
        </form>
      </div>
      </div>
    <div className='ak-userinfo'>
        <div className='ak-name'>
          <div onClick={portfolio} className='outer-link'> Aileen Kim </div>
          <div onClick={github} className='outer-link'> Github </div>
          <div onClick={linkedIn} className='outer-link'> LinkedIn </div>
        </div>

        <div className='skills-used'>
          <div> Python </div>
          <div> Flask </div>
          <div> SQLAlchemy </div>
          <div> JavaScript </div>
          <div> React </div>
          <div> Redux </div>
          <div> Node </div>
          <div> HTML </div>
          <div> CSS </div>
          <div> SocketIO </div>
          <div> AWS S3 </div>
          <div> Github </div>
        </div>
    </div>
    </div>
  </>
  );
}

export default LoginFormPage;
