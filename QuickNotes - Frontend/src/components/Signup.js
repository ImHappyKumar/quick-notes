import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Signup = () => {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const host = process.env.REACT_APP_HOST;
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const response = await fetch(`${host}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
      });
      const json = await response.json()

      if (json.success) {
        localStorage.setItem('token', json.token);
        navigate('/');
      }
      else {
        alert("Invalid credentials");
      }
    }
  }

  const validateForm = () => {
    if (credentials.password !== credentials.confirmPassword) {
      alert("password do not match");
      return false;
    }
    return true;
  }

  return (
    <div className='container w-50 my-5 d-flex flex-column align-items-center'>

      <img src={logo} alt='logo' className='mt-5 mb-2' style={{ width: '48px' }} />
      <h3 className='mb-0'>QuickNotes</h3>
      <p>Online Notes, Anytime, Anywhere</p>

      <form className='mt-3 w-50' onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder='Name' value={credentials.name} onChange={handleOnChange} id="name" name="name" minLength={3} />
        </div>
        <div className="mb-3">
          <input type="email" className="form-control" placeholder='Email address' value={credentials.email} onChange={handleOnChange} id="email" name="email" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text ms-1">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" placeholder='Password' value={credentials.password} onChange={handleOnChange} name="password" id="password" minLength={6} />
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" placeholder='Confirm Password' value={credentials.confirmPassword} onChange={handleOnChange} name="confirmPassword" id="confirmPassword" minLength={6} />
        </div>

        <button type='submit' className='btn btn-primary w-100'>Sign up</button>

        <div className="form-text mt-3 text-center">
          Already have an account?
          <Link className='ms-1 text-decoration-none' style={{ color: '#00a82d' }} to="/login" role="button">Log in</Link>
        </div>
      </form>
    </div>
  )
}

export default Signup;