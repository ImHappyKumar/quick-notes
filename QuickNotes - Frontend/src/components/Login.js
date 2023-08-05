import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const host = process.env.REACT_APP_HOST;
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()

    if (json.success) {
      localStorage.setItem('token', json.token);
      navigate('/');
    }
    else {
      alert('Invalid credentials');
    }
  }

  return (
    <div className='container w-50 my-5 d-flex flex-column align-items-center'>

      <img src={logo} alt='logo' className='mt-5 mb-2' style={{width: '48px'}} />
      <h3 className='mb-0'>QuickNotes</h3>
      <p>Online Notes, Anytime, Anywhere</p>

      <form className='mt-3 w-50' onSubmit={handleOnSubmit}>
        <div className='mb-3'>
          <input type='email' className='form-control' placeholder='Email address' value={credentials.email} onChange={handleOnChange} id='email' name='email' aria-describedby='emailHelp' />
        </div>
        <div className='mb-3'>
          <input type='password' className='form-control' placeholder='Password' value={credentials.password} onChange={handleOnChange} name='password' id='password' />
        </div>

        <button type='submit' className='btn btn-primary w-100'>Log in</button>

        <div className="form-text mt-3 text-center">
          Don't have an account?
          <Link className='ms-1 text-decoration-none' style={{color: '#00a82d'}} to="/signup" role="button">Sign up</Link>
        </div>
      </form>
    </div>
  )
}

export default Login;