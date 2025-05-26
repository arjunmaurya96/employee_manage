import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');

  const removeHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name')
    navigate("/login");
  };

  const user_name = localStorage.getItem('name')


  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">Navbar</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                {/* <div className="justify-content-end align-items-end text-end">
                  <li className="nav-item">
                    <button className="btn btn-danger" onClick={removeHandler}>Logout</button>
                  </li>
                </div> */}
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">SignUp</Link>
                </li>
              </>
            )}
          </ul>
          {
            token ? (
              <>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <p className="btn btn-warning m-0 me-2">Welcome :- {user_name}</p>
                  <button className="btn btn-danger" onClick={removeHandler}>Logout</button>
                </div>

              </>
            ) : ""
          }

        </div>
      </div>
    </nav>
  );
};

export default Header;
