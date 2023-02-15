import React, { useState, useEffect } from "react";
import OrderDetail from "../orderDetail/OrderDetail";
import "./Orders.css";

function Orders({ token }) {
  const [orders, setOrders] = useState();
  const [showDetails, setShowDetails] = useState([]);

  const handleDetailsClick = (orderId) => {
    if (showDetails.includes(orderId)) {
      setShowDetails(showDetails.filter((order) => {
        return order !== orderId
      }))
    } else {
      setShowDetails([...showDetails, orderId]);
    }
  };

  const getOrders = async () => {
    const response = await fetch(
      `http://localhost:3000/api/orders/user/${token}`,
      {
        credentials: "include",
      }
    );
    const jsonResposne = await response.json();
    setOrders(jsonResposne);
  };

  useEffect(() => {
    getOrders();
  });
  return (
    <section className="orders">
      <div className="ordersContainer">
        <div className="orderTitle">
          <h1>Your Order History</h1>
        </div>
        <div className="orderItems">
          {orders ? (
            orders.map((order) => {
              const date = new Date(order.add_time).toDateString();
              return (
                <div className="orderItem" key={order.id}>
                  <div className="orderBasic">
                    <p>Order ID: {order.id}</p>
                    <p>Order Date: {date}</p>
                    <button
                      className="details"
                      onClick={() => handleDetailsClick(order.id)}
                    >
                      Details
                    </button>
                    {showDetails.includes(order.id) ? <OrderDetail order_id={order.id} /> : null}
                  </div>
                </div>
              );
            })
          ) : (
            <p>No Orders</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Orders;
