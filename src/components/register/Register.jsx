import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button, Snackbar, CircularProgress } from "@mui/material";
import "./Register.css";

function Register() {
  const baseURL =
    process.env.NODE_ENV === "production"
      ? "https://ahmads-eats-api.netlify.app"
      : "http://localhost:3000";
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  //when registration completes, set newUser state, used to render the Navigate component to redirect to login
  const [newUser, setNewUser] = useState();
  const [registerError, setRegisterError] = useState(false);
  const [registerClicked, setRegisterClicked] = useState(false);

  //reset login error once snackbar autocloses
  const snackClose = () => {
    setRegisterError(false);
  };

  //call to /register endpoint
  //return value is the user object from passport
  const registerUser = async (credentials) => {
    try {
      const response = await fetch(`${baseURL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const jsonResponse = await response.json();
      return jsonResponse;
    } catch (error) {
      setRegisterError(true);
    }
  };

  //handle form submit - call registerUser function, passing in email/PW. Set that as newUser
  //setNewUser state
  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegisterClicked(true);
    const newUser = await registerUser({
      email,
      password,
    });
    setRegisterClicked(false);
    setNewUser(newUser);
  };

  return (
    <section className="register">
      {newUser && <Navigate to="/login" replace={true} />}
      <h1>Register for Ahmad's Eats</h1>
      <h2>
        Feel free to use a fake email, as this project was made for practice
        only
      </h2>
      <div className="registerForm">
        <form onSubmit={handleSubmit} method="POST">
          <div className="email">
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
          <div className="password">
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
          <div className="registerButton">
            {registerClicked ? (
              <CircularProgress />
            ) : (
              <Button variant="contained" type="submit">
                Register
              </Button>
            )}
          </div>
          <Snackbar
            open={registerError}
            autoHideDuration={6000}
            onClose={snackClose}
            message="Account with that email already exists"
          />
        </form>
      </div>
    </section>
  );
}

export default Register;
