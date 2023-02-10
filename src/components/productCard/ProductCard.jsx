import React, { useState } from "react";
import "./ProductCard.css";

function ProductCard({ id, name, description, price, stock, token}) {
  let [productCount, setProductCount] = useState(1);

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

//  const addToCart = async () => {
//   const response = await fetch('http://localhost:3000/api/carts', {
//     method: 'POST',
//     headers: {
//       'Content-type' : 'application/json'
//     },
//     body: JSON.stringify({
//       // cart_id: 
//     })
//   })
//  }
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
      <p>
        <b>Devonly</b>
        <br />
        Product ID: {id}
        <br />
        Product Stock:{stock}
        <br/>
        Token/user_id/cart_id: {token}
      </p>
      <div className="productCounter">
        <button type="submit" onClick={increment}>+</button>
        <p className="productCount">{productCount}</p>
        <button onClick={decrement}>-</button>
      </div>
    </article>
  );
}

export default ProductCard;
