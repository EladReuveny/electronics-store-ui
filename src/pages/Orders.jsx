import React, { useContext, useEffect, useState } from "react";
import { getOrdersByUserId } from "../api requests/order api's/order";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // document.title = "Orders";
    if (!user) {
      navigate("/login");
      alert("Please log in first.");
    }

    // Fetch user's orders data from API
    const fetchOrders = async () => {
      try {
        const ordersData = await getOrdersByUserId(user.id);
        setOrders(ordersData);
      } catch (e) {
        console.error("Error fetching user's orders:", e);
      }
    };

    fetchOrders();
  }, []);

  return (
    <section id="orders" className="orders">
       <div className="section__title">
        <h1>Orders</h1>
      </div>

      <div className="orders__container">
        {orders.length === 0 ? (
          <p>No orders found. Start shopping now!</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="order">
              <h2>Order ID: {order.id}</h2>
              <h4>Order Date: {new Date(order.orderDate).toLocaleString()}</h4>
              <h4>Status: {order.status}</h4>
              <h3>Total Price: ${order.totalAmount}</h3>

              <p>View Items</p>
              {order.items.map((item) => (
                <div key={item.id} className="order__item">
                  <img src={item.product.imgUrl} alt={item.product.name} />
                  <h2>{item.product.name}</h2>
                  <p>Price: ${item.product.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Subtotal: ${item.product.price * item.quantity}</p>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Orders;
