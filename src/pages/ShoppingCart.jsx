import React, { useEffect, useState } from "react";
import {
  checkout,
  clearCart,
  getCartByUserId,
  removeProductFromCart,
} from "../api requests/shoppingCart api's/shoppingCart";
import { Link, useNavigate } from "react-router-dom";
import StartShopping from "../components/StartShopping";
import useAuth from "../hooks/useAuth";

const ShoppingCart = () => {
  const [cart, setCart] = useState({});

  const navigate = useNavigate();

  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      alert("Please log in first.");
    }

    const fetchCart = async () => {
      try {
        const cartData = await getCartByUserId(user.id);
        setCart(cartData);
      } catch (e) {
        console.error("Error fetching user's shopping cart:", e);
      }
    };

    fetchCart();
  }, []);

  const handleRemoveProductFromCart = async (e, userId, productId) => {
    e.preventDefault();

    try {
      const updatedCart = await removeProductFromCart(userId, productId);
      setCart(updatedCart);
    } catch (e) {
      console.error("Error removing product from cart:", e);
    }
  };

  const handleClearCart = async (userId) => {
    try {
      const updatedCart = await clearCart(userId);
      setCart(updatedCart);
    } catch (e) {
      console.error("Error clearing cart:", e);
    }
  };

  const handleCheckout = async (userId) => {
    try {
      if (confirm("Are you sure you want to confirm the order?")) {
        const orderData = await checkout(userId);
        navigate("/orders");
      }
    } catch (e) {
      console.error("Error checking out:", e);
    }
  };

  return (
    <section className="cart" id="cart">
      <div className="section-title">
        <h1>Cart</h1>
      </div>

      {cart?.items?.length > 0 ? (
        <div className="cart-container">
          <div className="cart-header">
            <span>#</span>
            <span>Image</span>
            <span>Name</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total Price</span>
            <span>Actions</span>
          </div>

          <div className="cart-list">
            {cart.items.map((item, index) => (
              <div key={item.id} className="cart-item">
                <Link to={`/products/product/${item.product.id}`}>
                  <span>{index + 1}</span>
                  <img src={item.product.imgUrl} alt={item.product.name} />
                  <span>{item.product.name}</span>
                  <span>${item.product.price}</span>
                  <span>{item.quantity}</span>
                  <span>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    className="btn btn--6"
                    onClick={(e) =>
                      handleRemoveProductFromCart(e, user.id, item.product.id)
                    }
                  >
                    Remove <i className="fa-solid fa-trash"></i>
                  </button>
                </Link>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <p>Total: ${cart.totalAmount.toFixed(2)}</p>

            <div className="actions">
              <button
                className="btn btn--2"
                onClick={() => handleCheckout(user.id)}
              >
                Order
              </button>
              <button
                className="btn btn--5"
                onClick={() => handleClearCart(user.id)}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <StartShopping
          text={"Your cart is empty."}
          text2={"View Saved Items"}
        />
      )}
    </section>
  );
};

export default ShoppingCart;
