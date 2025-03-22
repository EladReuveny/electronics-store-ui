import React, { useContext, useEffect, useState } from "react";
import {
  checkout,
  getCartByUserId,
  removeProductFromCart,
  updateItemQuantity,
} from "../api requests/shoppingCart api's/shoppingCart";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import StartShopping from "../components/StartShopping";

const ShoppingCart = () => {
  const [cart, setCart] = useState({});
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

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

  const handleUpdateItemQuantity = async (e, userId, itemId) => {
    try {
      const updatedCart = await updateItemQuantity(
        userId,
        itemId,
        e.target.value
      );
      setCart(updatedCart);
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  const handleRemoveProductFromCart = async (e, userId, productId) => {
    e.preventDefault();

    try {
      const updatedCart = await removeProductFromCart(userId, productId);
      setCart(updatedCart);
    } catch (e) {
      console.error("Error removing product from cart:", e);
    }
  };

  const handleCheckout = async (userId) => {
    try {
      const orderData = await checkout(userId);
      navigate("/orders");
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
                <span
                  onClick={(e) =>
                    navigate(`/products/product/${item.product.id}`)
                  }
                >
                  {index + 1}
                </span>
                <img
                  src={item.product.imgUrl}
                  alt={item.product.name}
                  onClick={(e) =>
                    navigate(`/products/product/${item.product.id}`)
                  }
                />
                <span
                  onClick={(e) =>
                    navigate(`/products/product/${item.product.id}`)
                  }
                >
                  {item.product.name}
                </span>
                <span
                  onClick={(e) =>
                    navigate(`/products/product/${item.product.id}`)
                  }
                >
                  ${item.product.price}
                </span>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  className="btn"
                  value={item.quantity}
                  min={1}
                  onChange={(e) =>
                    handleUpdateItemQuantity(e, user.id, item.id)
                  }
                />
                <span
                  onClick={(e) =>
                    navigate(`/products/product/${item.product.id}`)
                  }
                >
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
                <button
                  className="btn btn--1"
                  onClick={(e) =>
                    handleRemoveProductFromCart(e, user.id, item.product.id)
                  }
                >
                  Remove <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <p>Total: ${cart.totalAmount.toFixed(2)}</p>
            <button
              className="btn btn--2"
              onClick={() => handleCheckout(user.id)}
            >
              Order
            </button>
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
