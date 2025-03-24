import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  addProductToWishList,
  clearWishList,
  getWishList,
  moveToShoppingCart,
  removeProductFromWishList,
} from "../api requests/wishList api's/wishList";
import StartShopping from "../components/StartShopping";
import { addProductToCart } from "../api requests/shoppingCart api's/shoppingCart";

const WishList = () => {
  const [wishList, setWishList] = useState({});
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const categoryNames = {
    SMART_PHONE: "Smart Phone",
    TABLET: "Tablet",
    LAPTOP: "Laptop",
    TV: "TV",
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      alert("Please log in first.");
    }

    const fetchWishList = async () => {
      try {
        const wishListData = await getWishList(user.id);
        setWishList(wishListData);
      } catch (e) {
        console.error("Error fetching user's wishlist:", e);
      }
    };

    fetchWishList();
  }, []);

  const handleRemoveProductFromWishList = async (e, userId, productId) => {
    e.preventDefault();

    try {
      const updatedWishList = await removeProductFromWishList(
        userId,
        productId
      );
      setWishList(updatedWishList);
    } catch (e) {
      console.error("Error removing product from wishlist:", e);
    }
  };

  const handleMoveToShoppingCart = async (user, productId) => {
    if (!user) {
      alert("Please log in first.");
      navigate("/login");
    }

    const quantity = prompt("Enter quantity:", "1");

    if (!Number.isInteger(Number(quantity)) || Number(quantity) < 1) {
      alert("Quantity must be a positive integer.");
      return;
    }

    try {
      const updatedWishListData = await moveToShoppingCart(
        user.id,
        productId,
        quantity
      );
      setWishList(updatedWishListData);
      alert("Successfully added!");
    } catch (error) {
      console.error("Error adding product to cart");
    }
  };

  const handleClearCart = async (userId) => {
    try {
      const updatedWishList = await clearWishList(userId);
      setWishList(updatedWishList);
    } catch (e) {
      console.error("Error clearing wishlist:", e);
    }
  };

  return (
    <section className="wishlist" id="wishlist">
      <div className="section-title">
        <h1>Wishlist</h1>
      </div>

      <p className="wishlist-items-found">
        {wishList?.products?.length} Products saved
      </p>

      {wishList?.products?.length > 0 ? (
        <div className="wishlist-list">
          <div className="actions">
            <button
              className="btn btn--5"
              onClick={() => handleClearCart(user.id)}
            >
              Clear Wish List
            </button>
          </div>

          <div className="wishlist-container">
            {wishList.products.map((product) => (
              <div key={product.id} className="product">
                <Link to={`/products/product/${product.id}`}>
                  <div className="product-image-container">
                    <img src={product.imgUrl} alt={product.name} />
                    <button
                      className="add-to-wishlist-btn"
                      onClick={(e) =>
                        handleRemoveProductFromWishList(e, user.id, product.id)
                      }
                    >
                      <i
                        className={"fa-solid fa-heart product-in-wishlist"}
                      ></i>
                    </button>
                  </div>

                  <span className="info info--category">
                    {categoryNames[product.category]}
                  </span>
                  {product.stockQuantity <= 0 && (
                    <span className="info info--out-of-stock">
                      Out of Stock
                    </span>
                  )}
                  <h2 className="product-name">{product.name}</h2>
                  <p className="product-price">${product.price}</p>
                </Link>

                <button
                  className="btn btn--4"
                  onClick={() => handleMoveToShoppingCart(user, product.id)}
                >
                  Move to Cart
                  <i className="fa-solid fa-shopping-cart"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <StartShopping text="Nothing saved yet. Start Shopping." />
      )}
    </section>
  );
};

export default WishList;
