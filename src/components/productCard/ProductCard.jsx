import React, { useState } from "react";
import { Button, IconButton, Snackbar } from "@mui/material";
import "./ProductCard.css";

function ProductCard({ id, name, description, price, stock, token }) {
  let [productCount, setProductCount] = useState(1);
  const [snackShow, setSnackShow] = useState(false);

  const snackClose = () => {
    setSnackShow(false)
  }

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
    <article className="productCard">
      <div className="productImg">
        {/* reference images stored in public folder using the process.env PUBLIC_URL prop, appending the folder and path*/}
        <img
          src={process.env.PUBLIC_URL + `assets/${name}.jpg`}
          alt={name + "image"}
        />
      </div>
      <h3 className="productName">{name}</h3>
      <p className="productDescription">{description}</p>
      <p className="productPrice">${price}</p>
      <div className="productCounter">
        <IconButton onClick={increment} style={{ color: "var(--midblue)" }}>
          +
        </IconButton>
        <b className="productCount">{productCount}</b>
        <IconButton onClick={decrement} style={{ color: "var(--midblue)" }}>-</IconButton>
      </div>
      <div className="addToCart">
        <Button variant="contained" onClick={addToCart}>Add to cart</Button>
        <Snackbar open={snackShow} autoHideDuration={4000} onClose={snackClose} message="Added to cart"/>
      </div>
    </article>
  );
}

export default ProductCard;
