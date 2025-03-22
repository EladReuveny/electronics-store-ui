import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  getWishList,
  moveToShoppingCart,
  removeProductFromWishList,
} from "../api requests/wishList api's/wishList";
import StartShopping from "../components/StartShopping";

const WishList = () => {
  const [wishList, setWishList] = useState({});
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      alert("Please log in first.");
    }

    // Fetch user's wishlist data from API
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

  const handleRemoveProductFromWishList = async (userId, productId) => {
    try {
      const updatedWishList = await removeProductFromWishList(
        userId,
        productId
      );
      setWishList(updatedWishList);
      alert("Product removed from wishlist.");
    } catch (e) {
      console.error("Error removing product from wishlist:", e);
    }
  };

  const handleMoveToShoppingCart = async (userId, productId) => {
    try {
      const updatedWishList = await moveToShoppingCart(userId, productId);
      setWishList(updatedWishList);
      alert("Product moved to shopping cart.");
    } catch (e) {
      console.error("Error removing product from wishlist:", e);
    }
  };

  return (
    <section className="wishlist" id="wishlist">
      <div className="section-title">
        <h1>Wishlist</h1>
      </div>

      {wishList?.products?.length > 0 ? (
        <div className="wishlist-container">
          {wishList?.products?.map((product) => (
            <div key={product.id} className="wishlist-product">
              <img src={product.imgUrl} alt={product.name} />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <button
                onClick={() =>
                  handleRemoveProductFromWishList(user.id, product.id)
                }
              >
                <span class="material-symbols-outlined">delete</span>
              </button>
              <button
                onClick={() => handleMoveToShoppingCart(user.id, product.id)}
              >
                Move to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <StartShopping text="Nothing saved yet. Start Shopping." />
      )}
    </section>
  );
};

export default WishList;
