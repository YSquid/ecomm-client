import React, { useState, useEffect } from "react";
import "./Cart.css";
import Login from "../login/Login";

function Cart({ token, setToken }) {
  const [cartItems, setCartItems] = useState();

  const getCartItems = async (token) => {
    const response = await fetch(
      `http://localhost:3000/api/carts/cartproducts/${token}`,
      { credentials: "include" }
    );
    console.log(response);
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    setCartItems(jsonResponse);
  };

  useEffect(() => {
    getCartItems(token);
  }, []);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <section className="cart">
      <div className="cartContainer">
        <h1>Your Cart</h1>
        <h2>DEV: token: {token}</h2>
        {cartItems ? (
          cartItems.map((item) => {
            return (
              <div key={item.product_id} className="cart_item">
                <ul>
                  <li className="item_name">{item.product_name}</li>
                  <li className="item_img">
                    <img src={process.env.PUBLIC_URL + `/assets/${item.product_name}.jpg`} alt="" />
                  </li>
                  <li className="item_count">Item Count: {item.product_count}</li>
                  <li className="item_price">Item Price:${item.product_price}</li>
                  <li className="item_subtotal">Item Subtotal${item.product_count * item.product_price}</li>
                </ul>
              </div>
            );
          })
        ) : (
          <h2>Cart is Empty</h2>
        )}
      </div>
    </section>
  );
}

export default Cart;
