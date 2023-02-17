import React from "react";
import './Logout.css'

function logout({ setToken }) {
  const baseURL = process.env.NODE_ENV === 'production' ? 'https://ahmads-eats-api.netlify.app' : 'http://localhost:3000';
  const logout = async () => {
    const response = await fetch(`${baseURL}/logout`, {
      credentials: 'include',
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (response) {
        setToken(null);
        sessionStorage.removeItem('token')
        console.log(response)
    }
  };
  return (
    <form onSubmit={logout} className='logout'>
        <button type="submit">Logout</button>
    </form>
  );
}

export default logout;
