import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import Header from './components/header/Header';
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Products from "./components/products/Products";
import Cart from "./components/cart/Cart";
import Checkout from "./components/checkout/Checkout";
import Orders from "./components/orders/Orders";
import OrderDetail from "./components/orderDetail/OrderDetail";
import Header from "./components/header/Header";
// import TestingNav from './components/testingNav/TestingNav';
// import useToken from "./useToken";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://ahmads-eats-api.netlify.app"
    : "http://localhost:3000";

const checkForUser = async (user, setUser) => {
  if (!user) {
    await setTimeout(1000, () => console.log("waited 1 sec"))
    const response = await fetch(`${baseURL}/api/users/user`, {
      credentials: "include",
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      setUser(jsonResponse);
    } else {
      console.log("No user found")
    }
  }
};

function App() {
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
        <Route path="/checkout" element={<Checkout />}></Route>
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
