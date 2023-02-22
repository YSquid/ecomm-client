import React from "react";
import "./Logout.css";
import { Button } from "@mui/material";

function Logout({ setUser }) {
  const baseURL = process.env.NODE_ENV === 'production' ? 'https://ahmads-eats-api.netlify.app' : 'http://localhost:3000';
  const logout = async () => {
    await fetch(`${baseURL}/api/auth/logout`, {
      credentials: 'include',
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    });
    setUser(false);
  };
  return (
    // <form onSubmit={logout} className='logout'>
    <div>
      <Button variant="text" sx={{color: 'var(--offwhite)', ':hover' : {color: 'var(--orange)'}}} onClick={logout}>Logout</Button>
    </div>
    // </form>
  );
}

export default Logout;
