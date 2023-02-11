import React from "react";
import './Logout.css'

function logout({ setToken }) {
  const logout = async () => {
    const response = await fetch("http://localhost:3000/logout", {
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
