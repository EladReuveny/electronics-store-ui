import React, { useContext, useEffect, useRef, useState } from "react";
import {
  getAllOrders,
  getOrdersByUserId,
  updateOrderStatus,
} from "../api requests/order api's/order";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import StartShopping from "../components/StartShopping";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const userRole = user?.role;
  const [selectedOrder, setSelectedOrder] = useState(null);
  const orderDetailsModal = useRef();

  const statuses = [
    "ALL",
    "PENDING",
    "PACKAGING",
    "SHIPPED",
    "DELIVERED",
    "CANCELED",
  ];
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      alert("Please log in first.");
    }

    const fetchOrders = async () => {
      try {
        const ordersData =
          userRole === "ADMIN"
            ? await getAllOrders()
            : await getOrdersByUserId(user.id);
        setOrders(ordersData);
      } catch (e) {
        console.error("Error fetching orders:", e);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = [...orders].filter(
    (order) => selectedStatus === "ALL" || order.status === selectedStatus
  );

  const handleUpdatedOrderStatus = async (e, orderId) => {
    try {
      const newOrderStatus = e.target.value;
      const updatedOrder = await updateOrderStatus(orderId, newOrderStatus);
      setOrders((prevOrders) => [
        ...prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newOrderStatus } : order
        ),
      ]);
    } catch (e) {
      console.error("Error updating order status:", e);
    }
  };

  const handleViewOrderModal = (order) => {
    setSelectedOrder(order);
    orderDetailsModal.current.showModal();
  };

  const handleCloseViewOrderModal = (order) => {
    setSelectedOrder(null);
    orderDetailsModal.current.close();
  };

  return (
    <section id="orders" className="orders">
      <div className="section-title">
        <h1>Orders</h1>
      </div>

      {orders?.length === 0 && userRole === "SUBSCRIBED" ? (
        <StartShopping text="You have no orders yet. Start Shopping." />
      ) : (
        <div className="orders-container">
          <div className="filter-by-status">
            {statuses.map((status, index) => (
              <button
                key={index}
                className={`btn btn--1 ${
                  selectedStatus === status ? "active" : ""
                }`}
                onClick={() => setSelectedStatus(status)}
              >
                {status.charAt(0) + status.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          <p>{filteredOrders.length} Orders found</p>

          <div className="orders-header">
            <span>#</span>
            <span>Order ID</span>
            <span>Status</span>
            <span>Order Date</span>
            <span>Total Price</span>
            <span>Actions</span>
          </div>

          <div className="orders-list">
            {filteredOrders.map((order, index) => (
              <div key={order.id} className="order-item">
                <span>{index + 1}</span>
                <span>{order.id}</span>
                <select
                  name="order-status"
                  id="order-status"
                  className={`btn order-status info-${order.status.toLowerCase()} `}
                  value={order.status}
                  onChange={(e) => handleUpdatedOrderStatus(e, order.id)}
                  disabled={userRole === "SUBSCRIBED"}
                >
                  <option value="PENDING">Pending</option>
                  <option value="PACKAGING">Packaging</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELED">Canceled</option>
                </select>
                <span>{new Date(order.orderDate).toLocaleDateString()}</span>
                <span>${order.totalAmount.toFixed(2)}</span>

                <button
                  className="btn btn--1"
                  onClick={() => handleViewOrderModal(order)}
                >
                  View <i className="fa-solid fa-eye"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <dialog ref={orderDetailsModal} className="order-details-dialog">
        {selectedOrder && (
          <div className="order">
            <div className="header">
              <button className="btn btn--5" title="Cancel Order">
                Cancel Order
              </button>
              <div className="title">
                <h2>Order #{selectedOrder.id}</h2>
                <p
                  className={`info info--${selectedOrder.status.toLowerCase()}`}
                >
                  {selectedOrder.status}
                </p>
              </div>
              <button
                className="btn btn--3"
                onClick={handleCloseViewOrderModal}
              >
                <i className="fa-solid fa-circle-xmark" title="Close"></i>
              </button>
            </div>

            <div className="details">
              <p>
                Order Date: {new Date(selectedOrder.orderDate).toLocaleString()}
              </p>
              {userRole === "SUBSCRIBED" && (
                <>
                  <p>Ordered By: {user.email.split("@")[0]}</p>
                  <p>Order Address: {user.address}</p>
                </>
              )}
            </div>
            <div className="products">
              <div className="title">
                <h2>Products</h2>
                <h2>Total: ${selectedOrder.totalAmount}</h2>
              </div>

              <div className="products-header">
                <span>#</span>
                <span>Image</span>
                <span>Name</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Total Price</span>
              </div>

              <div className="products-list">
                {selectedOrder.items.map((item, index) => (
                  <div key={item.id} className="product">
                    <Link to={`/products/product/${item.product.id}`}>
                      <span>{index + 1}</span>
                      <img src={item.product.imgUrl} alt={item.product.name} />
                      <span>{item.product.name}</span>
                      <span>${item.product.price}</span>
                      <span>{item.quantity}</span>
                      <span>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
};

export default Orders;
