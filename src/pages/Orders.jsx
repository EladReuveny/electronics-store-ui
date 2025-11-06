import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  cancelOrder,
  getAllOrders,
  getAllOrdersAsXML,
  getOrdersByUserId,
  updateOrderStatus,
} from "../api requests/order api's/order";
import StartShopping from "../components/StartShopping";
import useAuth from "../hooks/useAuth";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [ordersXML, setOrdersXML] = useState();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { user } = useAuth();

  const navigate = useNavigate();

  const orderDetailsModal = useRef();
  const orderXMLModal = useRef();

  const userRole = user?.role;

  const statuses = [
    "ALL",
    "PENDING",
    "PACKAGING",
    "SHIPPED",
    "DELIVERED",
    "CANCELED",
  ];

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

  const handleGetAllOrdersAsXML = async () => {
    try {
      const ordersData = await getAllOrdersAsXML();

      setOrdersXML(ordersData);

      orderXMLModal.current?.showModal();
    } catch (e) {
      console.error("Error fetching orders as XML:", e);
      alert("Error fetching or parsing XML");
    }
  };

  const handleCloseOrderXMLModal = () => {
    orderXMLModal.current.close();
  };

  const handleUpdateOrderStatus = async (e, orderId) => {
    try {
      const newOrderStatus = e.target.value;
      const updatedOrder = await updateOrderStatus(orderId, newOrderStatus);
      setOrders((prevOrders) => [
        ...prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newOrderStatus } : order
        ),
      ]);
    } catch (error) {
      console.error("Error updating order status:", error);
      alert(error);
    }
  };

  const handleCancelOrder = async (orderToCancel) => {
    try {
      if (
        confirm(
          "Are you sure you want to cancel this order?\n\nNote: Orders can only be canceled within 14 days start from the order date."
        )
      ) {
        const response = await cancelOrder(orderToCancel.id);
        setOrders((prevOrders) => [
          ...prevOrders.filter((order) => order.id !== orderToCancel.id),
        ]);
        orderDetailsModal.current.close();
      }
    } catch (error) {
      console.error("Error canceling order:", error);
      alert(error);
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
          <div className="tracking-orders">
            <h2>Tracking Orders</h2>
            {userRole === "ADMIN" && (
              <button className="btn btn--2" onClick={handleGetAllOrdersAsXML}>
                View All Orders (XML)
              </button>
            )}
          </div>

          <dialog ref={orderXMLModal} className="orders-xml-modal">
            <button className="btn btn--3" onClick={handleCloseOrderXMLModal}>
              <i className="fa-solid fa-circle-xmark" title="Close"></i>
            </button>

            <h2>All Orders (XML)</h2>
            <pre>{ordersXML}</pre>
          </dialog>

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
                  defaultValue={order.status}
                  onChange={(e) => handleUpdateOrderStatus(e, order.id)}
                  disabled={userRole !== "ADMIN"}
                >
                  <option value="" disabled>
                    --- Status ---
                  </option>
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
              <button
                className="btn btn--3"
                onClick={handleCloseViewOrderModal}
              >
                <i className="fa-solid fa-circle-xmark" title="Close"></i>
              </button>

              <button
                className="btn btn--5"
                title="Cancel Order"
                onClick={() => handleCancelOrder(selectedOrder)}
              >
                Cancel Order
              </button>

              <h2>Order #{selectedOrder.id}</h2>

              <p className={`info info--${selectedOrder.status.toLowerCase()}`}>
                {selectedOrder.status}
              </p>
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
