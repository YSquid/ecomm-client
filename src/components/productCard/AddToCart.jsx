import React, { useState } from "react";
import { Snackbar, Button, IconButton } from "@mui/material";

function AddToCart({ token, id, name, description, price, stock }) {
    
  let [productCount, setProductCount] = useState(1);
  const [snackShow, setSnackShow] = useState(false);

  const snackClose = () => {
    setSnackShow(false);
  };

  const increment = () => {
    if (productCount <= stock) {
      setProductCount(productCount++);
    } else {
      alert("Count outside stock limit");
    }
  };

  const decrement = () => {
    if (productCount > 0) {
      setProductCount(productCount--);
    } else {
      return;
    }
  };

  const addToCart = async () => {
    await fetch("http://localhost:3000/api/carts", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        cart_id: token,
        product_id: id,
        product_name: name,
        product_price: price,
        product_count: productCount,
      }),
    });

    setSnackShow(true);
  };
  return (
    <>
      <div className="productCounter">
        <IconButton onClick={increment} style={{ color: "var(--midblue)" }}>
          +
        </IconButton>
        <b className="productCount">{productCount}</b>
        <IconButton onClick={decrement} style={{ color: "var(--midblue)" }}>
          -
        </IconButton>
      </div>
      <div className="addToCart">
        <Button variant="contained" onClick={addToCart}>
          Add to cart
        </Button>
        <Snackbar
          open={snackShow}
          autoHideDuration={4000}
          onClose={snackClose}
          message="Added to cart"
        />
      </div>
    </>
  );
}

export default AddToCart;
