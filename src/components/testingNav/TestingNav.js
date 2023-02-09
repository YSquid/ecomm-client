import React from "react";
import { Link } from "react-router-dom";
import "./TestingNav.css";

function testingNav({ token }) {
  return (
    <div className="nav">
      <ul>
        <li>
          <Link to="/">Products</Link>
        </li>
        <li>
          <Link to="/productdetail">Products Detail</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        <li>
          <Link to="/checkout">Checkout</Link>
        </li>
        <li>
          <Link to="/orders">Orders</Link>
        </li>
        <li>
          <Link to="/orderdetail">Order Detail</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </div>
  );
}

export default testingNav;
