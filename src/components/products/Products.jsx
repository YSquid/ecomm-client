import React, { useState, useEffect } from "react";
import "./Products.css";
import Categories from "../categories/Categories";
import ProductCard from "../productCard/ProductCard";
import { CircularProgress } from "@mui/material";

function Products({token}) {
  //categories stored here, but set by the Categories component
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  //get all products on products and store in state on render
  //filteredProducts contains all products loaded at first
  const getProducts = async () => {
    const response = await fetch("http://localhost:3000/api/products", {credentials: 'include',});
    const responseJSON = await response.json();
    setProducts(responseJSON);
    setFilteredProducts(responseJSON)
    setIsLoading(false);
  };

  //runs on render to get all products
  useEffect(() => {
    getProducts();
  }, [])

  //filters products each time categories updates
  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      return categories.includes(product.category_name)
    });

    setFilteredProducts(filteredProducts)
  }, [categories, products]);

  if (isLoading) {
    return (
      <CircularProgress />
    )
  }

  return (
    <section className="products">
      <div className="categories">
        <Categories setCategories={setCategories} />
      </div>
      <div className="productsList">{filteredProducts.map((product) => {
        return (
          <ProductCard
          token={token}
          key={product.id}
          id={product.id}
          name={product.name}
          description={product.description}
          price={product.price}
          stock={product.stock}
          img_path={product.img_path}
           />
        )
      })}</div>
    </section>
  );
}

export default Products;
