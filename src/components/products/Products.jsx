import React, { useState, useEffect } from "react";
import "./Products.css";
import Categories from "../categories/Categories";
import ProductCard from "../productCard/ProductCard";
import { CircularProgress } from "@mui/material";

function Products({user}) {
  const baseURL = process.env.NODE_ENV === 'production' ? 'https://ahmads-eats-api.netlify.app' : 'http://localhost:3000'
  //categories stored here, but set by the Categories component
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  //get all products on products and store in state on render
  //filteredProducts contains all products loaded at first
  const getProducts = async () => {
    const response = await fetch(`${baseURL}/api/products`, {credentials: 'include',});
    const responseJSON = await response.json();
    setProducts(responseJSON);
    setFilteredProducts(responseJSON)
    setIsLoading(false);
  };

  //runs on render to get all products
  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
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
          user={user}
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
