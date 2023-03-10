import React, { useState } from "react";
import { Button, IconButton, Snackbar } from "@mui/material";
import "./ProductCard.css";

function ProductCard({ id, name, description, price, stock, user }) {
  const baseURL = process.env.NODE_ENV === 'production' ? 'https://ahmads-eats-api.netlify.app' : 'http://localhost:3000';

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
    await fetch(`${baseURL}/api/carts`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
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
          src={process.env.PUBLIC_URL + `assets/${name}.webp`}
          alt={name + "image"}
        />
      </div>
      <div className="productDetails">
        <h3 className="productName">{name}</h3>
        <p className="productDescription">{description}</p>
        <p className="productPrice">${price}</p>
      </div>
      <div className="productFunctions">
        <div className="productCounter">
          <IconButton onClick={increment} sx={{ ':hover': {bgcolor: 'transparent', color: "var(--darkblue)"}, color: "var(--midblue)" }}>
            +
          </IconButton>
          <b className="productCount">{productCount}</b>
          <IconButton onClick={decrement} sx={{ ':hover': {bgcolor: 'transparent', color: "var(--darkblue)"}, color: "var(--midblue)" }}>
            -
          </IconButton>
        </div>
        <div className="addToCart">
          <Button variant="contained" onClick={addToCart} sx={{ ':hover': {bgcolor: 'var(--darkblue)', color: "var(--offwhite)"}, color: "var(--offwhite)" }}>
            Add to cart
          </Button>
          <Snackbar
            open={snackShow}
            autoHideDuration={4000}
            onClose={snackClose}
            message="Added to cart"
          />
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
