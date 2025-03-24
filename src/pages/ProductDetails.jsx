import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../api requests/product api's/product";
import {
  addProductToWishList,
  getWishList,
  removeProductFromWishList,
} from "../api requests/wishList api's/wishList";
import { addProductToCart } from "../api requests/shoppingCart api's/shoppingCart";
import { AuthContext } from "../context/AuthContext";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [wishListProductsIds, setWishListProductsIds] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const { user } = useContext(AuthContext);
  const { productId } = useParams();
  const navigate = useNavigate();

  const categoryNames = {
    SMART_PHONE: "Smart Phone",
    TABLET: "Tablet",
    LAPTOP: "Laptop",
    TV: "TV",
  };

  useEffect(() => {
    const fetchProductById = async (productId) => {
      try {
        const productData = await getProductById(productId);
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product: ", error);
      }

      if (user) {
        const wishlistData = await getWishList(user.id);
        setWishListProductsIds(
          wishlistData.products.map((product) => product.id)
        );
      }
    };

    fetchProductById(productId);
  }, []);

  const handleAddProductToWishList = async (e, user, productId) => {
    e.preventDefault();

    if (!user) {
      alert("Please log in first.");
      navigate("/login");
    }

    let updatedWishListData;

    try {
      if (wishListProductsIds.includes(productId)) {
        updatedWishListData = await removeProductFromWishList(
          user.id,
          productId
        );
        setWishListProductsIds((prevWishListProductsIds) =>
          [...prevWishListProductsIds].filter((id) => id !== productId)
        );
      } else {
        updatedWishListData = await addProductToWishList(user.id, productId);
        setWishListProductsIds((prevWishListProductsIds) => [
          ...prevWishListProductsIds,
          productId,
        ]);
      }
    } catch (error) {
      console.error("Error adding/removing product from wishlist:", error);
    }
  };

  const handleAddProductToCart = async (user, productId, quantity) => {
    if (!user) {
      alert("Please log in first.");
      navigate("/login");
    }

    if (quantity < 1) {
      alert("Quantity must be a positive integer.");
      return;
    }

    try {
      const updatedCart = await addProductToCart(user.id, productId, quantity);
      alert("Successfully has been added!");
    } catch (error) {
      console.error("Error adding product to cart");
    }
  };

  return (
    <section className="product" id="product">
      <div className="section-title">
        <h1>Product Details</h1>
      </div>

      <div className="product-details-container">
        <div className="product-image-container">
          <img src={product.imgUrl} alt={product.name} />
          <button
            className="add-to-wishlist-btn"
            onClick={(e) => handleAddProductToWishList(e, user, product.id)}
          >
            <i
              className={`fa-solid fa-heart ${
                wishListProductsIds.includes(product.id) &&
                "product-in-wishlist"
              }`}
            ></i>
          </button>
          <span className="info info--category">
            {categoryNames[product.category]}
          </span>
        </div>

        <div className="product-details-content">
          <div className="product-header">
            <h2 className="product-name">{product.name}</h2>
            {product.stockQuantity <= 0 && (
              <span className="info info--out-of-stock">Out of Stock</span>
            )}
          </div>

          <div className="product-details">
            <p className="product-price">${product.price}</p>
            <p className="product-description">{product.description}</p>
          </div>

          <div className="quantity">
            <label htmlFor="quantity">Quantity: </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={quantity}
              min={1}
              onChange={(e) => setQuantity(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                handleAddProductToCart(user, product.id, quantity)
              }
            />
          </div>

          <button
            className="btn btn--2"
            onClick={() => handleAddProductToCart(user, product.id, quantity)}
          >
            Add to Cart<i className="fa-solid fa-shopping-cart"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
