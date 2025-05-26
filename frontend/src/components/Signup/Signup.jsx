import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handler = (e) => {
    const { name, value } = e.target;
    setSignup({ ...signup, [name]: value });
  };

  const signupUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = signup;

    if (name && email && password) {
      try {
        const res = await axios.post("http://localhost:8080/api/signup", signup);
        if (res.data) {
          toast.success("Registered successfully!");
          setSignup({ name: "", email: "", password: "" });
          navigate("/login");
        } else {
          toast.error("Registration failed.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong!");
      }
    } else {
      toast.error("All fields are required!");
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div
        className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
        style={{
          background: "linear-gradient(to right, #667eea, #764ba2)",
        }}
      >
        <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%", borderRadius: "1rem" }}>
          <h3 className="text-center mb-4">Register</h3>
          <form onSubmit={signupUser}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={signup.name}
                onChange={handler}
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={signup.email}
                onChange={handler}
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={signup.password}
                onChange={handler}
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
