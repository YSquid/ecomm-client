import React from "react";
import "./Products.css";
import Categories from "../categories/Categories";

function Products() {
  return (
    <section className="products">
    <div className="categories"><Categories/></div>
    <div className="productsList">Products</div>
    </section>
  );
}

export default Products;
