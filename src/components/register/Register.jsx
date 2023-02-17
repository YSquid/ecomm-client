import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const baseURL = process.env.NODE_ENV === 'production' ? 'https://ahmads-eats-api.netlify.app' : 'http://localhost:3000';
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  //when registration completes, set newUser state, used to render the Navigate component to redirect to login
  const [newUser, setNewUser] = useState();

  //call to /register endpoint
  //return value is the user object from passport
  const registerUser = async (credentials) => {
    const response = await fetch(`${baseURL}/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const jsonResponse = await response.json();
    return jsonResponse;
  };

  //handle form submit - call registerUser function, passing in email/PW. Set that as newUser
  //setNewUser state
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = await registerUser({
      email,
      password,
    });
    setNewUser(newUser);
  };

  return (
    <section className="register">
      {newUser && <Navigate to="/login" replace={true} />}
      <h1>Register for Ahmad's Eats</h1>
      <form onSubmit={handleSubmit} method="POST">
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </section>
  );
}

export default Register;
