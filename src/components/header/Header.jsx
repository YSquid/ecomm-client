import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { FaHamburger } from "react-icons/fa";
import { AiOutlineShoppingCart, AiOutlineShopping} from 'react-icons/ai'
import Logout from '../logout/Logout'

function Header({ token, setToken }) {
  return (
    <header className="header">
      <div className="title">
        <h1>
          Ahmad's Eats <FaHamburger />
        </h1>
      </div>
      <nav className="nav">
        {token && (
          <div className="navLoggedIn">
            <Link to="/" title="shop">Return to Shop</Link>
            <Link to="/cart" title="Cart"><AiOutlineShoppingCart/></Link>
            <Link to="/orders" title="Orders"><AiOutlineShopping/></Link>
            <Logout setToken={setToken}/>
          </div>
        )}

        {!token && (
          <div className="navNotLoggedIn">
            <Link to="/products" title="shop">Shop</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
