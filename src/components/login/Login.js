import React from "react";
import "./Login.css";

function Login() {

  return (
    <section className="Login">
      <div className="Login__form">
        <form action="http://localhost:3000/login" method="POST">
          <div>
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </section>
  );
}

export default Login;
