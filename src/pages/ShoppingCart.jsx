import React, { useContext, useEffect, useState } from "react";
import {
  checkout,
  getCartByUserId,
  removeProductFromCart,
} from "../api requests/shoppingCart api's/shoppingCart";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useState({});
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      alert("Please log in first.");
    }

    // Fetch user's shopping cart data from API
    const fetchShoppingCart = async () => {
      try {
        const cartData = await getCartByUserId(user.id);
        setShoppingCart(cartData);
      } catch (e) {
        console.error("Error fetching user's shopping cart:", e);
      }
    };

    fetchShoppingCart();
  }, []);

  const handleRemoveProductFromCart = async (userId, productId) => {
    try {
      const updatedCart = await removeProductFromCart(userId, productId);
      setShoppingCart(updatedCart);
      alert(`Product ${productId} removed from cart.`);
    } catch (e) {
      console.error("Error removing product from cart:", e);
    }
  };

  const handleCheckout = async (userId) => {
    try {
      const orderData = await checkout(userId);
    } catch (e) {
      console.error("Error checking out:", e);
    }
  };

  return (
    <section className="shopping-cart" id="shopping-cart">
      <div className="section__title">
        <h1>Cart</h1>
      </div>

      {shoppingCart?.items?.map((item) => (
        <div key={item.id} className="shopping-cart__item">
          <button
            onClick={() =>
              handleRemoveProductFromCart(user.id, item.product.id)
            }
          >
            Remove
          </button>
          <img src={item.product.imgUrl} alt={item.product.name} />
          <h2>{item.product.name}</h2>
          <p>Price: ${item.product.price}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Subtotal: ${item.product.price * item.quantity}</p>
          <Link to={`/products/product/${item.product.id}`}>View Product</Link>
        </div>
      ))}
      <div className="shopping-cart__total">
        <h2>Total: ${shoppingCart.totalAmount}</h2>
        <Link to="/orders" onClick={() => handleCheckout(user.id)}>
          Order
        </Link>
      </div>
    </section>
  );
};

export default ShoppingCart;
