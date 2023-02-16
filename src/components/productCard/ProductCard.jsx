import React, { useState } from "react";
import { Button, IconButton, Snackbar } from "@mui/material";
import AddToCart from "./AddToCart";
import "./ProductCard.css";

function ProductCard({ id, name, description, price, stock, token }) {


  
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
      <AddToCart id={id} name={name} description={description} price={price} stock={stock} token={token} />
    </article>
  );
}

export default ProductCard;
