import React from 'react';
import logo from '../assets/logo.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand d-flex align-items-center text-light" to="/">
                    <img src={logo} alt="logo" className="mx-1" style={{width: '24px'}} />
                    <h5 className="ms-2 mt-1">QuickNotes</h5>
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item ">
                            <NavLink className="nav-link text-light" aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-light" to="/about">About</NavLink>
                        </li>
                    </ul>
                    {localStorage.getItem('token') ? <button className="btn btn-primary ms-2" id="logout-btn" onClick={handleLogout}>Log out</button> : <div>
                        <Link className="btn btn-primary me-1" id="login-btn" to="/login" role="button">Log In</Link>
                        <Link className="btn btn-primary me-1" id="signup-btn" to="/signup" role="button">Sign Up</Link>
                    </div>}
                </div>
            </div>
        </nav>
    )
}

export default NavBar;