import React, { useState, useEffect } from "react";
import OrderDetail from "../orderDetail/OrderDetail";
import Login from "../login/Login";
import { Button } from "@mui/material";
import "./Orders.css";

function Orders({ user, setUser }) {
  const baseURL = process.env.NODE_ENV === 'production' ? 'https://ahmads-eats-api.netlify.app' : 'http://localhost:3000';
  const [orders, setOrders] = useState();
  //show details controls which orders have their details shown
  const [showDetails, setShowDetails] = useState([]);

  //if details are already showing, filter them out of the array, else append them to array
  const handleDetailsClick = (orderId) => {
    if (showDetails.includes(orderId)) {
      setShowDetails(
        showDetails.filter((order) => {
          return order !== orderId;
        })
      );
    } else {
      setShowDetails([...showDetails, orderId]);
    }
  };

  const getOrders = async () => {
    const response = await fetch(
      `${baseURL}/api/orders/userid`,
      {
        credentials: "include",
      }
    );
    const jsonResposne = await response.json();
    setOrders(jsonResposne);
  };

  useEffect(() => {
    if (user) {
      getOrders();
    }
    // eslint-disable-next-line
  }, [user]);

  if (!user) {
    return <Login setUser={setUser} />;
  }

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
                    <Button variant='contained'
                      className="details"
                      onClick={() => handleDetailsClick(order.id)}
                    >
                      Details
                    </Button>
                    {showDetails.includes(order.id) ? (
                      <OrderDetail order_id={order.id} />
                    ) : null}
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
