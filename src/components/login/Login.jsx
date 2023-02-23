import React, { useState } from "react";
import { Button, Snackbar } from "@mui/material";
import "./Login.css";

function Login({ user, setUser }) {
  const baseURL =
    process.env.NODE_ENV === "production"
      ? "https://ahmads-eats-api.netlify.app"
      : "http://localhost:3000";
  //local hold of credentials for form
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loginError, setLoginError] = useState(false);

  //reset login error once snackbar autocloses
  const snackClose = () => {
    setLoginError(false);
  };

  //call to our login endpoint with credentials object passed in
  //return value is the user object from passport
  const loginUser = async (email, password) => {
    const response = await fetch(`${baseURL}/api/auth/login`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (response.status === 401) {
      return { error: "bad info" };
    } else {
      const jsonResponse = await response.json();
      return jsonResponse;
    }
  };

  //handle form submit - call loginUser function, passing in email/PW. Set that as token
  //setToken state
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await loginUser(email, password);
    if (user.error) {
      setLoginError(true);
    } else {
      setUser({id: user.id, email: user.email});
    }
  };

  if (user) {
    return;
  } else {
    return (
      <section className="login">
        <h1>Login</h1>
        <div className="loginForm">
          <form onSubmit={handleSubmit} method="POST">
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button variant="contained" type="submit">
              Login
            </Button>
            <Snackbar 
            open={loginError}
            autoHideDuration={6000}
            onClose={snackClose}
            message="Incorrect email or password"/>
          </form>
        </div>
      </section>
    );
  }
}

export default Login;
