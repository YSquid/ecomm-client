import React, { useState, useEffect } from "react";
import "./Cart.css";
import Login from "../login/Login";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Button } from "@mui/material";

function Cart({ token, setToken }) {
  const [cartItems, setCartItems] = useState();
  const [checkoutClicked, setCheckoutClicked] = useState(false);
  const navigate = useNavigate();

  const getCartItems = async () => {
    const response = await fetch(
      `http://localhost:3000/api/carts/cartproducts/${token}`,
      { credentials: "include" }
    );
    const jsonResponse = await response.json();
    setCartItems(jsonResponse);
  };

  useEffect(() => {
    if (token) {
      getCartItems();
    }
  });

  const handleCheckout = async () => {
    setCheckoutClicked(true);
    await fetch(`http://localhost:3000/api/carts/checkout/${token}`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    });

    return navigate("/orders");
  };

  //total taken by reducing cartItems array
  //initial value for reducer is 0. For each add current product price * current product count to accumulator
  const preTaxRaw = cartItems
    ? cartItems.reduce((acc, curr) => {
        return acc + curr.product_price * curr.product_count;
      }, 0)
    : 0;

  const totalPreTax = preTaxRaw.toFixed(2);

  const tax = parseFloat(totalPreTax * 0.11).toFixed(2);

  const grandTotal = (Number(totalPreTax) + Number(tax)).toFixed(2);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <section className="cart">
      <div className="cartContainer">
        <div className="cartTitle">
          <h1>Your Cart</h1>
        </div>
        <div className="cartItems">
          {cartItems ? (
            cartItems.length > 0 ? (
              cartItems.map((item) => {
                return (
                  <div key={item.product_id} className="cartItem">
                    <h3 className="itemName">{item.product_name}</h3>
                    <img
                      className="itemImg"
                      src={
                        process.env.PUBLIC_URL +
                        `/assets/${item.product_name}.jpg`
                      }
                      alt=""
                    />
                    <div className="itemDetails">
                      <p className="itemCount">Count: {item.product_count}</p>
                      <p className="itemPrice">
                        Item Price: ${item.product_price}
                      </p>
                      <p className="itemSubtotal">
                        Subtotal: ${item.product_count * item.product_price}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <h2>Cart is empty</h2>
            )
          ) : null}
        </div>

        {cartItems
          ? cartItems.length > 0 && (
              <>
                <div className="cartTotal">
                  <h2>Subtotal: ${totalPreTax}</h2>
                  <h2>Tax: ${tax}</h2>
                  <h2>Grand Total: ${grandTotal} </h2>
                  {checkoutClicked ? (
                  <CircularProgress  className="checkout"/>
                ) : (
                  <div className="checkout">
                    <Button
                      variant="contained"
                      type="submit"
                      onClick={handleCheckout}
                    >
                      Checkout
                    </Button>
                  </div>
                )}
                </div>
                
              </>
            )
          : null}
      </div>
    </section>
  );
}

export default Cart;
