import React, { useState, useEffect } from "react";
import "./Products.css";
import Categories from "../categories/Categories";

function Products() {
  //categories stored here, but set by the Categories component
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  //get all products on products and store in state on render
  const getProducts = async () => {
    const response = await fetch("http://localhost:3000/api/products");
    console.log(response);
    const responseJSON = await response.json();
    console.log(responseJSON);
    setProducts(responseJSON);
  };

  useEffect(() => {
    getProducts();
  }, [])
  return (
    <section className="products">
      <div className="categories">
        <Categories setCategories={setCategories} />
      </div>
      <div className="productsList">Products</div>
    </section>
  );
}

export default Products;
