import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const handler = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = login;

      if (email !== "" && password !== "") {
        const response = await axios.post("https://employee-manage-q8om.onrender.com/api/login", login);
        const token = response.data.data?.jwtToken;

        if (token) {
          localStorage.setItem("name", response.data.data.name);
          localStorage.setItem('token', JSON.stringify(token));

          toast.success("Login Successful!");
          setLogin({ email: "", password: "" });
          navigate("/dashboard");
        } else {
          toast.error("Invalid credentials!");
        }
      } else {
        toast.error("All fields are required!");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Server error. Please try again later.");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center" style={{
      background: "linear-gradient(to right, #6a11cb, #2575fc)"
    }}>
      <Toaster />
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "400px", borderRadius: "1rem" }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={loginUser}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={login.email}
              onChange={handler}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={login.password}
              onChange={handler}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
