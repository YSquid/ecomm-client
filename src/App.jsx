import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Products from "./components/products/Products";
import Cart from "./components/cart/Cart";
import Orders from "./components/orders/Orders";
import OrderDetail from "./components/orderDetail/OrderDetail";
import Header from "./components/header/Header";


const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://ahmads-eats-api.netlify.app"
    : "http://localhost:3000";

//request at api/users/user checks the req.user object attached to each request by passport session

const checkForUser = async (user, setUser) => {
  if (!user) {
    const response = await fetch(`${baseURL}/api/users/user`, {
      credentials: "include",
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      setUser(jsonResponse);
    } 
  }
};

function App() {
  //user is passed down through component chain and used to conditionally render based on whether logged in or not
  //each component that needs it also gets passed setUser so that they can update the apps user state when needed - e.g. the login/logout components
  const [user, setUser] = useState();

  useEffect(() => {
    checkForUser(user, setUser);
  }, [user]);
  
  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Products user={user} />}></Route>
        <Route
          path="/login"
          element={
            user ? (
              <Navigate replace to="/" />
            ) : (
              <Login user={user} setUser={setUser} />
            )
          }
        ></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/cart"
          element={<Cart user={user} setUser={setUser} />}
        ></Route>
        <Route
          path="/orders"
          element={<Orders user={user} setUser={setUser} />}
        ></Route>
        <Route path="/orderdetail" element={<OrderDetail />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
