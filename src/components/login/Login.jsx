import React, { useState } from "react";
import "./Login.css";

function Login({ token, setToken }) {
  //local hold of credentials for form
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  //call to our login endpoint with credentials object passed in
  //return value is the user object from passport
  const loginUser = async (email, password) => {
    const response = await fetch("http://localhost:3000/login", {
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
    const jsonResponse = await response.json();
    return jsonResponse;
  };

  //handle form submit - call loginUser function, passing in email/PW. Set that as token
  //setToken state
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser(email, password);
    setToken(token);
  };

  if (token) {
    return;
  } else {
    return (
      <section className="Login">
        <div className="Login__form">
          <form onSubmit={handleSubmit} method="POST">
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </section>
    );
  }
}

export default Login;
