import React, { useState } from "react";
import "./Products.css";
import Categories from "../categories/Categories";

function Products() {
  const [categories, setCategories] = useState();
  return (
    <section className="products">
      <div className="categories">
        <Categories setCategories={setCategories}/>
      </div>
      <div className="productsList">Products</div>
    </section>
  );
}

export default Products;
