import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [month, setMonth] = useState("")
  const [day, setDay] = useState("")
  const [year, setYear] = useState("")
  const [gender, setGender] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/home" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const birthday = month+'/'+day+'/'+year

    if (password === confirmPassword) {
        const data = await dispatch(signUp(firstName, lastName, email, birthday, gender, password));
        if (data) {
          setErrors(data)
        }
    } else {
        setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  const generateOptions = (start, end) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
  };

  return (
    <>
    <div className='signupform-container'>
      <div className='signupform-text'>
        <div className='signupform-signup'>Sign Up</div>
        <div className='signupform-easy'>It's quick and easy.</div>
      </div>
      <div className='signupform-form'>
      <form onSubmit={handleSubmit} className='signupform-form-overall'>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
      <div className='signupform-name-container'>
          <input
            type="text"
            className='signupform-fname'
            placeholder='First name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            className='signupform-lname'
            placeholder='Last name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

    <div className='signupform-email-pw-container'>
          <input
            type="text"
            className='signupform-email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className='signupform-password'
            placeholder='New password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            className='signupform-confirm-password'
            placeholder = 'Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
          <div className='signupform-birthday-container' >
            <div className="signupform-bday-text">Birthday</div>
            <select onChange={(e) => setMonth(e.target.value)}>
              {generateOptions(1, 12)}
            </select>

            <select onChange={(e) => setDay(e.target.value)}>
              {generateOptions(1,31)}
            </select>

            <select onChange={(e) => setYear(e.target.value)}>
              {generateOptions(1940, new Date().getFullYear())}
            </select>
          </div>
          <div>
            <div>Gender</div>
              <div>
                <input name='gender' type='radio' id='female' value='Female' onClick={(e) => {setGender(e.target.value)}} /> <label for='female'> Female </label>
              </div>
              <div>
                <input name='gender' type='radio' id='male' value='Male' onClick={(e) => {setGender(e.target.value)}} /> <label for='male'> Male </label>
              </div>
              <div>
                <input name='gender' type='radio' id='other' value='Other' onClick={(e) => {setGender(e.target.value)}} /> <label for='other'> Other </label>
              </div>

            {/* <input type='radio' value='Male' onClick={(e) => {setGender(e.target.value)}}> Male </input>
            <input type='radio' value='Other' onClick={(e) => {setGender(e.target.value)}}> Other </input> */}
          </div>

        <div> By clicking sign up, you agree to our Terms, Privacy Policy, and Cookies Policy. </div>
        <button type="submit">Sign Up</button>
      </form>
      </div>
    </div>
    </>
  );
}

export default SignupFormPage;
