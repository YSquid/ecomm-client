import React from 'react';
import "./Cart.css";
import Login from '../login/Login'

function cart({token, setToken}) {
  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div>cart</div>
  )
}

export default cart