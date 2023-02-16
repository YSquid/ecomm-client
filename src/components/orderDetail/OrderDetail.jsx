import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import "./OrderDetail.css";

function OrderDetail({ order_id }) {
  const [orderProducts, setOrderProducts] = useState();

  const getOrderProducts = async () => {
    const response = await fetch(
      `http://localhost:3000/api/orders/orderproducts/${order_id}`,
      { credentials: "include" }
    );
    console.log(response);
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    setOrderProducts(jsonResponse);
  };

  useEffect(() => {
    getOrderProducts();
    // eslint-disable-next-line
  }, []);

  const preTaxRaw = orderProducts
    ? orderProducts.reduce((acc, curr) => {
        return acc + curr.product_price * curr.product_count;
      }, 0)
    : 0;

  const totalPreTax = preTaxRaw.toFixed(2);

  const tax = parseFloat(totalPreTax * 0.11).toFixed(2);

  const grandTotal = (Number(totalPreTax) + Number(tax)).toFixed(2);

  return (
    <div className="orderDetail">
      {orderProducts ? (
        orderProducts.map((product) => {
          return (
            <div className="productDetail" key={product.product_id}>
              <p>-----</p>
              <p>{product.product_name}</p>
              <p>Count: {product.product_count}</p>
              <p>Item Price: {product.product_price}</p>
              <p>
                <b>
                  Subtotal: ${product.product_count * product.product_price}
                </b>
              </p>
            </div>
          );
        })
      ) : (
        <CircularProgress />
      )}
      <p>-----</p>
      <p>Order Subtotal: ${totalPreTax} </p>
      <p>Order Tax: {tax}</p>
      <p>
        <b>Grand Total: {grandTotal}</b>
      </p>
    </div>
  );
}

export default OrderDetail;
