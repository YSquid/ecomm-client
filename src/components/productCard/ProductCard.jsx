import React, { useState } from "react";
import "./ProductCard.css";

function ProductCard({ id, name, description, price, stock, user_id}) {
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

 const addToCart = async () => {
  console.log("add to cart clicked")
  console.log(`${user_id}, ${id}, ${productCount}`)
  const response = await fetch('http://localhost:3000/api/carts', {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-type' : 'application/json',
    },
    body: JSON.stringify({
      cart_id: user_id,
      product_id: id,
      product_name: name,
      product_price: price,
      product_count: productCount,
     
    })
  })
  console.log(response)
  console.log(`Response ran`)
  const jsonResponse = await response.json()
  console.log(jsonResponse)
 }
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
        Token/user_id/cart_id: {user_id}
      </p>
      <div className="productCounter">
        <button type="submit" onClick={increment}>+</button>
        <p className="productCount">{productCount}</p>
        <button onClick={decrement}>-</button>
      </div>
      <div className="addToCart">
        <button onClick={addToCart}>Add to cart</button>
      </div>
    </article>
  );
}

export default ProductCard;
